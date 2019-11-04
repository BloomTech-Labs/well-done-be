const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
// const router = require("express").Router();
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
  .then(res => console.log(current, "****line 140"))
}

function getLastFetchTable() {
  return db("last_fetch")
  .select(["created_at", "last"])
  .orderBy("created_at", "desc")
}

//gets current date
const getCurrentPumpDate = Data.pumps.filter(item => item.statuses != undefined).filter(item => item.statuses.statuses)[0].statuses.statuses.date
console.log(getCurrentPumpDate)

const getUpdatedSensors = () => {
    const sensorCheck = () => {
      sensorsTable()
      .then(res => {
        if (res.length === 0) {
          Data.pumps.forEach((data, idx) => {
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
          })
        } else if (res.length > 0) {
          
          const current = res.map(item => item.physical_id)
          const incoming = Data.pumps.map(item => Number(item.id))

          let filtered = incoming.filter(item => !current.includes(item))
          console.log(filtered.length, "this is the filtered length")
          console.log(filtered.map(item => item), "this is what is in filtered")

          const newSensors = Data.pumps.filter(item => filtered.includes(Number(item.id)))
          console.log(newSensors, "this is new sensors")
  
            newSensors.map(data => {
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
        })
      }
    }) 
  }
  sensorCheck() 
}


const getUpdatedPumps = () => {
  const pumpCheck = () => {
    pumpsTable()
    .then(res => {
      if (res.length === 0) {
        Data.pumps.forEach((data, idx) => {
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
        })
      } else if (res.length > 0) {
        
        const current = res.map(item => item.sensor_ID)
        const incoming = Data.pumps.map(item => Number(item.id))

        let filtered = incoming.filter(item => !current.includes(item))
        console.log(filtered.length, "this is the filtered length")
        console.log(filtered.map(item => item), "this is what is in filtered")

        const newPumps = Data.pumps.filter(item => filtered.includes(Number(item.id)))
        console.log(newPumps, "these are the new pumps")

          newPumps.map(data => {
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
      })
    }
  }) 
}
pumpCheck() 
}


const setLastFetchTable = () => {
  console.log("line 273")
  const fetchCheck = () => {
    getLastFetchTable()
    .then(res => {
      if (res.length === 0) {
        addLastFetch(Data.lastFetch)
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
            getHistoryStatuses(history)
        } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}
      })
     

      } else {getUpdatedHistory()}
        // console.log(`last_fetch table length: ${res.length}`)}
    })
   
 }
 fetchCheck()
}

const getUpdatedHistory = () => {
  
  const updateHistory = () => {
    console.log("this is line 305")
    getLastFetchTable()
      .then(res => {    
        if (Data.lastFetch !== res[0].last) {
          addLastFetch(Data.lastFetch)
          getLastFetchTable()
        .then(res => { 
      const prevFetch = res[1].created_at.split('').slice(0,10).join('')
      const recentFetch = res[0].created_at.split('').slice(0,10).join('')
      const prevFetchLAST = res[1].last
      const recentFetchLAST = res[0].last
              console.log(prevFetch, "this is prevFetch")
              console.log(recentFetch, "this is recentFetch")
              console.log(prevFetchLAST, "this is prevFetch")
              console.log(recentFetchLAST, "this is recentFetch")
      //if prev fetch date is not the same day as the most recent fetch add the new history and pad/seconds
      if (prevFetch !== recentFetch) {
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
        getHistoryStatuses(history)
    } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}})
  } else {console.log("history is current")}
})
  }

 })
  
 }
 updateHistory()
}


function getHistoryStatuses (history){	  
  return db("history").insert(history, "id")
    .then(([id]) => {	         
          const cleanData = Data.pumps.filter(item => item.id === history.sensor_id)
          if (cleanData[0].statuses.statuses === undefined) {
            console.log(`no statuses associated with sensor id ${history.sensor_id}`)
          } else {
                const getPadCounts = () => {
                    let current = {
                      history_id: id,
                      count_0: cleanData[0].statuses.statuses.pad_counts[0],
                      count_1: cleanData[0].statuses.statuses.pad_counts[1],
                      count_2: cleanData[0].statuses.statuses.pad_counts[2],
                      count_3: cleanData[0].statuses.statuses.pad_counts[3]
                    }
                    
                    addPadCounts(current)
              
                    }	
                const getPadSeconds = () => {
                    let current = {
                      history_id: id,
                      seconds_0: cleanData[0].statuses.statuses.pad_seconds[0],
                      seconds_1: cleanData[0].statuses.statuses.pad_seconds[1],
                      seconds_2: cleanData[0].statuses.statuses.pad_seconds[2],
                      seconds_3: cleanData[0].statuses.statuses.pad_seconds[3]
                    }
                
                    addPadSeconds(current)
          } 
          getPadSeconds()
          getPadCounts()
        }
      }
  )
}
// module.exports = getUpdatedSensors;
getUpdatedSensors()
getUpdatedPumps()
setLastFetchTable()
// module.exports = {getUpdated: function () {
//   getUpdatedSensors()
//   getUpdatedPumps()
//   setLastFetchTable()
//   }
// }



