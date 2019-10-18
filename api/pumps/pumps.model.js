const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

module.exports = {
    addOrg,
    addAccount,
    // getAccounts,
    // getOrgs,
    addPump,
    getPumps,
    // getPumpsAll,
    getPumpById,
    deletePump,
    updatePump
}


function addPump(pump) {
    return db('pumps')
            .insert(pump)
            .then(ids => ({id: ids[0]}))
}

function getPumps() {
    return db('pumps')
            .join('organizations', 'organizations.id', 'pumps.org_id')
            .join('accounts', 'pumps.org_id', 'accounts.org_id')
            .select('pumps.id','pumps.country_name','pumps.province_name', 'pumps.commune_name','pumps.district_name', 'pumps.latitude', 'pumps.longitude', 
                    'organizations.id as org_id', 'organizations.org_name', 'organizations.headquarter_city', 
                    'accounts.id as accounts_id', 'accounts.first_name', 'accounts.last_name', 'accounts.email_address', 'accounts.mobile_number', 'accounts.super_user', 'accounts.org_user', 'accounts.org_admin')

}

function getPumpById(id) {
    return db('pumps')
            .where({id})
            .then(pumps =>(pumps[0]))
            // .first
}


function deletePump(id) {
    return db('pumps')
        .where({id})
        .del()
}

function updatePump(id, change) {
    return db('pumps')
        .where({id})
        .update(change)
}

function addOrg(org) {
    return db('organizations')
            .insert(org)
            .then(ids => ({id: ids[0]}))

}

function addAccount(acc) {
    return db('accounts')
            .insert(acc)
            .then(ids => ({id: ids[0]}))
}


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


