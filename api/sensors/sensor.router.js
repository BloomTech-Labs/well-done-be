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
    Sensors.getSensors()
            .then(sensors => {
                const listSensors = []
                sensors.map(eachSensor => {
                    const sensorsInfo = {
                        sensor: {
                            sensor_id: eachSensor.id,
                            physical_id: eachSensor.physical_id,
                            kind: eachSensor.kind,
                            type: eachSensor.type,
                            cellular: eachSensor.cellular,
                            bluetooth: eachSensor.bluetooth,
                            training: eachSensor.training,
                            remark: eachSensor.remark,
                            data_finished: eachSensor.data_finished,
                            depth: eachSensor.depth,
                            yield: eachSensor.yield,
                            static: eachSensor.static,
                            quality: eachSensor.quality,
                            level_dynamic: eachSensor.level_dynamic,
                            pump: {
                                pump_id: eachSensor.pump_id,
                                country_name: eachSensor.country_name,
                                province_name: eachSensor.province_name,
                                commune_name: eachSensor.commune_name,
                                district_name: eachSensor.district_name,
                                organization: {
                                    org_name: eachSensor.org_name,
                                    headquarter_city: eachSensor.headquarter_city
                                }
                            }
                        }
                    }
                    console.log(sensorsInfo)
                    return listSensors.push(sensorsInfo)
                })
                console.log('listSensors', listSensors)
                res.status(200).json(listSensors)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
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