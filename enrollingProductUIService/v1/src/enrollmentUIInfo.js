const constant = require("../constants/constant")
const apiEndpoints = require("../constants/apiEndPoints");
const request = require('request');
const { createErrorJSON } = require("./enrollmentUIParser");
const serviceTimeout = process.env.SERVICE_TIMEOUT;
const { createLogs } = require('../logger/loggerMethod')
const fileOwner = "enrollmentUIInfo.js"

/**
 * Replace the `args.target` with `args.with` in string `value`
 * ### Example: 
 * * `replaceStringUtil('Hello, [[name]]!!', [{target: '[[name]]', with: 'Alice'}])`, returns `Hello, Alice!!`
 *
 * @param {string} value
 * @param { { target: string, with: string|number }[] } args
 * @returns
 */
const replaceStringUtil = (value, args) => {
  let localVal = value || '';
  if (localVal && args && Array.isArray(args) && args.length) {
    args.forEach(arg => {
      if (arg.target && (typeof arg.with === constant.STRING || typeof arg.with === constant.NUMBER)) {
        localVal = localVal.replace(arg.target, '' + arg.with);
      }
    });
  }
  return localVal;
}

//Function to call external API POST
const callSystemApiUsingRequest = async (uri, body, res, callback) => {
  await request({ method: constant.POST, uri: uri, json: body, headers: { "x-trace-id": res.get(`x-trace-id`) } }, (error, response) => {
    if (error) {
      return callback(error)
    }
    return callback(undefined, response)
  });
}
//Function to Call External API GET
const callSystemApiUsingRequestGET = async (options, callback) => {
  await request(options, (error, response) => {
    if (error) {
      return callback(error)
    }
    return callback(undefined, response)
  });
}

//Function to call external API DELETE
const callSystemApiUsingRequestDELETE = async (uri, body, res, callback) => {
  await request({ method: constant.DELETE, uri: uri, json: body, headers: { "x-trace-id": res.get(`x-trace-id`) } }, (error, response) => {
    if (error) {
      return callback(error)
    }
    return callback(undefined, response)
  });
}


//Get API for product list.
const getProductInfo = async (req, res) => {
  try {
    await createLogs(req, res, getProductInfo.name, fileOwner, 'Begins', '');
    //URL creation for API's
    let url = replaceStringUtil(
      `${apiEndpoints.lifoApiList.restAPI}`
      
    );
    var options = { url: url, method: "GET", json: true, timeout: Number(serviceTimeout), headers: { "x-trace-id": res.get(`x-trace-id`) } };

    await callSystemApiUsingRequestGET(options, (listInfoError, listInfoResponse) => {
      if (listInfoError) {
        createLogs(req, res, getProductInfo.name, fileOwner, 'Error', listInfoError);
        res.status(500).send(createErrorJSON(500, listInfoError.toString()));
      } else if (!listInfoResponse.statusCode.toString().startsWith("2")) {
        createLogs(req, res, getProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
        res.status(listInfoResponse.statusCode).send( listInfoResponse.body);
      } else {
        createLogs(req, res, getProductInfo.name, fileOwner, 'Success', listInfoResponse.body);
        createLogs(req, res, getProductInfo.name, fileOwner, 'Exits', '');
        res.status(200).send(listInfoResponse.body)
      }
    })

  } catch (error) {
    createLogs(req, res, getProductInfo.name, fileOwner, 'Error', error.toString());
    res.status(400).send(createErrorJSON(400, error.toString()));
  }

}

//POST API for Products Entry.
const postProductInfo = async (req, res) => {
  try {
    await createLogs(req, res, postProductInfo.name, fileOwner, 'Begins', '');

   let url = replaceStringUtil(
      `${apiEndpoints.lifoApiList.restAPI}`
      
    );
    await callSystemApiUsingRequest(url, req.body, res, (listInfoError, listInfoResponse) => {
      if (listInfoError) {
        createLogs(req, res, postProductInfo.name, fileOwner, 'Error', listInfoError);
        res.status(500).send(createErrorJSON(500, listInfoError.toString()));
      } else if (!listInfoResponse.statusCode.toString().startsWith("2")) {
        if (typeof listInfoResponse.body === 'object') {
          if ('errors' in listInfoResponse.body) {
            createLogs(req, res, postProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
            res.status(400).send(listInfoResponse.body)
          }
        } else {
          createLogs(req, res, postProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
          res.status(listInfoResponse.statusCode).send(createErrorJSON(listInfoResponse.statusCode, listInfoResponse.body.toString()));
        }
      } else {
        createLogs(req, res, postProductInfo.name, fileOwner, 'Success', listInfoResponse.body);
        createLogs(req, res, postProductInfo.name, fileOwner, 'Exits', '');
        res.status(listInfoResponse.statusCode).send(listInfoResponse.body);
      }
    })
  }
  catch (error) {
    createLogs(req, res, postProductInfo.name, fileOwner, 'Error', error.toString());
    res.status(400).send(createErrorJSON(400, error.toString()));
  }
}

//DELETE API for Newest Products Deletion.
const deleteProductInfo = async (req, res) => {
  try {
    await createLogs(req, res, deleteProductInfo.name, fileOwner, 'Begins', '');

   let url = replaceStringUtil(
      `${apiEndpoints.lifoApiList.restAPI}`
      
    );
    await callSystemApiUsingRequestDELETE(url, req.body, res, (listInfoError, listInfoResponse) => {
      if (listInfoError) {
        createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', listInfoError);
        res.status(500).send(createErrorJSON(500, listInfoError.toString()));
      } else if (!listInfoResponse.statusCode.toString().startsWith("2")) {
        if (typeof listInfoResponse.body === 'object') {
          if ('errors' in listInfoResponse.body) {
            createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
            res.status(400).send(listInfoResponse.body)
          }else{
            createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
            res.status(listInfoResponse.statusCode).send(listInfoResponse.body);
          }
        } else {
          createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', listInfoResponse.body.toString());
          res.status(listInfoResponse.statusCode).send(createErrorJSON(listInfoResponse.statusCode, listInfoResponse.body.toString()));
        }
      } else {
        createLogs(req, res, deleteProductInfo.name, fileOwner, 'Success', listInfoResponse.body);
        createLogs(req, res, deleteProductInfo.name, fileOwner, 'Exits', '');
        res.status(200).send(listInfoResponse.body);
      }
    })
  }
  catch (error) {
    createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', error.toString());
    res.status(400).send(createErrorJSON(400, error.toString()));
  }
}
module.exports.getProductInfo = getProductInfo;
module.exports.postProductInfo = postProductInfo;
module.exports.deleteProductInfo = deleteProductInfo;