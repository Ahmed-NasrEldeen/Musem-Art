/* eslint-disable max-len */
const joi = require('joi')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/keys')
const statusCodes = require('../constants/statusCodes')
const validations = require('../validations/art.validation')
const artModel = require('../../models/art.model')
const { ConversationContext } = require('twilio/lib/rest/conversations/v1/conversation')




exports.createArt = async (req, res) => {
 console.log("enterted art create")
  try{
    console.log("enterted art creat1")
    let token = req.headers['authorization'].split(" ")[1];
    console.log("tok",token)
    if (!token)
      throw new Error('you are not authenticated please log in')
    const userInfo = jwt.verify(token, secret) 
    if(userInfo.userRole!=="admin")
      throw new Error ('you dont have permission')
    const data = req.body
    console.log(data)
    const validData = joi.validate(data, validations.artCreate)
    if (validData.error != null) {
      return res.status(400).json({
        error: {
          message: validData.error.message,
          statusCode: statusCodes.accountValidationFailed
        }
      })
    }
    const {artist} = data.art
    const {desc} = data.art
    const {img}  = data.art
      
  const params = {
    artist,
    desc,
    img
  }
  const art = new artModel(params)
  const artInfo =await art.save()
    return res.json({
      data: {
        statusCode: statusCodes.success,
        art: {
         artInfo
        }
      }
    })

}
catch(error)
{
  return res.status(401).json({
    error: {
      message: error.message,
      statusCode: statusCodes.unknown
    }
  })

}
  
}

exports.view_all_art = async (req, res) => {
  try{
    let token = req.headers['authorization'].split(" ")[1];
    console.log(token)
    if (!token)
      throw new Error('you are not authenticated please log in')
    const userInfo = jwt.verify(token, secret) 
    const allArt = await artModel.find()
  return res.json({
    data: {
      statusCode: statusCodes.success,
      Accounts: {
       allArt
      }
    }
  })

}catch(error){
  return res.status(404).json({
    error: {
      message: error.message,
      statusCode: statusCodes.unknown
    }
  })
}
}

exports.deleteArt = async (req, res) => {
  
  try{
    let token = req.headers['authorization'].split(" ")[1];
    console.log(token)
    if (!token)
      throw new Error('you are not authenticated please log in')
    const userInfo = jwt.verify(token, secret) 
    if(userInfo.userRole!=="admin")
      throw new Error ('you dont have permission')
    const data = req.body
    const validData = joi.validate(data, validations.artDelete)
    if (validData.error != null) {
      return res.status(400).json({
        error: {
          message: validData.error.message,
          statusCode: statusCodes.accountValidationFailed
        }
      })
    } 
    const {_id} = data.art
    console.log(_id)
    const art = await artModel.findOneAndDelete({_id:_id})
  return res.json({
    data: {
      statusCode: statusCodes.success,
      art: {
       art
      }
    }
  })

}catch(error){
  return res.status(404).json({
    error: {
      message: error.message,
      statusCode: statusCodes.unknown
    }
  })
}
}
exports.editArt = async (req, res) => {
  
  try{
    let token = req.headers['authorization'].split(" ")[1];
    console.log(token)
    if (!token)
      throw new Error('you are not authenticated please log in')
    const userInfo = jwt.verify(token, secret) 
    if(userInfo.userRole!=="admin")
      throw new Error ('you dont have permission')
    const data = req.body
    const validData = joi.validate(data, validations.artEdit)
    if (validData.error != null) {
      return res.status(400).json({
        error: {
          message: validData.error.message,
          statusCode: statusCodes.accountValidationFailed
        }
      })
    } 
    const {_id} = data.art
    const {artist} = data.art
    const {desc} = data.art
    const {img}  = data.art
      
  const params = {
  }
  if(artist)
   params.artist= artist
  if(desc)
  params.desc= desc
  if(img)
  params.img=img 
    const art = await artModel.findOneAndUpdate({_id},params)
  return res.json({
    data: {
      statusCode: statusCodes.success,
      art: {
       art
      }
    }
  })

}catch(error){
  return res.status(404).json({
    error: {
      message: error.message,
      statusCode: statusCodes.unknown
    }
  })
}
}
