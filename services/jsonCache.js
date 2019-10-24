const fs = require("fs")
const axios = require("axios")
const prismic = require("./prismicData")
const moment = require("moment")

async function cacheResource(resourceName, resourceLoader) {
  const resource = await resourceLoader()
  const json = JSON.stringify(resource)
  const path = __dirname + "/../assets/cache/" + resourceName + ".json"
  return new Promise((resolve, reject) => {
    fs.writeFile(path, json, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

async function main() {
  try {
    console.log("Fetching Init")
    await cacheResource("pumps", getPumps)
    await cacheResource("longStore", createStore)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const url =
  "https://dashboard.welldone.org/.netlify/functions/get_momo_status?id="
async function getPumps() {
  const { data: config } = await prismic.getDoc("config")
  const oldData = require("../assets/cache/pumps.json")
  if (
    !oldData.lastFetch ||
    oldData.lastFetch <
      moment()
        .subtract(config.update_data, "hours")
        .unix()
  ) {
    console.log("Fetching Pumps Init")
    let pumps = {}
    const prismicPumps = await prismic.getDocs("pump")
    await asyncForEach(prismicPumps.results, async pump => {
      let village = null
      if (pump.data && pump.data.village.id && !pump.data.village.isBroken) {
        village = await prismic.getVillage(pump.data.village.id)
      }
      if (pump.data && pump.data.latitude && pump.data.longitude) {
        pumps = {
          ...pumps,
          [pump.uid]: {
            ...pump.data,
            village,
          },
        }
      } else {
        console.log(`Missing data on pump #${pump.uid}`)
      }
    })

    let results = []
    await asyncForEach(Object.keys(pumps), async (pump, index) => {
      try {
        console.log(`${index + 1}/${Object.keys(pumps).length}`)
        const res = await axios.get(`${url}${pump}`)
        let newData = {}
        res.data
          ? res.data.dates.forEach((date, index) => {
              newData = {
                ...newData,
                [date]: {
                  count: res.data.statuses[index].count,
                  total: res.data.statuses[index].total,
                  status: res.data.statuses[index].status,
                },
              }
            })
          : {}
        results.push({
          id: pump,
          ...pumps[pump],
          status: res.data.status,
          statuses: newData,
        })
      } catch (err) {
        console.error(`Error on pump #${pump}`)
        results.push({ id: pump, ...pumps[pump], status: 0, error: "500" })
      }
    })
    console.log("Fetching Pumps Success")
    return { lastFetch: moment().unix(), pumps: results }
  } else {
    console.log("Data Up To Date")
    return oldData
  }
}

async function createStore() {
  const oldData = require("../assets/cache/longStore.json")
  const data = require("../assets/cache/pumps.json")
  let pumps = {}
  data.pumps.forEach(({ id, dates, statuses }, index) => {
    let pumpOldData = oldData.pumps ? oldData.pumps[id] : {}

    pumps = {
      ...pumps,
      [id]: {
        ...pumpOldData,
        ...data.pumps.find(pump => pump.id === id).statuses,
      },
    }
  })

  return { pumps }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

main()
