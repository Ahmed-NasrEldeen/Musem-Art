/* eslint-disable max-len */
const joi = require('joi')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/keys')
const statusCodes = require('../constants/statusCodes')
const validations = require('../validations/user.validation')
const userAccounts = require('../../models/user.model')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  
  const data = req.body

  const validData = joi.validate(data, validations.accountCreate)
  if (validData.error != null) {
    return res.status(400).json({
      error: {
        message: validData.error.message,
        statusCode: statusCodes.accountValidationFailed
      }
    })
  }
 
  const { username } = data.account
  const { password } = data.account
  const { phoneNumber } = data.account
  const { userRole } = data.account
  const hashedPassword = bcrypt.hashSync(password, 10)
  try {
    const params = {
      username,
      password:hashedPassword,
      phoneNumber,
      userRole
    }

    const user =  new userAccounts(params)
    const userResponse = await user.save()
    return res.json({
      data: {
        statusCode: statusCodes.success,
        Account:userResponse
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

exports.view_all_users = async (req, res) => {
  const allUsers = await userAccounts.find()
  try{
  return res.json({
    data: {
      statusCode: statusCodes.success,
      Accounts: {
       allUsers
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
exports.start_session = async (req, res) => {
  const request = req.body
  const validData = joi.validate(request, validations.accountLogin)
  if (validData.error) {
    return res.status(400).json({
      error: {
        message: validData.error.message,
        statusCode: statusCodes.validation
      }
    })
  }
  const { username } = request.account
  const { password } = request.account
  let user
  try {
    user = await userAccounts.findOne({ username:username })
    if (user === null)
      throw new Error('user does not exist')
    if (bcrypt.compareSync(password, user.password)) {
      const expirationDate = Math.floor(Date.now() / 1000) + 14400; // 4 hours from now...
      const userRole = user.userRole
      const token = jwt.sign({ username, password, userRole ,exp: expirationDate }, secret)
      return res.json({
        account: {
          token
        }
      })
    }

    throw new Error('password is incorrect')
  }

  catch (error) {
    if (error.message === 'user does not exist') {
      return res.status(400).json({
        error: {
          message: error.message,
          statusCode: statusCodes.getFailed
        }
      })
    }
    if (error.message === 'password is incorrect') {
      return res.status(400).json({
        error: {
          message: error.message,
          statusCode: statusCodes.validation
        }
      })
    }

    if (error.errors[0].message) {
      return res.status(400).json({
        error: {
          message: error.errors[0].message,
          statusCode: statusCodes.userCreationFailed
        }
      })
    }
    return res.status(400).json({
      error: {
        message: error.message,
        statusCode: statusCodes.unknown
      }
    })
  }
}
exports.deleteUser = async (req, res) => {
  
  try{
  console.log(req.body)
   const username = req.body.account.username
   console.log(username)
   const account = await userAccounts.findOneAndDelete({
      username:username
    })
  return res.json({
    data: {
      statusCode: statusCodes.success,
      account: {
       account
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
