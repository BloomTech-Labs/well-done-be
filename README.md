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

# Prismic

Pumps, Sensors and Organizations are aggregated from the Prismic API into pumps.json via "node run fetch" or "node services/jsonCache.js", mapData.js functions check the new data for new pumps and organizations adding them into the Welldone database.


# Heroku scheduler 

Runs dynos every hour that:
    - fetchs all pumps/sensors/organizations into pumps.json
    - compares against pumps.json and updates any new sensors/pumps/organizations
    - gets most current histories/statuses and updates if a new date

Dynos: 
$ node index.js
$ node services/jsonCache.js


#Notes

longStore.json - is from previous iteration of Welldone and is not in active use in this current DB

#TODO

Move superuser dashboard out of primic and create a new built in admin dashboard in the Welldone frontend app. This would entail:
-  persisting the current postres database deployed on Heroku 
- removing the calls to the prismic api in this backend - and instead 
- pumps, organizations etc static detail would be manually entered in the frontend superuser dashboard which would then update the tables in the backend. 

# JEST 

Note - tests must be run in order:

SCRIPTS
"setup": "cross-env DB_ENV=test jest setup.test.js --watch",
"integration": "cross-env DB_ENV=test jest '(/*.*\\.spec)\\.js$' --runInBand --watch",

$npm run setup
$npm run integration

