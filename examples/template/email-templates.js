/* eslint no-console: 0 */

'use strict';

// This example sets up a template renderer, using node-email-templates

var nodemailer = require('../../lib');
var stubTransport = require('nodemailer-stub-transport');

// require external renderer
var EmailTemplate = require('email-templates').EmailTemplate;

// Create a transporter object
var transporter = nodemailer.createTransport(stubTransport());
var templateDir = require('path').join(__dirname, '../../test/fixtures/welcome-email');

// Create a template based sender
var templateSender = transporter.templateSender(new EmailTemplate(templateDir), {
    // default fields for all messages send using this template
    from: 'sender@gmail.com',

    // EmailTemplate fills text and html fields but not subject
    // so we need to add it separately
    subject: 'Hello!'
});

console.log('Template Configured');

// Message object, add mail specific fields here
var message = {
    to: 'receiver@example.com'
};

// context for the template renderer
var context = {
    name: {
        last: 'Receiver',
        first: 'Name'
    }
};

console.log('Sending Mail');
// send using template
templateSender(message, context, function (error, info) {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    // print rfc822 message to console
    console.log('Generated mime-message source:\n%s', info.response.toString());
});
