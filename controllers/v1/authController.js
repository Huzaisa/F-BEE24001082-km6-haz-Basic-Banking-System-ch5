const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

const register = async(req, res) => {
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

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user || user.password !== password) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

const authenticate = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;

        res.json({ authenticated: true });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    register,
    login,
    authenticate
};