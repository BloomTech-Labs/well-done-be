const Data = require("../assets/cache/pumps.json");
const db = require("../data/dbConfig");
const moment = require("moment");
const axios = require("axios")
const prismic = require("./prismicData")

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

function getOrgs () {
  return db("organizations")
}

function addOrgs (organization) {
  return db("organizations")
  .insert(organization)
  .returning("id")
}

function getOrgIdByName (filter) {
  return db("organizations")
  .where({org_name: filter})
  .first()
  
}

const getUpdatedSensors = () => {
  // initially this function gets all available sensor data from pumps.json in an instance
  //the DB has been rolled back and remigrated and is empty, else it gets any new pump sensor data
  // and updates the Welldone DB
  const sensorCheck = () => {
    sensorsTable()
    .then(res => {
      if (res.length === 0) {
        Data.pumps.forEach((data, idx) => {
            const {
              id,
              finish_construction,
              well_depth,
            } = data;
            const getYield = data.yield
            const getStatic = data.static
            const sensor = {
              physical_id: id,
              data_finished: finish_construction,
              depth: well_depth,
              yield: getYield,
              static: getStatic
            };
            console.log(sensor)
            addSensor(sensor);
        })
        dataUpdate()
      } else if (res.length > 0) {
         // after performing a npm run fetch, there could be new pumps with sensor data - 
        //check to see if there is any new pumps with sensor data coming from primic cached in pumps.json
        const current = res.map(item => item.physical_id)
        const incoming = Data.pumps.map(item => Number(item.id))
        let filtered = incoming.filter(item => !current.includes(item))
        const newSensors = Data.pumps.filter(item => filtered.includes(Number(item.id)))
       if (newSensors.length > 0) {
          newSensors.map(data => {
            const {
              id,
              finish_construction,
              well_depth,
             
            } = data;
            const getYield = data.yield
            const getStatic = data.static
            const sensor = {
              physical_id: id,
              data_finished: finish_construction,
              depth: well_depth,
              yield: getYield,
              static: getStatic
            };
           
            addSensor(sensor);
      })
      dataUpdate()
    } else {
      console.log("no new sensor data")
      dataUpdate()
    }
   }
  }) 
 }
sensorCheck() 
}

// this function checks prismic pumps and adds to welldone db
// then once complete, get pumps gets the id for each org
async function getPrismicOrgs() {
  let orgResults = []
  const prismicOrgs = await prismic.getDocs("organizations")
  await prismicOrgs.results.forEach(item => {
    orgResults.push(item.data)
  })
 
  getUpdatedPumps(orgResults)
}

// getPrismicOrgs()


const getUpdatedPumps = async (orgResults) => {
    // initially this function gets all available pump data from pumps.json in an instance
  //the DB has been rolled back and remigrated and is empty, else it gets any new pump data
  // and updates the Welldone DB
  const orgCheck = async () => {
    getOrgs()
    .then(res => {
      if (res.length === 0) {
        // console.log(res.length, "this is the orgs length on 248")
        orgResults ? orgResults.forEach((org, idx) => {
          // console.log(orgResults, "this is the org results")
          const { organizations, headquarter_city} = org
                         
          const organization = {
            org_name: organizations,
            headquarter_city: headquarter_city
          }
          return db("organizations").insert(organization, "id")
          .then(() => {
            pumpsTable()
              .then(res => {
                if (res.length === 0) {
                  Data.pumps.forEach((data, idx) => {
                    // find org id by name, return id, add id to pump under org_id
                    const orgName = data.organizations.organizations
                    getOrgIdByName(orgName)
                      .then(res => {
                        const pump = {
                          org_id: res.id,
                          sensor_pid: data.id,
                          latitude: data.latitude,
                          longitude: data.longitude,
                          country_name: data.village.village,
                          commune_name: data.village.commune,
                          district_name: data.village.district,
                          province_name: data.village.province
                        }
                      
                        addPump(pump)
                        
                      })
                    })
                  }
                })
              })
            }) : {}
          } else {
            newOrgAndPumpUpdate(orgResults)
          }
        })
      }
      orgCheck()
    }
 

