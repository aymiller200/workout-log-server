require('dotenv').config()
const Express = require('express');
const app = Express();
const database = require('./db')
const userController = require('./controllers/userController')
const logController = require('./controllers/logController')

app.use(require('./middleware/headers'))
app.use(Express.json())

// app.use('/testing', function(req, res){
//     res.send('endpoint success')
// })

app.use('/user', userController)
app.use('/log', logController)


database.sync()

app.listen(process.env.PORT, () => {
    console.log(`app is listening on port: ${process.env.PORT}`)
})

