    "build": "sloth .1 \"node services/jsonCache.js && node index.js\" true true"



/   function addStatus (history){
//     const {sensor_id} = history
//     addStatusTest({sensor_id})
//       .then(res => {
//         console.log(res.id, "this is res line 271")
//         let id = res.id
//         padCountById(id)
//         .then(res => {
//           console.log(res, "this is res line 275")
//           console.log(typeof res, "this is typeof res")
//           if(typeof res === undefined) {
//             const getPadCounts = Data.pumps.forEach((data, idx) => {
//                       if (data.statuses) {
//                       const insertPadCounts = data.statuses.statuses.pad_counts.map(item => {
//                         let counts = {
//                         history_id: id,
//                         counts: item
//                         }
//                         console.log(counts)
//                         addPadCounts(counts, console.log("help"))
//                       })
//                     } else {console.log("statuses is empty (line 182)")}})
          
//     }
//   })
//  })
// }

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

  // function addStatus (history){
//   const {sensor_id} = history
//   addStatusTest({sensor_id})
//     .then(res => {
//       const getPadCounts = Data.pumps.forEach((data, idx) => {
//         if (data.statuses) {
//         const insertPadCounts = data.statuses.statuses.pad_counts.map(item => {
//           let counts = {
//           history_id: res.id,
//           counts: item
//           }
//           console.log(counts)
//           addPadCounts(counts, console.log("help"))
//         })
//       } else {console.log("statuses is empty (line 182)")}})
//       const getPadSeconds = Data.pumps.forEach((data, idx) => {
//         if (data.statuses) {
//         const insertPadSeconds = data.statuses.statuses.pad_seconds.map(item => {
//           let seconds = {
//           history_id: res.id,
//           seconds: item
//           }
//           console.log(seconds)
//           addPadSeconds(seconds, console.log("help"))
//         })
//       } else {console.log("statuses is empty (line 193)")}})
//     })
//   }

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
  function addStatus (history){	  
  const id = history.sensor_id	  
  db.transaction(function(trx) {	   
  return db("history").transacting(trx).where({id})	
    .then(([id]) => {	
      const getPadCounts = Data.pumps.map(data => {	
        let current = {	
          history_id: id,	
          ...data.statuses.statuses.pad_counts
        }	
        
      })	

      const getPadSeconds = Data.pumps.map(data => {	
        let current = {	
          history_id: id,	
          ...data.statuses.statuses.pad_seconds
        }	
       
      });	

      const insert_counts = db.insert(getPadCounts).into("pad_counts");	
      const insert_seconds = db.insert(getPadSeconds).into("pad_seconds");	

      const promises = [insert_counts, insert_seconds]	

      return Promise.all(promises).then(results => {	
        const {counts, seconds} = results;	
        return id;	
      })	


    })	
      .then(trx.commit)	
      .catch(trx.rollback);	


  })	  
  .then(function(inserts) {	
    console.log(inserts.length + ' statuses');	
  })	
  .catch(function(error) {	
    // If we get here, that means that neither the 'Old Books' catalogues insert,	
    // nor any of the books inserts will have taken place.	
    console.error(error);	
  });	
}


    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false // <- default is true, set to false
    }

function addStatus() {
  console.log("line 234")

  db.transaction(function(trx) {
    let getHistory = () => {
      Data.pumps.forEach((data, idx) => {
        console.log("line 234")
      if (data.statuses) {
        let history = {
         sensor_id: data.id,
         count: data.statuses.statuses ? data.statuses.statuses.count : 0,
         total: data.statuses.statuses ? data.statuses.statuses.total : 0,
         status: data.statuses.statuses ? data.statuses.statuses.status : 0,
         date: data.statuses.statuses ? data.statuses.statuses.date : "",
         reported_percent: data.statuses.statuses ? data.statuses.statuses.reported_percent : 0
        }
        console.log(history, "this is the history")

      }})
    }
    console.log("this is line 250")
    const insert_counts = db.insert(getHistory).into("history");	
    const promises = [insert_counts]	
      console.log("********line 205")
    return Promise.all(promises).then(results => {	
      console.log("this is line 254")
      const {counts} = results;	
      return id;	
    })	


   	
    .then(trx.commit)	
    .catch(trx.rollback);	

  })
	  
.then(function(inserts) {	
  console.log(inserts.length + ' statuses');	
})	
.catch(function(error) {	
  // If we get here, that means that neither the 'Old Books' catalogues insert,	
  // nor any of the books inserts will have taken place.	
  console.error(error);	
})
}	

addStatus()

// function addStatus (status){
  //   db.transaction(function(trx) {
  //     db.insert(status, "id").then(([id]) => {
  //       const padCounts = status.padCounts.map(p => {
  //         return {
  //           statuses_id: id,
  //           ...p
  //         }
  //       });
  //       const padSeconds = status.padSeconds.map(s => {
  //         return {
  //           statuses_id: id,
  //           ...s
  //         }
  //       });
  //       const insertCounts = knex.insert(padCounts).into("padCounts");
  //       const insertSeconds = knex.insert(padSeconds).into("padSeconds");
  //       const promises = [insertCounts, insertSeconds]
  
  //       return Promise.all(promises).then(results => {
  //         const {counts, seconds} = results;
  //         return id;
  //       })
  
  //     })
  //       .then(trx.commit)
  //       .catch(trx.rollback);
  
  //   })
  //   .then(function(inserts) {
  //     console.log(inserts.length + ' statuses');
  //   })
  //   .catch(function(error) {
  //     // If we get here, that means that neither the 'Old Books' catalogues insert,
  //     // nor any of the books inserts will have taken place.
  //     console.error(error);
  //   });
  // }



// function addStatus (history){	  
//   // const id = history.sensor_id	  
//   db.transaction(function(trx) {	   
//   return db("history").insert(history, "id")
//     .then(([id]) => {	
//       console.log("********line 180", id)
//       const getPadCounts = Data.pumps.forEach((data, idx) => {
//         if (data.sensor_id === history.sensor_id) {
        
//                 const getPadCounts = data.statuses.statuses.pad_counts.map(item => {
//                   let current = {
//                   history_id: id,
//                   counts: item
//                   }
//                   console.log(current, "this is current")
//                   addPadCounts(current, console.log("help"))
//                 })	
//               }})
      // const getPadSeconds = Data.pumps.map(data => {	
      //   console.log("********line 192", data.statuses.statuses.pad_seconds)

      //   let current = {	
      //     history_id: id,	
      //     seconds: data.statuses.statuses.pad_seconds
      //   }	
      //  console.log(current, "current seconds line 198")
      // });	

//       const insert_counts = db.insert(getPadCounts).into("pad_counts");	
//       // const insert_seconds = db.insert(getPadSeconds).into("pad_seconds");	
//       console.log(insert_counts, "this is insert counts")
//       const promises = [insert_counts]	
//       console.log("********line 205")
//             console.log(promises, "this is promises")
//       return Promise.all(promises).then(results => {	
//         console.log("this is line 248")
//         const {counts} = results;	
//         return id;	
//       })	


//     })	
//       .then(trx.commit)	
//       .catch(trx.rollback);	


//   })	  
//   .then(function(inserts) {	
//     console.log(inserts.length + ' statuses');	
//   })	
//   .catch(function(error) {	
//     // If we get here, that means that neither the 'Old Books' catalogues insert,	
//     // nor any of the books inserts will have taken place.	
//     console.error(error);	
//   });	
// }