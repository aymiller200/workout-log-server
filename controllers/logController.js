const router = require('express').Router()
const Log = require('../models/log')
const validate = require('../middleware/validateSession')

router.get('/testingTwo', (req, res) => {
    res.send('This is the log controller')
})

/*
* **************
* LOG CREATION *
* **************
*/
router.post('/create', validate, (req, res) => {

    Log.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id 

    })
    .then(log => res.status(200).json({ log }))
    .catch(err => res.status(500).json({ error:err }))
})

/*
* **************
* GET ALL LOGS *
* **************
*/
router.get('/all', (req, res) => {

    Log.findAll()
    .then(logs => res.status(200).json({message: `${logs.length} logs found!`, logs}))
    .catch(err => res.status(500). json({ error:err }))

})

/*
* **************
* GET LOGS BY ID*
* **************
*/
router.get('/mine/:id',validate, (req,res) =>{
    Log.findAll({
        where: { owner_id: req.params.id } 
    })

    .then(myLogs => res.status(200).json({message: 'Here are your logs!', myLogs}))
    .catch(err => res.status(500).json({ error: err }))
})


/*
* **************
* UPDATE LOGS *
* **************
*/
router.put('/update/:id', validate, (req,res) => {
    Log.update(req.body, { where: { owner_id: req.params.id } })

    .then(update => res.status(200).json({ message: `Update successful for user ${req.params.id}!`, update }))

    .catch(err => res.status(200).json({ error:err }))

})

/*
* **************
* DELETE LOGS *
* **************
*/

router.delete('/delete/:id',validate, (req, res) => {
    Log.destroy({ where: {owner_id: req.params.id} })

    .then(deleted => res.status(200).json({ message: 'Log deleted', deleted }))
    .catch(err => res.status(500).json({ error: err }))
})


module.exports =router