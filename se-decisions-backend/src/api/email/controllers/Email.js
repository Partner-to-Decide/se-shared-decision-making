'use strict';

/**
 * email controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::email.email');
const fs = require('fs');
module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    const body    = ctx.request.body
    const sendTo  = body.email;
    const subject = body.subject;
    const content = body.text;
    const pdfData = body.pdfData
    const attachmentPath = body.fileURL;
    strapi.log.debug(`Trying to send an email to ${sendTo}`)
    try {
      const emailOptions = {
        to: sendTo,
        subject: subject,
        text: content,
        attachments: [
          {
            filename: 'Quiz-result.pdf',
            content: fs.readFileSync(attachmentPath, { encoding: 'base64' }),
          },
        ],
      }
      await strapi.plugins['email'].services.email.send(emailOptions)
      strapi.log.debug(`Email sent to ${body}`)
      ctx.send({ message: 'Email sent' })
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err)
      ctx.send({ error: 'Error sending email',body:body })
    }
  },
}



