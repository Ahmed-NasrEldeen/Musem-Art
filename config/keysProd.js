const { mangoosedb } = require("./keysDev");

module.exports = {
  secret: process.env.secret,
  awsSqsAccessKeyId: process.env.awsSqsAccessKeyId,
  awsSqsSecretAccessKey: process.env.awsSqsSecretAccessKey,
  sqsRegion: process.env.sqsRegion,
  accountSid: process.env.accountSid,
  authToken: process.env.authToken,
  publicVapidKey: process.env.PUBLIC_VAPID_KEY,
  privateVapidKey: process.env.PRIVATE_VAPID_KEY,
  emailPass: process.env.emailPass,
  phoneNumber: process.env.phoneNumber,
  lirtenEmail: process.env.lirtenEmail,
  QueueUrl: process.env.QueueUrl,
  mangoosedb: process.env.mangoosedb
}
