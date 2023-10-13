
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
       defaultFrom: env('SENDGRID_DEFAULT_FROM'),      
	     defaultReplyTo: env('SENDGRID_DEFAULT_REPLY_TO'),
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: "AKIATYWLZTVDFYZLB3UH",
          secretAccessKey: "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",
          region: "us-east-1",
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: "partner-to-decide",
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  //  upload: {
  //   config: {
  //     provider: 'aws-s3',
  //     providerOptions: {
  //       s3Options: {
  //         accessKeyId: env('AWS_ACCESS_KEY_ID'),
  //         secretAccessKey: env('AWS_ACCESS_SECRET'),
  //         region: env('AWS_REGION'),
  //         params: {
  //           // ACL: env('AWS_ACL', 'public-read'),
  //           signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
  //           Bucket: env('AWS_BUCKET'),
  //         },
  //       },
  //     },
  //     actionOptions: {
  //       upload: {},
  //       uploadStream: {},
  //       delete: {},
  //     },
  //   },
  // },
});
