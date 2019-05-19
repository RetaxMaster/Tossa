const nodemailer = require('nodemailer');

module.exports = {

    empty : (string) => {
        return string == "";
    },

    sendMail : async (Email, Subject, Message) => {
        //Obtengo las configuraciones de email
        const getMailConfig = require("./smtp");
      
        let transporter = nodemailer.createTransport({
          host: getMailConfig.SmtpHost,
          port: getMailConfig.SmtpPort,
          secure: (getMailConfig.SmtpPort == 465),
          auth: {
            user: getMailConfig.SmptpUser,
            pass: getMailConfig.SmtpPassword
          },
          tls:{
            rejectUnauthorized: false
          }
        });
      
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"' + getMailConfig.RemitentName + '" <' + getMailConfig.SmptpUser + '>',
          to: Email,
          subject: Subject,
          html: Message
        };
      
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)
      
        console.log("Message sent: %s", info.messageId);
      },

      getRandomString : (length) => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    
}