const Joi = require('joi')

const artCreate = Joi.object().keys({

  art: Joi.object().keys({
    artist: Joi.string().required(),
    desc: Joi.string().required(),
    img: Joi.string().required()
  }).required(),

}).required()
const artDelete = Joi.object().keys({

  art: Joi.object().keys({
    _id: Joi.string().required(),
  }).required(),

}).required()

const artEdit = Joi.object().keys({

  art: Joi.object().keys({
    _id: Joi.string().required(),
    artist: Joi.string().optional(),
    desc: Joi.string().optional(),
    img: Joi.string().optional()
  }).required(),

}).required()

module.exports = {
  artCreate,
  artDelete,
  artEdit
}
