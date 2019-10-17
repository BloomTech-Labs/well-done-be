const router = require('express').Router();


const Pumps = require('./pumps.model');


//POST a pump
router.post('/', (req,res) => {
    const pumpData = req.body;
    console.log('pumpData', pumpData)
    Pumps.addPump(pumpData)
        .then(pump => {
            res.status(201).json(pump)
        })
        .catch(err => {
            res.status(500).json(err)
        })
} )

//GET pumps
router.get('/', (req,res) => {
    Pumps.getPumps()
        .then(pumps => {
            console.log('pumps', pumps)
            res.status(200).json(pumps)
        })
        .catch(err => {
            res.status(500).json({message: "Fail to retrieve pumps"})
        })
})

module.exports = router;
