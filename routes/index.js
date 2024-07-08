const express = require('express');
const router = express.Router();

//import routes
const userRoutes = require('./userRoutes'); 
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const commentRoutes = require('./commentRoutes');

//use routes
router.use('/user', userRoutes); 
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
