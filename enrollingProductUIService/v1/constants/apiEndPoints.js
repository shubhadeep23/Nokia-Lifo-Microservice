/**
 * Constants file with API endpoints
 */
const apiDomain = 'http://' + process.env.SERVERIP + ':' + process.env.ENROLLMENT_BE_PORT;
const apiBase = apiDomain + '/enrollment/v1/';
const apiEndpoints = {
    apiDomain,
    apiBase,
    //URI for List GET
    lifoApiList: {
        restAPI: apiBase + 'products',
    }
}

module.exports = apiEndpoints