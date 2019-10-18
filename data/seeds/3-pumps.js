exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('pumps').del().then(function () {
		// Inserts seed entries
		return knex('pumps').insert([
			{
				org_id: 1,
				country_name: '1st country',
				province_name: '1st province',
				district_name: '1st district',
				commune_name: '1st commune',
				latitude: 1.234,
				longitude: 2.345
			},
			{
				org_id: 2,
				country_name: '2nd country',
				province_name: '2nd province',
				district_name: '2nd district',
				commune_name: '2nd commune',
				latitude: 3.456,
				longitude: 4.578
			},
			{
				org_id: 3,
				country_name: '3rd country',
				province_name: '3rd province',
				district_name: '3rd district',
				commune_name: '3rd commune',
				latitude: 5.678,
				longitude: 6.789
			}
		]);
	});
};
