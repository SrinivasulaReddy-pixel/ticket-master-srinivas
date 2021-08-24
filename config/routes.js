const express = require('express')
const router = express.Router()

const usersController = require('../app/controller/usersController')
const authenticateUser = require('../app/middlewares/authentication')
const customersController = require('../app/controller/customersController')
const departmentsController = require('../app/controller/departmentsController')
const employeesController = require('../app/controller/employeesController')
const ticketsController = require('../app/controller/ticketsController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.post('/customers', authenticateUser, customersController.create) 
router.get('/customers', authenticateUser, customersController.list)
router.get('/customers/:id', authenticateUser, customersController.show)
router.put('/customers/:id', authenticateUser, customersController.edit);
router.delete('/customers/:id', authenticateUser, customersController.remove);

router.post('/departments', authenticateUser, departmentsController.create)
router.get('/departments', authenticateUser, departmentsController.list);
router.get('/departments/:id', authenticateUser, departmentsController.show);
router.put('/departments/:id', authenticateUser, departmentsController.edit);
router.delete('/departments/:id', authenticateUser, departmentsController.remove);

router.post('/employees', authenticateUser, employeesController.create)
router.get('/employees', authenticateUser, employeesController.list);
router.get('/employees/:id', authenticateUser, employeesController.show);
router.put('/employees/:id', authenticateUser, employeesController.edit);
router.delete('/employees/:id', authenticateUser, employeesController.remove);

router.get('/tickets', authenticateUser, ticketsController.list);
router.post('/tickets', authenticateUser, ticketsController.create);
router.get('/tickets/:id', authenticateUser, ticketsController.show);
router.put('/tickets/:id', authenticateUser, ticketsController.update);
router.delete('/tickets/:id', authenticateUser, ticketsController.destroy);

// router.post('/tickets', authenticateUser, ticketsController.create)
// router.get('/tickets', authenticateUser, ticketsController.list)
// router.get('/tickets/:id', authenticateUser, ticketsController.show)
// router.put('/tickets/:id', authenticateUser, ticketsController.edit)
// router.delete('/tickets/:id', authenticateUser, ticketsController.remove)

module.exports = router