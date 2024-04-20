const express = require('express');
const {
    createUser,
    getUsers,
    getUserById,
} = require('../../../controllers/v1/userController');

const {
    createAccount,
    getAccounts,
    getAccountById,
} = require('../../../controllers/v1/accountController');

const {
    createTransaction,
    getTransactions,
    getTransactionById,
} = require('../../../controllers/v1/transactionController');

const {
    register,
    login,
    authenticate
} = require('../../../controllers/v1/authController');

const router = express.Router();


router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);


router.post('/accounts', createAccount);
router.get('/accounts', getAccounts);
router.get('/accounts/:accountId', getAccountById);


router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:transactionId', getTransactionById);


router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/authenticate', authenticate);

module.exports = router;