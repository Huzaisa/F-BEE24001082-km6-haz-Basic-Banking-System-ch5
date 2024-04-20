const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

// Middleware
app.use(express.json());

// Routes
const v1Routes = require('./routes/api/v1');
app.use('/api/v1', v1Routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;