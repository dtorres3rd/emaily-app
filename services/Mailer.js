const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail is an object that takes a lot of config
class Mailer extends helper.Mail {
    // initialization for class "Mailer" 
    // destructured arguments
    constructor({ subject, recipients }, content) {
        // ES6 class, this makes sure constructor is executed fist when this class component is called
        super();

        this.sgAPI = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('daniel.torres3rd@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // this is a function from our base class helper.Mail
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    // helper functions

    formatAddresses(recipients) {
        // destructure email from recipients args
        return recipients.map(({ email }) => {
            // just return email that has been extracted
            return new helper.Email(email);
        });
    };

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgAPI.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgAPI.API(request);
        return response;
    }
}

module.exports = Mailer;