//this is the previous working version of getUpdatedPumps

// const getUpdatedPumps = () => {
//   Data.pumps.map(data => {
//     const pumpCheck = () => {
//       pumpsTable()
//       const pumpFilter = pumpCheck.map(item => {
//         if (item.id !== data.id) {
    
//     const {
//       id,
//       latitude,
//       longitude,
//       village: { village, commune, district, province }
//     } = data;
//     const pump = {
//       sensor_ID: id,
//       latitude: latitude,
//       longitude: longitude,
//       country_name: village,
//       commune_name: commune,
//       district_name: district,
//       province_name: province
//     };
//     addPump(pump);
//   } else {console.log(`${item.id} is already in database`)}});
        
//     }
//   })
// }


//   function getHistoryStatuses (history){	  
//     return db("history").insert(history, "id")
//       .then(([id]) => {	
//       const getPadCounts = Data.pumps.forEach((data, idx) => {
//           if (data.id === history.sensor_id) {
//  //get just the history that matches the history that needs to have statuses added:           
//             const cleanData = Data.pumps.filter(item => item.id === history.sensor_id)
//       //only add statuses to histories that don't contain an empty statuses object: 
//             if (cleanData[0].statuses.statuses === undefined) {
//               console.log(`no statuses associated with sensor id ${history.sensor_id}`)
//             } else {
//               let count1 = 0
//               let count2 = 0        
//                   const getPadCounts = cleanData[0].statuses.statuses.pad_counts.map(item => {
//                     if(count1 === 0) {
//                       let current = {
//                         history_id: id,
//                         [`count_${count1}`]: null ? item : item,
//                       }
//                       count1++
//                       addPadCounts(current)
//                   } else if (count1 < 4) {
//                     let current = {
//                         history_id: id,
//                         [`count_${count1}`]: null ? item : item,
//                       }
//                       count1++
//                       updatePadCounts(current, id)
//                   } 
//                       else {
//                         count1 = 0
//                       }})	
//             const getPadSeconds = cleanData[0].statuses.statuses.pad_seconds.map(item => {
//               if(count2 === 0) {
//                 let current = {
//                   history_id: id,
//                   [`seconds_${count2}`]: null ? item : item,
//                 }
//                 count2++
//                 addPadSeconds(current)
//             } else if (count2 < 4) {
//               let current = {
//                   history_id: id,
//                   [`seconds_${count2}`]: null ? item : item,
//                 }
//                 count2++
//                 updatePadSeconds(current, id)
//             } 
//                 else {
//                   count2 = 0
//                 }})	
//       }}})
//     })
// }


  //THIS ADD STATUS iteration is for a database where padcount and padseconds are entered 1 at a time 
