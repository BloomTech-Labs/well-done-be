exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("history")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("history").insert([
        {
          date: "2019-05-07",
          count: 2,
          total: 789456,
          status: 3,
          sensor_id: 1,
          pad_seconds: 4000,
          pad_counts: 15,
          reported_percent: 12
        },
        {
          date: "2019-12-08",
          count: 2,
          total: 9456,
          status: 3,
          sensor_id: 2,
          pad_seconds: 3200,
          pad_counts: 15,
          reported_percent: 12
        },
        {
          date: "2019-12-10",
          count: 1,
          total: 45600,
          status: 2,
          sensor_id: 3,
          pad_seconds: 500,
          pad_counts: 15,
          reported_percent: 12
        }
      ]);
    });
};
