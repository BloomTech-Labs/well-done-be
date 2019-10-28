const Prismic = require("prismic-javascript")

const API_ENDPOINT = `https://welldone-content.cdn.prismic.io/api/v2`


async function getPrismicApi() {
  const api = await Prismic.api(API_ENDPOINT)
  return { api } //ref
}

module.exports = {
  API_ENDPOINT,
  getPrismicApi,
}
