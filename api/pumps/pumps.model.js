const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

function insert(pump) {
  return db("pumps")
    .insert(pump)
    .then(ids => ({ id: ids[0] }));
}

// function insert(pump) {
//   return db("pumps")
//     .insert(pump)
//     .returning("id");
// }

function find() {
  return db("pumps");
}

// function find() {
//   try {
//     return db("pumps as p").join("organizations as o", "o.id", "p.org_id");
//     // .join("accounts as a", "o.id", "a.org_id");
//     // .select("p.country_name");
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// {
//     "org_name"= "2LAVON ORG",
//     "headquarter_city" = "2Paris"
//   }

// function getCountry(id) {
//   return db("users as u")
//     .select("c.country_name")
//     .join("stories as s", "u.id", "s.user_id")
//     .join("countries as c", "s.country_id", "c.id")
//     .where({ user_id: id });
// }

// function find() {
//   return db("pumps")
//     .join("organizations", "org.id", "pumps.org_id")
//     .join("accounts", "pumps.org_id", "accounts.org_id")
//     .select(
//       "pumps.id",
//       "pumps.country_name",
//       "pumps.province_name",
//       "pumps.commune_name",
//       "pumps.district_name",
//       "pumps.latitude",
//       "pumps.longitude",
//       "organizations.id",
//       "organizations.organization_name",
//       "organizations.headquarter_city",
//       "accounts.id",
//       "accounts.first_name",
//       "accounts.last_name",
//       "accounts.email_address",
//       "accounts.mobile_number"
//     );
// }

function findById(id) {
  return db("pumps")
    .where({ id })
    .then(pumps => pumps[0]);
  // .first
}

function remove(id) {
  return db("pumps")
    .where({ id })
    .delete();
}

function update(id, change) {
  return db("pumps")
    .where({ id })
    .update(change);
}

// function addOrg(org) {
//     return db('organization')
//             .insert(org)
//             .then(ids => ({id: ids[0]}))

// }

// function addAccount(acc) {
//     return db('accounts')
//             .insert(acc)
//             .then(ids => ({id: ids[0]}))
// }

// function getUserAndStory(id) {
//     const userQuery = getUser(id);
//     const storiesQuery = getUserStories(id);
//     const country = getCountry(id);
//     return Promise.all([userQuery, storiesQuery, country]).then(
//       ([user, stories, country]) => {
//         user.stories = stories;
//         user.country = country;
//         return user;
//       }
//     );
//   }

module.exports = {
  // addOrg,
  // getOrgs,
  // addAccount,
  // getAccounts,
  // getOrgs,
  // getPumpsAll,
  insert,
  find,
  findById,
  remove,
  update
};
