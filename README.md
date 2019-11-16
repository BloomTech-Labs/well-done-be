# backend

$ npm run fetch / node services/jsonCache.js
    - gets all pumps from prismic
    - caches pumps into pumps.json

$ npm run dev / npm run start / node index.js

    # getUpdatedPumps() & getUpdatedSensors()

    - imports pumps.json to mapData.js
    - compares current pumps and sensors in Welldone-db against prismic data
    - if new pumps/sensors in prismic data, those get added into welldone-db

    # dataUpdate()

    - gets current sensors table and adds all pysical_ids for those sensors into an array (sensors)
    - appends each physical_id to the momo URL, returning an array of most current histories (statuses) for each sensor
    - checks to confirm the returned histories are for a new date than the last fetch
    - adds new histories and pad_counts & pad_seconds into Welldone-db


# Heroku scheduler 

Runs dynos every hour that:
    - fetchs all pumps/sensors/organizations into pumps.json
    - compares against pumps.json and updates any new sensors/pumps/organizations
    - gets most current histories/statuses and updates if a new date

Dynos: 
$ node index.js
$ node services/jsonCache.js

# Prismic

# TODO

fix bug that enters multiple organizations of the same name
test mapData on heroku
add fetch scheduler
confirm heroku is able to update and utilize pumps.json


