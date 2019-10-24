const Pumps = require('../assets/cache/pumps.json')
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");



// const getPumps = Pumps.pumps.map(pump => console.log(pump))
 

const seedJSONPumps = () => {
    let pumpArr = [];
    Pumps.pumps.map(data => {
        // console.log(data);
        const {id, latitude, longitude, village: {village, commune, district, province}} = data;
        const pump = {
            latitude: latitude,
            longitude: longitude,
            country_name: village,
            commune_name: commune,
            district_name: district,
            province_name: province, 
        }
        addPump(pump)
        console.log(pump)
      
        // return db('pumps').insert(pump)
        // pumpArr.push(pump);
        // sensorArr.push(sensor);
    }); 
    console.log(pumpArr) 
    console.log(typeof PumpModel.addPumps)
    PumpModel.addPumps(pumpArr); 

}
function addPump(pump) {
    console.log('knex function')
return db('pumps')
.insert(pump)
.returning("id")
.then(res => {
    console.log(res)
})
}

seedJSONPumps()

module.exports = seedJSONPumps;