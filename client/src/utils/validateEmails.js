/**  
 sample email validation:
 user1@gmail.com, user2@gmail.com, user3@gmail.com
*/

// this came from emailregex.com for validating emails via regular expression, used HTML5 section
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`
    }

    return null;
};