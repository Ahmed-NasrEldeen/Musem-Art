const Joi = require('joi')

const accountCreate = Joi.object().keys({

  account: Joi.object().keys({
    username: Joi.string().required(),
    phoneNumber: Joi.string().regex(/^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/).required(),
    password: Joi.string().required(),
    userRole: Joi.string().required()
  }).required(),

}).required()
const accountLogin = Joi.object().keys({

  account: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),

}).required()



module.exports = {
  accountCreate,
  accountLogin,
 
}
