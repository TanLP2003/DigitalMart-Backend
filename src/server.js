const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const xss = require('xss-clean');
const config = require('./configs/config');
const globalExceptionHandler = require('./middlewares/globalExceptionHandler');
const productRouter = require('./features/product/product.route');
const categoryRouter = require('./features/category/category.route');
const userRouter = require('./features/user/user.route');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);

app.use(globalExceptionHandler)

mongoose.connect(config.mongo.uri)
    .then(() => {
        app.listen(8000, () => {
            console.log("Listening on port 8000")
        })
    })
    .catch((err) => {
        console.log(err);
    })

// mongoose.set('bufferTimeoutMS', 3600000)