const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

module.exports = {
    // addOrg,
    // getOrgs,
    // addAccount,
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
            .join('organization', 'organization.id', 'pumps.organization_id')
            .join('accounts', 'pumps.organization_id', 'accounts.organization_id')
            .select('pumps.id','pumps.country_name','pumps.province_name', 'pumps.commune_name','pumps.district_name', 'pumps.latitude', 'pumps.longitude', 
                    'organization.id as organization_id', 'organization.organization_name', 'organization.headquarter_city', 
                    'accounts.id as accounts_id', 'accounts.first_name', 'accounts.last_name', 'accounts.email_address', 'accounts.mobile_number')

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
        .delete()
}

function updatePump(id, change) {
    return db('pumps')
        .where({id})
        .update(change)
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


