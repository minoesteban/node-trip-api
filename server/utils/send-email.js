'use strict';
const nodemailer = require('nodemailer');

module.exports = {
    // async..await is not allowed in global scope, must use a wrapper
    async sendEmail(info, event) {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                tls: { rejectUnauthorized: false },
                auth: {
                    user: process.env.NOREPLY_USER, // generated ethereal user
                    pass: process.env.NOREPLY_PASS, // generated ethereal password
                },
            });
            console.log('transport creado');
            let send;
            switch (event) {
                case 'registered':
                    // send mail with defined transport object
                    send = await transporter.sendMail({
                        from: process.env.NOREPLY_USER, // sender address
                        to: info.email, // list of receivers
                        subject: 'Welcome to Tripper!', // Subject line
                        text: 'Welcome to Tripper!', // plain text body
                        html: `<b>Welcome to Tripper! Here is your activation PIN code: ${info.PIN} </b>`, // html body
                    });
                    break;

                case 'recovered':
                    // send mail with defined transport object
                    send = await transporter.sendMail({
                        from: 'emino@randstad.com.ar', // sender address
                        to: info.PlRID, // list of receivers
                        subject: 'recuperaste la cuenta!', // Subject line
                        text: 'Hello world?', // plain text body
                        html: `<b>Hello world? ${info.PlRPIN} </b>`, // html body
                    });
                    break;

                default:
                    break;
            }

            console.log('Message sent: %s', send.messageId);
        } catch (err) {
            console.error(err);
        }
    },
};