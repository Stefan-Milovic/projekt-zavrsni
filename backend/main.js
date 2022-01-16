const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
//IMP
const { getUserById, saveUser, loginUser, getAllUsers, deleteUser, banUser, updateUser } = require('./controller/user-controller');
const { searchProducts, clearCart, saveProduct, deleteProduct, productsCount, getProductById, addToCart, getProductFromCard, updateProduct } = require('./controller/product-controller');
const { getCategories, getType } = require('./controller/category-controller');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Hello from CloudSki APP');
});


// User API start
app.get('/getUserById/:id', getUserById);
app.post('/registration', saveUser);
app.post('/login', loginUser);
app.get('/user', getAllUsers);
app.delete('/user/:id', deleteUser);
app.put('/user/:id', updateUser)
app.put('/user/ban/:id', banUser)

// Product API start
app.get('/searchProducts', searchProducts);
app.post('/createProduct', saveProduct);
app.delete('/deleteProduct/:id', deleteProduct);
app.get('/productsCount', productsCount);
app.get('/getProductById/:id', getProductById)
app.post('/addToCart', addToCart)
app.get('/getProductFromCard/:id', getProductFromCard)
app.put('/updateProduct/:id', updateProduct)
app.delete('/clearCart/:id', clearCart)
// Product API start

// Category API start
app.get('/getCategories', getCategories);
app.get('/getType', getType);
// Category API start



app.listen(PORT, () => console.log(`Application started on PORT ${PORT} `));