const newOrgAndPumpUpdate = (orgResults) => {
  const orgCheck = () => {
    getOrgs()
    .then(res => {
      // console.log(res.length, "this is the result length line 300")
      //check for new organizations in prismic and add into Welldone DB
     const currentOrgs = res.map(item => item.org_name)
    //  console.log(currentOrgs, "these are current orgs line 304")
     // these are the incoming organizations from prismic
     const incomingOrgs = orgResults.map(item => item.organizations)
    //  console.log(incomingOrgs, "these are the incoming Orgs line 307")
     let filteredOrgs = incomingOrgs.filter(item => !currentOrgs.includes(item))
    //  console.log(filteredOrgs, "these are the filtered orgs line 309")
      if (filteredOrgs.length !== 0) {
       filteredOrgs.forEach(org => {
        const { organizations, headquarter_city} = org                 
          const organization = {
            org_name: organizations,
            headquarter_city: headquarter_city
          }
          return db("organizations").insert(organization, "id")
          // })
          .then(() => {
            pumpsTable()
              .then(res => {
                console.log("this is 311")
                // after performing a npm run fetch, there could be new pumps - 
                //check to see if there are any new pumps coming from primic cached in pumps.json
                  const currentPumps = res.map(item => item.sensor_pid)
                  const incomingPumps = Data.pumps.map(item => Number(item.id))
                  let filtered = incomingPumps.filter(item => !currentPumps.includes(item))
                  const newPumps = Data.pumps.filter(item => filtered.includes(Number(item.id)))
                 //add any new pumps
                if (newPumps.length !== 0) {
                  newPumps.forEach((data, idx) => {
                   
                    const orgName = data.organizations.organizations
                    getOrgIdByName(orgName)
                      .then(res => {
                        const pump = {
                          org_id: res.id,
                          sensor_pid: data.id,
                          latitude: data.latitude,
                          longitude: data.longitude,
                          country_name: data.village.village,
                          commune_name: data.village.commune,
                          district_name: data.village.district,
                          province_name: data.village.province
                        }
                        addPump(pump)
                      })
                    })
                    } else {
                      console.log("no new pumps")
                    }
                  })
                }) 
              })
          } else {
            // prismic returned no new organizations, check to see if there are any new pumps
            //returned from prismic cached in pumps.json after recent npm run fetch
            pumpsTable()
            .then(res => {
              // console.log("this is 348")
                const currentPumps = res.map(item => item.sensor_pid)
                // console.log(currentPumps, "these are the current pumps line 358")
                const incomingPumps = Data.pumps.map(item => Number(item.id))
                // console.log(incomingPumps, "these are the incoming Pumps line 360")
                let filtered = incomingPumps.filter(item => !currentPumps.includes(item))
                // console.log(filtered, "this is the filtered results line 362")
                const newPumps = Data.pumps.filter(item => filtered.includes(Number(item.id)))
                // console.log(newPumps, "these are the new pumps")
              if (newPumps.length !== 0) {
                newPumps.forEach((data, idx) => {
                  const orgName = data.organizations.organizations
                  getOrgIdByName(orgName)
                    .then(res => {
                      const pump = {
                        org_id: res.id,
                        sensor_pid: data.id,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        country_name: data.village.village,
                        commune_name: data.village.commune,
                        district_name: data.village.district,
                        province_name: data.village.province
                      }
                      addPump(pump)
                    })
                  })
          } else {
            console.log("no new pumps and no new orgs")
          }
        })
      }
  })
 }
 orgCheck()
}

