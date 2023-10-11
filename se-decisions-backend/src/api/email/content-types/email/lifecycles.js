module.exports = {
    async afterCreate(event) { 
       const { result } = event;
       console.log('hello lifecycles runing')
        try{
            await strapi.plugins['email'].services.email.send({
              to: 'xyzhlhlhlhlh13@yopmail.com',
              from: 'wpwebpro18@gmail.com',
              subject: 'The Strapi Email plugin worked successfully',
              text: `your email is :${result.email}` 
         })
        } catch(err) {
            console.log(err);
        }
    }
}