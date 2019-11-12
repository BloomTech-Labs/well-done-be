const Data = require("../assets/cache/pumps.json");
const db = require("../data/dbConfig");
const moment = require("moment");
const axios = require("axios")

// const getPumps = Data.pumps.map(pump => console.log("getPumps", pump))

// gets current list of sensor ids
const url =
  "https://dashboard.welldone.org/.netlify/functions/get_momo_status?id="
//get call the to the url appending each of the sensor ids

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}


async function dataUpdate () {
  const getTable = async () => {
    try {
    const sensors = await sensorsTable ()
   
    let results = []
     await asyncForEach((sensors), async (sensor, index) => {
      try {
        console.log(`${index + 1}/${sensor.physical_id}`)
        const resMomo = await axios.get(`${url}${sensor.physical_id}`)
        // console.log(resMomo.data, "*****RESMO")
        let newData = {}
       resMomo.data
          ? resMomo.data.dates.forEach(async (date, index) => {
              newData = {
                ...newData,
                statuses: {
                  date: date,
                  count: resMomo.data.statuses[index].count,
                  total: resMomo.data.statuses[index].total,
                  status: resMomo.data.statuses[index].status,
                  pad_counts: resMomo.data.statuses[index].padCounts,
                  pad_seconds:resMomo.data.statuses[index].padSeconds,
                  reported_percent:resMomo.data.statuses[index].reportedPercent
                },
              }
            })
          : {}
        results.push({
          id: sensor.physical_id,
          ...sensor[sensor],
          status: resMomo.data.status,
          statuses: newData,
        })
      // console.log(results, "******RESULTS")
      } catch (err) {
        console.log(`Error on sensor #${sensor.physical_id}`)
        console.log(err.message, "this is the err")

        results.push({ id: sensor, ...sensor[sensor], status: 0, error: "500" })
      }
      
     })
     
    //  showResults(results)
    //  getUpdatedHistoryTWO(results)
     return { lastFetch: moment().unix(), sensor: results }
    } catch (err) {console.log(err.message)}
  }
 getTable()
 }


 function showResults (sensor) {
   sensor ?
   sensor.forEach(item => console.log(item), "RESULTS ARRAY ITEMS") :
   console.log("help")
 }

 showResults()

//  const getUpdatedHistoryTWO = (results) => {
  
//   const updateHistory = () => {
//         console.log("this is line 305")
//         getLastFetchTable()
//           .then(res => {    
//             if (Data.lastFetch !== res[0].last) {
//               addLastFetch(Data.lastFetch)
//               getLastFetchTable()
//             .then(res => { 
//               console.log(res, "this is 306")
//           const prevFetch = res[1].created_at.split('').slice(0,10).join('')
//           const recentFetch = res[0].created_at.split('').slice(0,10).join('')
//           const prevFetchLAST = res[1].last
//           const recentFetchLAST = res[0].last
//                   console.log(prevFetch, "this is prevFetch")
//                   console.log(recentFetch, "this is recentFetch")
//                   console.log(prevFetchLAST, "this is prevFetch")
//                   console.log(recentFetchLAST, "this is recentFetch")
//           //if prev fetch date is not the same day as the most recent fetch add the new history and pad/seconds
//           if (prevFetch !== recentFetch) {
//           Data.pumps.forEach((data, idx) => {
//           if (data.statuses) {
//             let history = {
//               sensor_id: data.id,
//               count: data.statuses.statuses ? data.statuses.statuses.count : null,
//               total: data.statuses.statuses ? data.statuses.statuses.total : null,
//               status: data.statuses.statuses ? data.statuses.statuses.status : null,
//               date: data.statuses.statuses ? data.statuses.statuses.date : null,
//               reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : null
//             }  
//             getHistoryStatuses(history)
//         } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}})
//       } else {console.log("history is current")}
//     })
//    }
//   })  
//  }
//  updateHistory()
// }

// function getHistoryStatusesTWO (history){	  
//   return db("history").insert(history, "id")
//     .then(([id]) => {	         
//           const cleanData = Data.pumps.filter(item => item.id === history.sensor_id)
       
//                 const getPadCounts = () => {
//                     let current = {
//                       history_id: id,
//                       pad_count_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[0] : null,
//                       pad_count_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[1] : null,
//                       pad_count_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[2] : null,
//                       pad_count_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[3] : null
//                     }
                    
//                     addPadCounts(current)
              
