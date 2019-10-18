const router = require('express').Router();

const Sensors = require('./sensor.model');

//POST a sensor
router.post('/', (req,res) => {
    const sensorData = req.body;
    console.log('sensorData', sensorData)
    Sensors.addSensor(sensorData)
            .then(sensor => {
                console.log(sensor)
                res.status(201).json(sensor)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
})

//GET sensors
router.get('/', (req,res) => {
    
})



//GET a sensor by id
router.get('/:id', (req,res) => {
    
})




//GET a sensor by org_name
router.get('/org_name', (req,res) => {
    
})





//UPDATE a sensor
router.patch('/', (req,res) => {
    
})



//DELETE a sensor
router.delete('/', (req,res) => {
    
})

module.exports = router;