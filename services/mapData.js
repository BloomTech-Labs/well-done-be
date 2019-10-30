const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");


// const getPumps = Data.pumps.map(pump => console.log("getPumps", pump))

let target = {
    "id": 13,
    "date": "Sun Oct 27 2019",
    "count": 112,
    "total": 4129758402,
    "status": 2,
    "sensor_id": 4715,
    "pad_seconds": "[2928,3625,1830,276]",
    "pad_counts": "[26,28,25,13]",
    "reported_percent": 0.3888888888888889 
}


const seedJSONSensors = () => {
  Data.pumps.map(data => {
    // console.log(data);
    const {
      id,
      finish_construction,
      well_depth,
      yield,
      static,
    } = data;
    const sensor = {
      physical_id: id,
      data_finished: finish_construction,
      depth: well_depth,
      yield: yield,
      static: static
    };
    addSensor(sensor);
    // console.log("sensor", sensor);
  });
};

seedJSONSensors()

const seedJSONPumps = () => {
    Data.pumps.map(data => {
      // console.log(data);
      const {
        id,
        latitude,
        longitude,
        village: { village, commune, district, province }
      } = data;
      const pump = {
        sensor_ID: id,
        latitude: latitude,
        longitude: longitude,
        country_name: village,
        commune_name: commune,
        district_name: district,
        province_name: province
      };
      addPump(pump);
    //   console.log("pump", pump);
    });
  };

  seedJSONPumps();


  //  const seedJSONHistory = () => {
  //    Data.pumps.forEach((data, idx) => {
  //    if (data.statuses) {
  //      console.log("julie is here")
  //      let history = {
  //       sensor_id: Data.pumps[idx].id,
  //       count: Data.pumps[idx].statuses.statuses ? Data.pumps[idx].statuses.statuses.count : 0,
  //       total: Data.pumps[idx].statuses.statuses ? Data.pumps[idx].statuses.statuses.total : 0,
  //       status: Data.pumps[idx].statuses.statuses ? Data.pumps[idx].statuses.statuses.status : 0,
  //       date: Data.pumps[idx].statuses.statuses ? Data.pumps[idx].statuses.statuses.date : "",
  //       reported_percent: Data.pumps[idx].statuses.statuses ? Data.pumps[idx].statuses.statuses.reported_percent : 0
  //      }  
  //      let currentId = history.sensor_id   
  //     //  console.log(currentId, "this is the current id")  
  //      addHistory(history);
  //     //  addStatus(history);
  //     } else {console.log("these are empty")}})
  //   };

    const seedJSONHistory = () => {
      Data.pumps.forEach((data, idx) => {
      if (data.statuses) {
        let history = {
         sensor_id: data.id,
         count: data.statuses.statuses ? data.statuses.statuses.count : 0,
         total: data.statuses.statuses ? data.statuses.statuses.total : 0,
         status: data.statuses.statuses ? data.statuses.statuses.status : 0,
         date: data.statuses.statuses ? data.statuses.statuses.date : "",
         reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : 0
        }  
        let currentId = history.sensor_id   
        // console.log(history.reported_percent, "reported percent")
        // console.log(currentId, "this is the current id")
      //  history.reported_percent  ? 
        addHistory(history)
        addStatus(history);
       } else {console.log("these are empty")}})
     };

    // const seedJSONHistory = () => {
    //   Data.pumps.map(data => {
    //      // console.log('current data map = ', data);
    //      let sensor_ID = ''; 
    //      let count = 0; 
    //      let total = 0; 
    //      let status = 0;
    //      let date = '';
    //      let pad_seconds = [];
    //      let pad_counts = []; 
    //      let reported_percent = 0;
    //      let history = {};
 
    //      if(typeof data.statuses.statuses !== 'undefined'){
 
    //        sensor_ID = data.id;
    //        count = data.statuses.statuses.count;
    //        total = data.statuses.statuses.total;
    //        status = data.statuses.statuses.status;
    //        date = data.statuses.statuses.date;
    //        pad_seconds = data.statuses.statuses.pad_seconds;
    //        pad_counts = data.statuses.statuses.pad_counts;
    //        reported_percent = data.statuses.statuses.reported_percent;
           
           
    //        history = {
    //          sensor_ID,
    //          count,
    //          total,
    //          status,
    //          date,
    //          pad_seconds,
    //          pad_counts,
    //          reported_percent
    //        }  
    //        let currentId = history.sensor_id   
    //        addHistory(history);
    //      }
    //    //  console.log(currentId, "this is the current id")  
    //    console.log("*******************history****************", history);
    //     //addStatus(history);
    //   })
    // };

  // const seedJSONHistory = () => {
  //   for (let i = 0; i < Data.pumps.length; i++) {
  //     if (Data.pumps[i].statuses) {
  //       let history = {
  //                sensor_id: Data.pumps[i].id,
  //                count: Data.pumps[i].statuses.statuses ? Data.pumps[i].statuses.statuses.count : 0,
  //                total: Data.pumps[i].statuses.statuses ? Data.pumps[i].statuses.statuses.total : 0,
  //                status: Data.pumps[i].statuses.statuses ? Data.pumps[i].statuses.statuses.status : 0,
  //                date: Data.pumps[i].statuses.statuses ? Data.pumps[i].statuses.statuses.date : "",
  //               reported_percent: Data.pumps[i].statuses.statuses ? Data.pumps[i].statuses.statuses.reported_percent : 0
  //              }  
  //              let currentId = history.sensor_id   
  //             //  console.log(currentId, "this is the current id")  
  //              addHistory(history);
  //              addStatus(history);
  //             }
  //             else {
  //               console.log("empty")
  //             }
  //     } 
  // }
  

  
        
    

  seedJSONHistory()