//                     }	
//                 const getPadSeconds = () => {
//                     let current = {
//                       history_id: id,
//                       pad_seconds_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[0] : null,
//                       pad_seconds_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[1] : null,
//                       pad_seconds_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[2] : null,
//                       pad_seconds_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[3] : null
//                     }
                
//                     addPadSeconds(current)
//           } 
//           getPadSeconds()
//           getPadCounts()
//         }
      
//   )
// }



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

        // addStatus(history);
      });
  }

  function addCounts(counts) {
    return db("counts")
    .returning("id")
    .insert(counts)
  }

  function addSeconds(seconds) {
    return db("pad_seconds")
    .returning("id")
    .insert(seconds)
  }

  function getHistoryFilter(filter) {
    return db("history")
    .where(filter)

    
  }

  function addStatusTest(filter) {
    try {
    return db("history")
    .returning("id")
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

  function padCountById(id) {
    return db("pad_counts")
    .where({id})
    .first()
  }

  function getPadCountHistory(id) {
    return db("pad_counts")
    .where({history_id: id})
    .first()

  }

  function updatePadCounts(current, id) {
    return db("pad_counts")
      .where({ history_id: id })
      .update(current)
      .then(res => res)
 
      // return getPadCountHistory(id)

  }

  function updatePadSeconds(current, id) {
    return db("pad_seconds")
      .where({ history_id: id })
      .update(current)
      .then(res => res)
   
  }

function pumpsTable() {
  return db("pumps")
}

function sensorsTable() {
  return db("sensors")
}

function addLastFetch(current) {
  return db("last_fetch")
  .insert({last: current})
  .returning("id")
  .then(res => console.log(current, "****line 140"))
}

function getLastFetchTable() {
  return db("last_fetch")
  .select(["created_at", "last"])
  .orderBy("created_at", "desc")
}

//gets current date
// const getCurrentPumpDate = Data.pumps.filter(item => item.statuses != undefined).filter(item => item.statuses.statuses)[0].statuses.statuses.date
// console.log(getCurrentPumpDate)

// const getUpdatedSensors = () => {
//     const sensorCheck = () => {
//       sensorsTable()
//       .then(res => {
//         if (res.length === 0) {
//           Data.pumps.forEach((data, idx) => {
//               const {
//                 id,
//                 finish_construction,
//                 well_depth,
//               } = data;
//               const getYield = data.yield
//               const getStatic = data.static
//               const sensor = {
//                 physical_id: id,
//                 data_finished: finish_construction,
//                 depth: well_depth,
//                 yield: getYield,
//                 static: getStatic
//               };
//               console.log(sensor)
//               addSensor(sensor);
//           })
//         } else if (res.length > 0) {
          
//           const current = res.map(item => item.physical_id)
//           const incoming = Data.pumps.map(item => Number(item.id))

//           let filtered = incoming.filter(item => !current.includes(item))
//           console.log(filtered.length, "this is the filtered length")
//           console.log(filtered.map(item => item), "this is what is in filtered")

//           const newSensors = Data.pumps.filter(item => filtered.includes(Number(item.id)))
//           console.log(newSensors, "this is new sensors")
  
//             newSensors.map(data => {
//               const {
//                 id,
//                 finish_construction,
//                 well_depth,
               
//               } = data;
//               const getYield = data.yield
//               const getStatic = data.static
//               const sensor = {
//                 physical_id: id,
//                 data_finished: finish_construction,
//                 depth: well_depth,
//                 yield: getYield,
//                 static: getStatic
//               };
             
//               addSensor(sensor);
//         })
//       }
//     }) 
//   }
//   sensorCheck() 
// }


// const getUpdatedPumps = () => {
//   const pumpCheck = () => {
//     pumpsTable()
//     .then(res => {
//       if (res.length === 0) {
//         Data.pumps.forEach((data, idx) => {
//           const {
//             id,
//             latitude,
//             longitude,
//             village: { village, commune, district, province }
//           } = data;
//           const pump = {
//             sensor_pid: id,
//             latitude: latitude,
//             longitude: longitude,
//             country_name: village,
//             commune_name: commune,
//             district_name: district,
//             province_name: province
//           };
//           addPump(pump);
//         })
//       } else if (res.length > 0) {
        
//         const current = res.map(item => item.sensor_pid)
//         const incoming = Data.pumps.map(item => Number(item.id))

//         let filtered = incoming.filter(item => !current.includes(item))
//         console.log(filtered.length, "this is the filtered length")
//         console.log(filtered.map(item => item), "this is what is in filtered")

//         const newPumps = Data.pumps.filter(item => filtered.includes(Number(item.id)))
//         console.log(newPumps, "these are the new pumps")

//           newPumps.map(data => {
//             const {
//               id,
//               latitude,
//               longitude,
//               village: { village, commune, district, province }
//             } = data;
//             const pump = {
//               sensor_pid: id,
//               latitude: latitude,
//               longitude: longitude,
//               country_name: village,
//               commune_name: commune,
//               district_name: district,
//               province_name: province
//             };
//             addPump(pump);
//       })
//     }
//   }) 
// }
// pumpCheck() 
// }


// const setLastFetchTable = () => {
//   console.log("line 273")
//   const fetchCheck = () => {
//     getLastFetchTable()
//     .then(res => {
//       if (res.length === 0) {
//         addLastFetch(Data.lastFetch)
//         Data.pumps.forEach((data, idx) => {
//           if (data.statuses) {
//             let history = {
//               sensor_id: data.id,
//               count: data.statuses.statuses ? data.statuses.statuses.count : null,
//               total: data.statuses.statuses ? data.statuses.statuses.total : null,
//               status: data.statuses.statuses ? data.statuses.statuses.status : null,
//               date: data.statuses.statuses ? data.statuses.statuses.date : null,
//               reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : null
//             }  
//             getHistoryStatuses(history)
//         } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}
//       })
     

//       } else {
//         getUpdatedHistory()
//       }
//     })
//  }
//  fetchCheck()
// }

// const getUpdatedHistory = () => {
  
//   const updateHistory = () => {
//         console.log("this is line 305")
//         getLastFetchTable()
//           .then(res => {    
//             if (Data.lastFetch !== res[0].last) {
//               addLastFetch(Data.lastFetch)
//               getLastFetchTable()
//             .then(res => { 
//               console.log(res, "this is 306")
//           const prevFetch = res[1].created_at.split('').slice(0,10).join('')
//           const recentFetch = res[0].created_at.split('').slice(0,10).join('')
//           const prevFetchLAST = res[1].last
//           const recentFetchLAST = res[0].last
//                   console.log(prevFetch, "this is prevFetch")
//                   console.log(recentFetch, "this is recentFetch")
//                   console.log(prevFetchLAST, "this is prevFetch")
//                   console.log(recentFetchLAST, "this is recentFetch")
//           //if prev fetch date is not the same day as the most recent fetch add the new history and pad/seconds
//           if (prevFetch !== recentFetch) {
//           Data.pumps.forEach((data, idx) => {
//           if (data.statuses) {
//             let history = {
//               sensor_id: data.id,
//               count: data.statuses.statuses ? data.statuses.statuses.count : null,
//               total: data.statuses.statuses ? data.statuses.statuses.total : null,
//               status: data.statuses.statuses ? data.statuses.statuses.status : null,
//               date: data.statuses.statuses ? data.statuses.statuses.date : null,
//               reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : null
//             }  
//             getHistoryStatuses(history)
//         } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}})
//       } else {console.log("history is current")}
//     })
//    }
//   })  
//  }
//  updateHistory()
// }

// function getHistoryStatuses (history){	  
//   return db("history").insert(history, "id")
//     .then(([id]) => {	         
//           const cleanData = Data.pumps.filter(item => item.id === history.sensor_id)
       
//                 const getPadCounts = () => {
//                     let current = {
//                       history_id: id,
//                       pad_count_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[0] : null,
//                       pad_count_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[1] : null,
//                       pad_count_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[2] : null,
//                       pad_count_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[3] : null
//                     }
                    
//                     addPadCounts(current)
              
//                     }	
//                 const getPadSeconds = () => {
//                     let current = {
//                       history_id: id,
//                       pad_seconds_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[0] : null,
//                       pad_seconds_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[1] : null,
//                       pad_seconds_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[2] : null,
//                       pad_seconds_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[3] : null
//                     }
                
//                     addPadSeconds(current)
//           } 
//           getPadSeconds()
//           getPadCounts()
//         }
      
//   )
// }

// getUpdatedSensors()
// getUpdatedPumps()
// setLastFetchTable()

// module.exports = {getUpdated: function () {
//   getUpdatedSensors,
//   getUpdatedPumps,
//   setLastFetchTable
//   }
// }

dataUpdate()
module.exports = {getUpdated: function () {
  dataUpdate
  }
}