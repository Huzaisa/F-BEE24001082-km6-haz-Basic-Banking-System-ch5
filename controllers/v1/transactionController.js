const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const createTransaction = async(req, res) => {
    const { sourceAccountId, destinationAccountId, amount } = req.body;
    try {
        const newtransaction = await prisma.transaction.create({
            data: {
                sourceAccountId,
                destinationAccountId,
                amount
            }
        });
        res.json(newtransaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

const getTransactions = async(req, res) => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

const getTransactionById = async(req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                sourceAccount: true,
                destinationAccount: true
            }
        });
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction details' });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
};