async function dataUpdate () {
  //gets all the physical sensor id's currently in the Welldone DB, makes a request to the momo URL
  //for the status of each pump/sensor and stores that data in a results array that is then iterated over
  //and the new data is added into the Welldone DB, requests made daily
  // by the Heroku Scheduler Dyno
  const getTable = async () => {
    try {
    const sensors = await sensorsTable ()
   
    let results = []
     await asyncForEach((sensors), async (sensor, index) => {
      try {
        console.log(`${index + 1}/${sensor.physical_id}`)
        const resMomo = await axios.get(`${url}${sensor.physical_id}`)
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
     
    fetch = { lastFetch: moment().unix(), sensor: results }
    setLastFetchTable(fetch)
    } catch (err) {console.log(err.message)}
  }
 getTable()
 }

 const setLastFetchTable = (fetch) => {
  const fetchCheck = () => {
    getLastFetchTable()
    .then(res => {
      if (res.length === 0) {
        addLastFetch(fetch.lastFetch)
        fetch.sensor.forEach((data, idx) => {
          if (data.statuses) {
            let history = {
              sensor_id: data.id,
              count: data.statuses.statuses ? data.statuses.statuses.count : null,
              total: data.statuses.statuses ? data.statuses.statuses.total : null,
              status: data.statuses.statuses ? data.statuses.statuses.status : null,
              date: data.statuses.statuses ? data.statuses.statuses.date : null,
              reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : null
            }  
            getStatuses(history)
        } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}
      })
     

      } else {
        getHistoryUpdates(fetch)
      }
    })
 }
 fetchCheck()
}

 const getHistoryUpdates = (fetch) => {
  const updateHistory = () => {
        getLastFetchTable()
          .then(res => {    
            if (fetch.lastFetch !== res[0].last) {
              addLastFetch(fetch.lastFetch)
              getLastFetchTable()
               .then(res => { 
                  const prevFetch = res[1].created_at.toString().split('').slice(0,10).join('')
                  const recentFetch = res[0].created_at.toString().split('').slice(0,10).join('')
                  const prevFetchLAST = res[1].last
                  const recentFetchLAST = res[0].last
                  console.log(res[1].created_at, "this is created_at result")
                  console.log(prevFetch, "this is prevFetch")
                  console.log(recentFetch, "this is recentFetch")
                  console.log(prevFetchLAST, "this is prevFetch")
                  console.log(recentFetchLAST, "this is recentFetch")
                  console.log(typeof prevFetch, "this is TYPEOF prevFetch")
                  console.log(typeof recentFetch, "this is TYPEOF recentFetch")
                  console.log(typeof prevFetchLAST, "this is TYPEOF prevFetch")
                  console.log(typeof recentFetchLAST, "this is TYPEOF recentFetch")
          //if prev fetch date is not the same day as the most recent fetch add the new history and pad/seconds
          if (prevFetch !== recentFetch) {
          fetch.sensor.forEach((data, idx) => {
          if (data.statuses) {
            let history = {
              sensor_id: data.id,
              count: data.statuses.statuses ? data.statuses.statuses.count : null,
              total: data.statuses.statuses ? data.statuses.statuses.total : null,
              status: data.statuses.statuses ? data.statuses.statuses.status : null,
              date: data.statuses.statuses ? data.statuses.statuses.date : null,
              reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : null
            }  
            getStatuses(history)
        } else {console.log(`error in sensor_id: ${data.id}, no statuses property`)}})
      } else {console.log("history is current")}
    })
   }
  })  
 }
 updateHistory()
}

function getStatuses (history){	  
  return db("history").insert(history, "id")
    .then(([id]) => {	         
          const cleanData = fetch.sensor.filter(item => item.id === history.sensor_id)
       
                const getPadCounts = () => {
                    let current = {
                      history_id: id,
                      pad_count_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[0] : null,
                      pad_count_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[1] : null,
                      pad_count_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[2] : null,
                      pad_count_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_counts[3] : null
                    }
                    
                    addPadCounts(current)
              
                    }	
                const getPadSeconds = () => {
                    let current = {
                      history_id: id,
                      pad_seconds_0: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[0] : null,
                      pad_seconds_1: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[1] : null,
                      pad_seconds_2: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[2] : null,
                      pad_seconds_3: cleanData[0].statuses.statuses ? cleanData[0].statuses.statuses.pad_seconds[3] : null
                    }
                
                    addPadSeconds(current)
          } 
          getPadSeconds()
          getPadCounts()
        }
      
  )
}

getUpdatedSensors()
getPrismicOrgs()
// module.exports = {getUpdated: function () {
//   getPrismicOrgs,
//   getUpdatedSensors
//   }
// }