function addPump(pump) {
  return db("pumps")
    .insert(pump)
    .returning("id")
    .then(res => {
      console.log(res);
    });
}

function addSensor(sensor) {
    return db("sensors")
      .insert(sensor)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

  function addHistory(history) {
    return db("history")
      .insert(history)
      .returning("id")
      .then(res => {
        console.log(res);

        addStatus(history);
      });
  }

  function addCounts(counts) {
    return db("counts")
    .insert(counts)
  }

  function addSeconds(seconds) {
    return db("pad_seconds")
    .insert(seconds)
  }

  function getHistoryFilter(filter) {
    return db("history")
    .where(filter)

    
  }

  function addStatusTest(filter) {
    try {
    return db("history")
    .where(filter)
    .first()
    } catch (err) {
      console.log(err.message)

    }
  }

  function addPadCounts(counts) {
    return db("pad_counts")
      .insert(counts)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

  function addPadSeconds(seconds) {
    return db("pad_seconds")
      .insert(seconds)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

function addStatus (history){
  const {sensor_id} = history
  addStatusTest({sensor_id})
    .then(res => {
      const getPadCounts = Data.pumps.forEach((data, idx) => {
        if (data.statuses) {
        const insertPadCounts = data.statuses.statuses.pad_counts.map(item => {
          let counts = {
          history_id: res.id,
          counts: item
          }
          console.log(counts)
          addPadCounts(counts, console.log("help"))
        })
      } else {console.log("statuses is empty (line 182)")}})
      const getPadSeconds = Data.pumps.forEach((data, idx) => {
        if (data.statuses) {
        const insertPadSeconds = data.statuses.statuses.pad_seconds.map(item => {
          let seconds = {
          history_id: res.id,
          seconds: item
          }
          console.log(seconds)
          addPadSeconds(seconds, console.log("help"))
        })
      } else {console.log("statuses is empty (line 193)")}})
    })
  }

 
        
module.exports = seedJSONPumps, seedJSONHistory, seedJSONSensors;
