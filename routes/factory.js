const { Router } = require("express")
const factoryController = require("../controllers/factory.controller");
const factoryRouter = Router();
const { catchError } = require("../utils/catchError")
const jwtVerify = require("../auth/verify")

factoryRouter.route("/create")
    // .post(jwtVerify.verifyJWT, catchError(factoryController.createFactory))
    .post(jwtVerify.verifyJWT, catchError(factoryController.createFactory))

factoryRouter.route("/createPublic")
    // .post(jwtVerify.verifyJWT, catchError(factoryController.createFactory))
    .post(catchError(factoryController.createFactory))

factoryRouter.route("/getAll")
    .post(jwtVerify.verifyJWT, catchError(factoryController.getAllFactories))

factoryRouter.route("/getOne")
    .post(jwtVerify.verifyJWT, catchError(factoryController.getOneFactory))

factoryRouter.route("/getAllPublic")
    .post(catchError(factoryController.getAllFactories))

factoryRouter.route("/getOnePublic")
    .post(catchError(factoryController.getOneFactory))

factoryRouter.route("/update/:id")
    .patch(jwtVerify.verifyJWT, catchError(factoryController.updateFactory))

factoryRouter.route("/delete/:id")
    .delete(jwtVerify.verifyJWT, catchError(factoryController.deleteFactory))

factoryRouter.route("/pagination")
    .get(catchError(factoryController.getAllFactoriesWithPaginations))

factoryRouter.route("/dealerLatestQuotations")
    .get(catchError(factoryController.getAllFactoriesWithPaginationsLatestQuotations))

module.exports = factoryRouter