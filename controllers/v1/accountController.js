const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createAccount = async(req, res) => {
    const { userId, bankName, bankAccountNumber, balance } = req.body;
    try {
        const newAccount = await prisma.bankAccount.create({
            data: {
                bankName,
                bankAccountNumber,
                balance,
                User: { connect: { id: userId } }
            }
        });
        res.json(newAccount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create account' });
    }
};

const getAccounts = async(req, res) => {
    try {
        const accounts = await prisma.bankAccount.findMany();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

const getAccountById = async(req, res) => {
    const accountId = parseInt(req.params.accountId);
    try {
        const account = await prisma.bankAccount.findUnique({
            where: { id: accountId }
        });
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch account details' });
    }
};

module.exports = {
    createAccount,
    getAccounts,
    getAccountById,
};