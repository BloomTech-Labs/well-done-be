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
          reported_percent: 12
        },
        {
          date: "2019-08-15",
          count: 2,
          total: 9456,
          status: 3,
          sensor_id: 2,
          reported_percent: 12
        },
        {
          date: "2019-10-19",
          count: 1,
          total: 45600,
          status: 2,
          sensor_id: 3,
          reported_percent: 12
        }
      ]);
    });
};