//each in there own separate column and labeled "count", or "seconds"

  // function addStatus (history){	  
  //   return db("history").insert(history, "id")
  //     .then(([id]) => {	
  //       const getPadCounts = Data.pumps.forEach((data, idx) => {
  //         if (data.id === history.sensor_id) {
  //           const cleanData = Data.pumps.filter(item => item.id === history.sensor_id)          
  //                 const getPadCounts = cleanData[0].statuses.statuses.pad_counts.map(item => {
  //                   let current = {
  //                   history_id: id,
  //                   counts: item
  //                   }
  //                   addPadCounts(current)
  //                 })	
  //                 const getPadSeconds = cleanData[0].statuses.statuses.pad_seconds.map(item => {
  //                   let current = {
  //                   history_id: id,
  //                   seconds: item
  //                   }
  //                   addPadSeconds(current)
  //                 })
  //               }})
  //             })
  //           //})
  //         }

 
        
  // const getUpdatedSensors = () => {



  //   // Data.pumps.forEach((data, idx) => {
  //     const sensorCheck = () => {
  //       sensorsTable()
  //       .then(res => {
  //         // console.log(res, "this is the res line 149")
  //         // const filtered = res.filter(item => item.physical_id !== data.id)
  //         //filters new fetched data
  //         // console.log(res, "this is res line 193")
  //         if (res.length === 0) {
  //           // console.log("I am line 290")
  //           Data.pumps.forEach((data, idx) => {
  //           //  console.log("I am line 291")
  //               // if (item.physical_id !== data.id) {
  //               // console.log(`${item.physical_id} and ${data.id}`)
  //               const {
  //                 id,
  //                 finish_construction,
  //                 well_depth,
  //                 yield,
  //                 static,
  //               } = data;
  //               const sensor = {
  //                 physical_id: id,
  //                 data_finished: finish_construction,
  //                 depth: well_depth,
  //                 yield: yield,
  //                 static: static
  //               };
  //               addSensor(sensor);
                
  //             // } else {console.log(`${item.id} is already in database`)}});
  //           })
  //         } else if (res.length > 0) {
  //           // console.log(res.length, "this is length 313")
  //           const current = res.map(item => item.physical_id)
  //           const incoming = Data.pumps.map(item => item.id)
  
  //           console.log(current)
  
  //         }
  //       })
  //     }
  
            // const filtered = Data.pumps.filter(item => item.id !== res_Physical_Ids)
  
           
  
            // const filtered = Data.pumps.map(item => {
  
  
            //   const filter = res_Physical_Ids
              
            // })
  
          //  const filtered = () => {
          //    let result = []
          //    for (item in incomingData_Ids){
          //      if(item.includes(res_Physical_Ids)) {
          //         result.push(item)
          //      }
          //    }
             
          //    return result;
          //  } 
  
      //      const filtered = () => {
      //       let result = []
      //       let dupes = []
      //       for (let item1 in current){
      //         // console.log(current[item1], "this is item1")
      //         if(incoming.indexOf(current[item1]) === -1) {
                
      //            result.push(incoming[item1])
      //         } else {dupes.push(incoming[item1])}
      //       }
            
           
          
      //     return result;
      //   } 
  
      //       console.log(filtered(), "line 314")
  
      //       filtered() ?
      //       filtered().map(data => {
      //         // console.log("line 316**********")
      //         // if (item.physical_id !== data.id) {
      //         // console.log(`${item.physical_id} and ${data.id}`)
      //         const {
      //           id,
      //           finish_construction,
      //           well_depth,
      //           yield,
      //           static,
      //         } = data;
      //         const sensor = {
      //           physical_id: id,
      //           data_finished: finish_construction,
      //           depth: well_depth,
      //           yield: yield,
      //           static: static
      //         };
      //         addSensor(sensor);
              
      //       // } else {console.log(`${item.id} is already in database`)}});
      //     }) : console.log("filtered is undefined")
      //     }})
          
      // } 
    //   sensorCheck()
    // }
    
    // const getUpdatedSensors = () => {




// const getUpdatedSensors = () => {



//   Data.pumps.forEach((data, idx) => {
//     const sensorCheck = () => {
//       sensorsTable()
//       .then(res => {
//         // console.log(res, "this is the res line 149")
//         // const filtered = res.filter(item => item.physical_id !== data.id)
//         //filters new fetched data
//         console.log(res, "this is res line 193")
//         const filtered = Data.pumps.filter(item => item.id !== res.physical_id)
//         // console.log(filtered, "line 194 filtered")

//         if (filtered.length > 0 || res.length === 0) {

//         filtered.map(item => {
//           // if (item.physical_id !== data.id) {
//           // console.log(`${item.physical_id} and ${data.id}`)
//           const {
//             id,
//             finish_construction,
//             well_depth,
//             yield,
//             static,
//           } = data;
//           const sensor = {
//             physical_id: id,
//             data_finished: finish_construction,
//             depth: well_depth,
//             yield: yield,
//             static: static
//           };
//           addSensor(sensor);
          
//         // } else {console.log(`${item.id} is already in database`)}});
//       })
//     } else {console.log(`hi!`)}});

//         }
//         sensorCheck()
//       })
    
      
//     }
  
// const getUpdatedSensors = () => {



//   // Data.pumps.forEach((data, idx) => {
//     const sensorCheck = () => {
//       sensorsTable()
//       .then(res => {
//         // console.log(res, "this is the res line 149")
//         // const filtered = res.filter(item => item.physical_id !== data.id)
//         //filters new fetched data
//         console.log(res, "this is res line 193")
//         const filtered = Data.pumps.filter(item => item.id !== res.physical_id)
//         console.log(filtered, "line 194 filtered")

//         if (filtered) {
//           // console.log("filtered",filtered)
//         filtered.map(data => {
//           // if (item.physical_id !== data.id) {
//           // console.log(`${item.physical_id} and ${data.id}`)
//           const {
//             id,
//             finish_construction,
//             well_depth,
//             yield,
//             static,
//           } = data;
//           const sensor = {
//             physical_id: id,
//             data_finished: finish_construction,
//             depth: well_depth,
//             yield: yield,
//             static: static
//           };
//           addSensor(sensor);
          
//         // } else {console.log(`${item.id} is already in database`)}});
//       })
//     } else {console.log(`filtered is an empty array`)}});

//         }
//         sensorCheck()
//       // })
    
      
//     }
  