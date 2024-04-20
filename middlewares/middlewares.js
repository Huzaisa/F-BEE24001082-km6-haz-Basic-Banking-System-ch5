// middlewares/middlewares.js

// Contoh middleware untuk logging setiap permintaan
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
};

// Contoh middleware untuk menangani autentikasi menggunakan token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId; // Menyimpan ID pengguna dalam request untuk digunakan di middleware berikutnya atau di controller
        next();
    });
};

// Contoh middleware untuk menangani kesalahan server
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
    logger,
    authenticateToken,
    errorHandler
};