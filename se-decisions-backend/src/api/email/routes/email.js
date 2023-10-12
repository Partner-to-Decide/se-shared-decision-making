'use strict';

/**
 * email router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
// module.exports = createCoreRouter('api::email.email');
module.exports = {
      routes: [
        {
          method: "POST",
          path: "/email/send",
          handler: "email.send",
          config: {
            policies: [],
            middlewares: [],
          },
        },
      ],
    };