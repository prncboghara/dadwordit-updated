const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const publicRoutes = require('./routes/public');

require('dotenv').config();

app.use(compression());

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '30d',
    immutable: true,
    setHeaders: (res, filePath) => {
        if (/\.(html?)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

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
