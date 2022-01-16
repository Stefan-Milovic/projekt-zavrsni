const conn = require('../connection');
const bcrypt = require('bcrypt')
const saltRounds = 10

const getUserById = (req, res) => {
    const { id } = req.params;
    conn.query(`SELECT * from USER where id= ?`, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json(results[0] || {});
    });
};

const saveUser = async (req, res) => {
    const { firstName, lastName, username, email, address, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO USER(username,email,address,firstName,lastName,password) VALUES (?,?,?,?,?,?)'
    conn.query(sql, [username, email, address, firstName, lastName, passwordHash], (err, result) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ id: result.insertId });
    });
}
const updateUser = (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { username, email, firstName, lastName, role, address, status } = req.body


    const sql = `UPDATE user SET username = ?, email = ?, firstName = ?, lastName = ?, role = ?, status = ?, address = ? WHERE id = ?;`;
    conn.query(sql, [username, email, firstName, lastName, role, status, address, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err)
        };
        //If return {}
        res.status(200).json({ msg: 'Successfully updated user' });
    });

}
const getAllUsers = (req, res) => {
    conn.query(`SELECT * from user`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM user WHERE (EMAIL = ? OR USERNAME = ?)';
    conn.query(sql, [email, email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results[0].status === 'DELETED' || results[0].status === "BAN") {
            return res.status(200).send({ error: 'This account is not available.' });
        }
        console.log(results[0]);
        const match = await bcrypt.compare(password, results[0].password)
        if (!match) {
            res.status(500).json({ msg: "incorrect password" })
        }
        //If return {}
        delete results[0].password
        res.status(200).json(results[0] || {});
    });
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE user SET status = "DELETED" WHERE id = ?;';
    conn.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ msg: 'Successfully deleted user' });
    });
}
const banUser = (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE user SET status = "BAN" WHERE id = ?;';
    conn.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        //If return {}
        res.status(200).json({ msg: 'Successfully banned user' });
    });
}


module.exports = {
    getUserById,
    saveUser,
    updateUser,
    loginUser,
    getAllUsers,
    deleteUser,
    banUser
}