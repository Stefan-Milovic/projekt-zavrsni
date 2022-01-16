const conn = require('../connection');

const searchProducts = (req, res) => {
    const { category_id, price } = req.query;
    let sql = 'SELECT * from product WHERE 1=1';
    if (category_id) {
        sql += ` AND category_id = ${category_id}`
    }
    if (price) {
        sql += ` AND price = ${price}`
    }
    /*
    if (type) {
        sql += ` AND type = ${type}`
    }
    */
    conn.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json(results);
    });

};

const saveProduct = (req, res) => {
    const { name, category_id, description, price, discount, defaultImage, img1, img2, img3, type } = req.body;
    const sql = 'INSERT INTO PRODUCT(name,category_id,description,price,discount,defaultImage,image1,image2,image3,type) VALUES (?,?,?,?,?,?,?,?,?,?)';
    conn.query(sql, [name, category_id, description, price, discount, defaultImage, img1, img2, img3, type], (err, result) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ id: result.insertId });
    });
}

const deleteProduct = (req, res) => {
    // SET FOREIGN_KEY_CHECKS=0; -- to disable them
    // DELETE FROM `product` WHERE `id` = 37 LIMIT 1 ;
    // SET FOREIGN_KEY_CHECKS=1; -- to re-enable them

    const { id } = req.params;


    const sql = 'SET FOREIGN_KEY_CHECKS=0; DELETE FROM PRODUCT WHERE ID = ?; SET FOREIGN_KEY_CHECKS=1;';
    conn.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ msg: 'Successfully deleted product' });
    });

}
const productsCount = (req, res) => {
    conn.query(`SELECT count(1) as number_of_products FROM  PRODUCT`, (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json(results[0] || {});
    });

}

const getProductById = (req, res) => {
    const { id } = req.params;
    conn.query(`SELECT * from product where id = ?`, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json(results[0] || {});
    });

}
const addToCart = (req, res) => {
    const { productId, userId } = req.body;
    const sql = `INSERT INTO CART(userId,productId,status) VALUES (?,?,'Pending')`;
    conn.query(sql, [userId, productId], (err, result) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ id: result.insertId });
    });
}
const getProductFromCard = (req, res) => {
    const { id } = req.params;
    console.log('this is called', id);
    conn.query(`SELECT * FROM cart c JOIN product p ON p.id = c.productId WHERE c.userId = ?;`, [id], (err, results) => {
        console.log(results);
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json(results);
    });
}

const clearCart = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cart WHERE userId = ?';
    conn.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ msg: 'Products bought.' });
    });
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category_id, description, price, discount, defaultImage, img1, img2, img3, type } = req.body


    const sql = `UPDATE product SET name = ?, category_id = ?, description = ?, price = ?, discount = ?, defaultImage = ?, image1 = ?, image2 = ?, image3 = ?, type = ? WHERE id = ?;`;
    conn.query(sql, [name, category_id, description, price, discount, defaultImage, img1, img2, img3, type, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err)
        };
        //If return {}
        res.status(200).json({ msg: 'Successfully updated product' });
    });

}

module.exports = {
    searchProducts,
    saveProduct,
    deleteProduct,
    productsCount,
    getProductById,
    addToCart,
    getProductFromCard,
    updateProduct,
    clearCart
}