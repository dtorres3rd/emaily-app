const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    }); // this config means that recipients property will not be included from the query

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, (event) => {
      const pathname = new URL(event.url).pathname; // removes baseurl
      const p = new Path('/api/surveys/:surveyId/:choice'); // extracts data from url/route. e.g. surveyId and choice

      // loadash chain helper
      _.chain(req.body)
        .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false },
              },
            },
            {
              $inc: { [choice]: 1 }, // this auto detects if the choice variable contains a value of yes or no then increments it in the collection
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date(),
            }
          ).exec();
        })
        .value();
    });

    /** 
       * //before using loadash chain helper
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });

    // removes undefined records/elements inside the array
    const compactEvents = _.compact(events);

    //removes duplicate records/elements inside the array based on provided assigned key. E.G. email AND surveyId combination
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    console.log(uniqueEvents);

    */

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
