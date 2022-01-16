const conn = require('../connection');

const getCategories = (req, res) => {
    conn.query(`SELECT * from category`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};
const getType = (req, res) => {
    conn.query(`SELECT * from product_type`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};



module.exports = {
    getCategories,
    getType
}