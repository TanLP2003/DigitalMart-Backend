const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const db = require('./configs/db.config');
const productRouter = require('./features/product/product.route');
const categoryRouter = require('./features/category/category.route');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter);
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

mongoose.connect(db.mongo.uri)
    .then(() => {
        app.listen(8000, () => {
            console.log("Listening on port 8000")
        })
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    })