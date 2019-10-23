exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sensors")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sensors").insert([
        {
          pump_id: 1,
          physical_id: 12345,
          kind: "A",
          type: "B",
          cellular: 2,
          bluetooth: 1,
          training: "need more training",
          remark: "cool model",
          data_finished: "2019-11-02",
          depth: 223,
          yield: 22,
          static: 11,
          quality: "good"
        },
        {
          pump_id: 2,
          physical_id: 45678,
          kind: "C",
          type: "D",
          cellular: 2,
          bluetooth: 1,
          training: "need more training, seriously",
          remark: "ok model",
          data_finished: "2019-11-03",
          depth: 2234,
          yield: 223,
          static: 112,
          quality: "premium"
        },
        {
          pump_id: 3,
          physical_id: 1234578,
          kind: "E",
          type: "F",
          cellular: 2,
          bluetooth: 1,
          training: "no need training",
          remark: "perfect model",
          data_finished: "2019-11-04",
          depth: 22344,
          yield: 2244,
          static: 1122,
          quality: "first class"
        }
      ]);
    });
};
