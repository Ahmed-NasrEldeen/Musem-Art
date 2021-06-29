const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config/keysDev' })
const allRoutes = require('express-list-endpoints')
// require('./api/services/sqs').pop()
// Require Router Handlers
const users = require('./api/routes/user.router')
const arts = require('./api/routes/art.router')
const loggerMiddleware = require('./api/middleware/logger')
const app = express()
const port = process.env.PORT || 5006
// Init middleware
app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(loggerMiddleware)

const explore = (req, res) => {
  const routes = allRoutes(app)
  const result = {
    ServiceList: []
  }
  routes.forEach(route => {
    const name = route.path.split('/')[5]
    result.ServiceList.push({
      Service: {
        name,
        fullUrl: `http://localhost:${port}/${route.path}`
      }
    })
  })
  return res.json(result)
}
// import db configurationig
const mongo = require('./config/DBconfig')



// Direct to Route Handlers
app.use('/explore', explore)
app.use('/api/accounts/', users)
app.use('/api/art/', arts)



app.use((req, res) => {
  res.status(404).send({ err: 'No such url' })
})


// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }




app.listen(port, () => console.log(`Server up and running on ${port} 👍`))