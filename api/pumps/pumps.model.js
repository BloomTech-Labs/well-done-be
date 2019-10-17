const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

module.exports = {
    addPump,
    getPumps,
    getOrgs,
    getAccounts,
    getAccountType,
    getPumpsAll,
    findPumpById,
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
            .join('accounts', 'accounts.id', 'organization.accounts_id')
            .join('account_types', 'account_types.id', 'accounts.account_types_id')
            .select('pumps.country_name', 'organization.organization_name', 'accounts.id', 'account_types.id')

}

function getOrgs() {
    return db('organization')
}

function getAccounts(){
    return db('accounts')
}

function getAccountType(){
    return db('account_types')
}

function getPumpsAll(){
    const pumpQuery = getPumps();
    const orgQuery = getOrgs();
    const accQuery = getAccounts();
    const accTypeQuery = getAccountType()

    return Promise.all([pumpQuery, orgQuery, accQuery, accTypeQuery])
            .then(
                ([pump, organization, account, accountType]) => {
                    pump.pump = pump;
                    pump.organization = organization;
                    organization.account = account;
                    account.accountType = accountType
                }
            )
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

function findPumpById() {

}

function getPumpById() {

}

function deletePump() {

}

function updatePump() {

}
