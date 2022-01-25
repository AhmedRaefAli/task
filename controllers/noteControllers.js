const { validationResult } = require('express-validator');
const pool = require('../configs/postgressConfigs');
const HttpError = require('../middlewares/http-error');

const createNote = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }  

    try {
        const { description } = req.body;
        const newNote = await pool.query(
        "INSERT INTO notes VALUES($1) RETURNING *",
            [description]
        );
        res.json(newNote.rows[0]);
        }
    catch (err) {
        console.error(err.message);
        }
}    

const getNotesByUserId = async(req, res, next)=>{
    try {
        username = req.body.userName;
        const allNotes = await pool.query("SELECT * FROM note where username= $1 and disable=false",
            [username]
        );
        res.json(allNotes.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const deleteNote = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM note WHERE id = $1", 
            [id]
        );
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
};

exports.createNote = createNote;
exports.getNotesByUserId= getNotesByUserId;
exports.deleteNote= deleteNote;