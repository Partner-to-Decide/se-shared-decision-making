
module.exports = {
    async afterCreate(event) {    // Connected to "Save" button in admin panel
       const { result } = event;
        try{
            await strapi.plugins['email'].services.email.send({
              to: 'wpwebpro18@gmail.com',
              from: 'wpwebpro18@gmail.com', // e.g. single sender verification in SendGrid
              subject: 'The Strapi Email plugin worked successfully',
              text: `your email is :${result.email}` 
         })
        } catch(err) {
            console.log(err);
        }
    }
}