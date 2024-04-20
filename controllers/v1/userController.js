const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async(req, res) => {
    const { nama, email, password, profile } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                nama,
                email,
                password,
                profile: {
                    create: profile
                }
            },
            include: {
                profile: true
            }
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const getUsers = async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getUserById = async(req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};



module.exports = {
    createUser,
    getUsers,
    getUserById,
};