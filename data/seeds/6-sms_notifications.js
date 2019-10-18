const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sms_notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('sms_notifications').insert([
        // id 1
        {mobile_number: "111-111-1111", org_id: 1, status: 2},
        // id 2
        {mobile_number: "222-222-2222", org_id: 2, status: 0},
         // id 3
         {mobile_number: "333-333-3333", org_id: 3, status: 1},
      ]);
    });
};
