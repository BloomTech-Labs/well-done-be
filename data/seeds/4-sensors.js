exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sensors")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sensors").insert([
        {
          physical_id: 7418,
          kind: null,
          type: null,
          cellular: null,
          bluetooth: null,
          training: null,
          remark: null,
          data_finished: "2019-11-02",
          depth: 23,
          yield: 1.1,
          static: 2.1,
          quality: null
        },
        {
          physical_id: 7464,
          kind: null,
          type: null,
          cellular: null,
          bluetooth: null,
          training: null,
          remark: null,
          data_finished: "2019-11-08",
          depth: 44,
          yield: 2,
          static: 12,
          quality: null
        },
        {
          physical_id: 7615,
          kind: null,
          type: null,
          cellular: null,
          bluetooth: null,
          training: null,
          remark: null,
          data_finished: "2019-11-04",
          depth: 23,
          yield: null,
          static: 3,
          quality: null
        }
      ]);
    });
};
