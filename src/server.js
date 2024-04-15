const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const globalExceptionHandler = require('./middlewares/globalExceptionHandler');
const productRouter = require('./features/product/product.route');
const categoryRouter = require('./features/category/category.route');
const userRouter = require('./features/user/user.route');
const basketRouter = require('./features/basket/basket.route');
const favoriteRouter = require('./features/favorite/favorite.route');
const orderRouter = require('./features/order/order.route');
const {connectDatabases} = require('./configs/init.db');


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
app.use('/api/basket', basketRouter)
app.use('/api/favorite', favoriteRouter);
app.use('/api/order', orderRouter);
// app.use('/api/test', (req, res, next) => {
//     res.status(200).json("OK");
//     console.log("hello-world")
// })
app.use(globalExceptionHandler)

connectDatabases()
    .then(() => {
        app.listen(8000, () => {
            console.log("Listening on port 8000");
        })
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    })
