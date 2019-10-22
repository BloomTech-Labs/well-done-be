const knex = require("knex");
const config = require("../../knexfile");

const db = require("../../data/dbConfig.js");

// get ALL orgs (for superUsers)
function findAll() {
  return db("organizations");
}
// all account info by org id
// all historical data by org id
// all sensors by org id
// all pumps by org id
// all sms by org id
function findAllAndData() {
  return db("organizations as o")
    .join("accounts as a", "a.id", "o.org_id")
    .join("pumps as p", "o.id", "p.org_id")
    .join("sensors as s", "o.id", "s.org_id");
}

// get organization by org_name
// all account info by org id
// all historical data by org id
// all sensors by org id
// all pumps by org id
// all sms by org id

function findByOrgName(org_name) {
  return db("organizations as o")
    .where({ org_name })
    .join("accounts as a", "a.id", "o.org_id")
    .join("pumps as p", "o.id", "p.org_id")
    .join("sensors as s", "o.id", "s.org_id");
}

// update organization
// name/city
// adding pumps
// adding sensors
// const update = async (id, changes) => {
//   try {
//     changes
//       ? await db("organizations")
//           .where({ id })
//           .first()
//           .update(changes)
//       : null;
//   } catch (err) {
//     console.log(err.message);
//   }
// }


function update(id, change){
  return db('organizations')
          .where({id})
          .update(change)
}

// const update = async (id, changes) => {
//   try {
//     changes
//       ? await db("accounts")
//           .where({ id })
//           .first()
//           .update(changes)
//       : null;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

function findById(id) {
  return db("organizations")
    .where({ id })
    .first();
}

// create/post an organization
// name/city


async function insert (user) {
  const [id] = await db("organizations").insert(user).returning('id');

  return findById(id);
}
//delete an organization by id
const remove = id => {
  return db("organizations")
    .where({ id })
    .del();
};
// function getUserAndStory(id) {
//     const userQuery = getUser(id);
//     const storiesQuery = getUserStories(id);
//     return Promise.all([userQuery, storiesQuery]).then(
//       ([user, stories]) => {
//         console.log(stories, 'stories')
//         user.stories = stories;
//         return user;
//       }
//     );
//   }

module.exports = {
  findAll,
  findById,
  findAllAndData,
  findByOrgName,
  update,
  remove,
  insert
};
