// api/email/controllers/Email.js

module.exports = {
  send: async (ctx) => {
    try {
      // Get the email data from the request body
      const { to, subject, text } = ctx.request.body;

      // Send the email using the SendGrid provider
      await strapi.plugins['email'].services.email.send({
        to,
        from: 'wpwebpro18@gmail.com', // Replace with your sender email address
        subject,
        text,
      });

      // Return a success response
      ctx.send({ message: 'Email sent successfully' });
    } catch (error) {
      // Handle errors and return an error response
      ctx.send({ error: 'Failed to send email' }, 400);
    }
  },
};
