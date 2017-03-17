/* eslint no-console: 0 */

'use strict';

// This example demonstrates the 'stream' step with a plugin that converts all spaces to tabs

var nodemailer = require('../lib');
var transporter = nodemailer.createTransport({
    transport: 'stub' // load dynamically nodemailer-stub-tranport
});

var plugin = new(require('stream').Transform)();
plugin._transform = function (chunk, encoding, done) {
    // replace all spaces with tabs in the stream chunk
    for (var i = 0; i < chunk.length; i++) {
        if (chunk[i] === 0x20) {
            chunk[i] = 0x09;
        }
    }
    this.push(chunk);
    done();
};

transporter.use('stream', function (mail, callback) {
    // apply output transformer to the raw message stream
    mail.message.transform(plugin);
    callback();
});

transporter.sendMail({
    from: 'sender@example.com',
    to: 'receiver@example.com',
    subject: 'hello',
    text: 'hello world!'
}, function (err, info) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(info.response.toString());
    }
});
