const knex = require("knex");
const config = require("../../knexfile");

const db = require("../../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findOrgsAndData,
  findByOrgName,
  updateOrg,
  remove,
  add
};

// get ALL orgs (for superUsers)

function find() {
  return db("organizations");
}
// all account info by org id
// all historical data by org id
// all sensors by org id
// all pumps by org id
// all sms by org id
function findOrgsAndData() {
  return db("organizations as o")
    .join("accounts as a", "a.id", "o.organization_id")
    .join("pumps as p", "o.id", "p.organization_id")
    .join("sensor as s", "o.id", "s.organization_id");
}

// get organization by org_name
// all account info by org id
// all historical data by org id
// all sensors by org id
// all pumps by org id
// all sms by org id

function findByOrgName(organization_name) {
  return db("organizations as o")
    .where({ organization_name })
    .join("accounts as a", "a.id", "o.organization_id")
    .join("pumps as p", "o.id", "p.organization_id")
    .join("sensor as s", "o.id", "s.organization_id");
}

// update organization
// name/city
// adding pumps
// adding sensors
async function updateOrg(id, changes) {
  try {
    changes
      ? await db("organizations")
          .where({ id })
          .update(changes)
      : null;
  } catch (err) {
    console.log(err.message);
  }
}

function findById(id) {
  return db("organizations")
    .where({ id })
    .first();
}

// create/post an organization
// name/city
async function add(organizations) {
  const [id] = await db("organizations")
    .insert(organizations)
    .returning("id");

  return findById(id);
}

//delete an organization by id
const remove = id =>
  db("organizations")
    .where({ id })
    .del();

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
