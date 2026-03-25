const express = require('express');
const app = express();
const publicRoutes = require('./routes/public');

require('dotenv').config();

// Serve static files from the "public" directory
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

app.use((req, res, next) => {
    const host = req.headers.host;

    // Redirect from non-www to www
    if (!host.startsWith('www.') && process.env.NODE_ENV === 'production') {
        res.redirect(301, `https://www.${host}${req.originalUrl}`);
    } else {
        next();
    }
});

app.use('/', publicRoutes);

// Start the server
app.listen(process.env.PORT, "localhost", () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
