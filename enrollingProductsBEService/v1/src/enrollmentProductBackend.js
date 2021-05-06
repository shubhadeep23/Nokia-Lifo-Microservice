const dbQuery = require('../db/db-query')
const constant = require('../constants/constant')
const fileOwner = "enrollmentProductBackend";
const { createLogs } = require('../logger/loggerMethod')
const { toValidateMandetoryField } = require('./validators');
const { toCreateInsertionBody, createErrorJSON } = require('./enrollmentParser');

const postProductInfo = async (req, res) => {
     // #swagger.tags = ['LIFO Microservice']
     // #swagger.description = 'Endpoint para obter um usuário.'
     /* #swagger.parameters['body'] = {
               in: 'body',
               description: 'Informações do usuário.',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/response" }
        } */
    try {
        await createLogs(req, res, postProductInfo.name, fileOwner, 'Begins', '');
        const validatedMandetoryFields = await toValidateMandetoryField(req.body);
        if (validatedMandetoryFields > '') {
            throw (validatedMandetoryFields)
        }
        else {
            const createFinalBody = await toCreateInsertionBody(req.body);
            const createdNewProducts = await dbQuery.insertNewProducts(createFinalBody);
            if (createdNewProducts.affectedRows > 0) {
                createLogs(req, res, postProductInfo.name, fileOwner, 'Success', createdNewProducts);
                createLogs(req, res, postProductInfo.name, fileOwner, 'Exits', '');
                res.status(201).json({ 'statusCode': 201, 'successMessage': `Successfully New Enrollment is created with insertid- ${createdNewProducts.insertId}` });
            } else {
                createLogs('', '', postProductInfo.name, fileOwner, 'Error', updatedRuleConfigData);
                createLogs('', '', postProductInfo.name, fileOwner, 'Exits', '');
                return createSuccessJSON(422, `Insertion Failed`);
            }
        }
    }
    catch (error) {
        createLogs(req, res, postProductInfo.name, fileOwner, 'Error', error);
        res.status(400).send(error);
    }
}

const getProductInfo = async (req, res) => {
    // #swagger.tags = ['LIFO Microservice']
     // #swagger.description = 'Endpoint para obter um usuário.'
    try {
        await createLogs(req, res, getProductInfo.name, fileOwner, 'Begins', '');
        let productList = await dbQuery.getProductList();
        if (productList[0] == ''||productList[0] == undefined) {
            res.status(422).send(createErrorJSON(422, `No Product Present`));
        } else {
            delete productList[0].meta;
            createLogs(req, res, getProductInfo.name, fileOwner, 'Success', productList);
            createLogs(req, res, getProductInfo.name, fileOwner, 'Exits', '');
            /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/response" },
               description: 'Usuário encontrado.' 
        } */
            res.status(200).json(productList);
        }
    }
    catch (error) {
        createLogs(req, res, getProductInfo.name, fileOwner, 'Error', error);
        res.status(400).send(error);
    }
}

const deleteProductInfo = async (req, res) => {
     // #swagger.tags = ['LIFO Microservice']
      // #swagger.description = 'Endpoint para obter um usuário.'
    try {
        await createLogs(req, res, deleteProductInfo.name, fileOwner, 'Begins', '');
        let deletedProductInfo = await dbQuery.deleteOldestProduct();
        if (deletedProductInfo.affectedRows > 0) {
            createLogs(req, res, deleteProductInfo.name, fileOwner, 'Success', deletedProductInfo);
            createLogs(req, res, deleteProductInfo.name, fileOwner, 'Exits', '');
            res.status(200).json({ 'statusCode': 200, 'successMessage': `Successfully deleted newest record` });
        } else {
            createLogs('', '', deleteProductInfo.name, fileOwner, 'Error', deletedProductInfo);
            createLogs('', '', deleteProductInfo.name, fileOwner, 'Exits', '');
            res.status(422).json(createErrorJSON(422, `Deletion Failed`));
        }
    }
    catch (error) {
        createLogs(req, res, deleteProductInfo.name, fileOwner, 'Error', error);
        res.status(400).send(error);
    }
}

module.exports.postProductInfo = postProductInfo;
module.exports.getProductInfo = getProductInfo;
module.exports.deleteProductInfo = deleteProductInfo;