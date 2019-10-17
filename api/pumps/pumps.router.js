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
            const listPumps = []
            pumps.map(eachPump => {
                // console.log('eachPump', eachPump)
                const pumpsInfo = {
                    pump: {
                        pump_id: eachPump.id,
                        country_name: eachPump.country_name,
                        province_name: eachPump.province_name,
                        commune_name: eachPump.commune_name,
                        district_name: eachPump.district_name,
                        latitude: eachPump.latitude,
                        longitude: eachPump.longitude,
                        organization: {
                            organization_id: eachPump.organization_id,
                            organization_name: eachPump.organization_name,
                            headquarter_city: eachPump.headquarter_city,
                            accounts: {
                                accounts_id: eachPump.accounts_id,
                                first_name: eachPump.first_name,
                                last_name: eachPump.last_name,
                                email_address: eachPump.email_address,
                                mobile_number: eachPump.mobile_number
                                    }
                                }
                            }
                }
                console.log(pumpsInfo)
                return listPumps.push(pumpsInfo)
            })
            console.log('fores')
            console.log('listPump', listPumps)
            res.status(200).json(listPumps)
            
        })
    
        .catch(err => {
            res.status(500).json({message: "Fail to retrieve pumps"})
        })
})

//GET a pump by id
router.get('/:id', (req,res) => {
    const {id} = req.params;
    Pumps.getPumpById(id)
        .then(pump => {
            if(pump){
                res.status(200).json(pump)
            }
            else res.status(404).json({message: 'pump does not exist'})
            
        })
        .catch(err => res.status(500).json(err))
})

//UPDATE a pumps
router.patch('/:id', (req,res) => {
    const change = req.body;
    const {id} = req.params;
    Pumps.getPumpById(id)
        .then(pump => {
            if (pump){
                Pumps.updatePump(id, change)
                    .then(count => {
                        res.status(200).json({message: `updated ${count} pump`})
                    })
                    .catch(err => res.status(500).json(err))
                }
            else {res.status(404).json({message: 'pump does not exist'})}
            })
        .catch(err => res.json(err))
    
})

//DELETE a pumps
router.delete('/:id', (req,res) => {
    const {id} = req.params;
    console.log('id',id)
    Pumps.getPumpById(id)
        .then(pump => {
            console.log(pump)
            if (pump){
                Pumps.deletePump(id)
                    .then(count => {
                        console.log('fired')
                        res.status(200).json({message: `deleted ${count} pump`})
                    })
                    .catch(err => res.status(500).json(err))
                }
            else {res.status(404).json({message: 'pump does not exist'})}
            })
        .catch(err => res.status(500).json(err))
    // Pumps.deletePump(id)
    //     .then(count => {
    //         console.log('count', count)
    //         res.status(200).json({message: `deleted ${count} pump`})
    //     })
    //     .catch(err => res.status(500).json({message: 'something wrong'}))
    
})

// //These routes are to test get pumps
// //POST an Org
// router.post('/org', (req,res) => {
//     const orgData = req.body;
//     console.log('orgData', orgData)
//     Pumps.addOrg(orgData)
//         .then(org => {
//             res.status(201).json(org)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
// } )

// //GET orgs
// router.get('/org', (req,res) => {
//     Pumps.getOrgs()
//         .then(orgs => {
//             console.log('orgs', orgs)
//             res.status(200).json(orgs)
//         })
//         .catch(err => {
//             res.status(500).json({message: "Fail to retrieve orgs"})
//         })
// })

// //POST account
// router.post('/acc', (req,res) => {
//     const accData = req.body;
//     console.log('accData', accData)
//     Pumps.addAccount(accData)
//         .then(acc => {
//             res.status(201).json(acc)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
// } )

module.exports = router;
