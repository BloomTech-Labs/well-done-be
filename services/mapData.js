const Pumps = require('../assets/cache/pumps.json')

const getPumps = Pumps.pumps.map(pump => console.log(pump))

module.exports = getPumps;