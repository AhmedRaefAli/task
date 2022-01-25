const express = require('express');
const {check} = require('express-validator')
const noteControllers = require('../controllers/noteControllers');

const router = express.Router();

//send note to one or multi useres
router.post(
    '/sendNote',
    [
        check('title')
            .not()
            .isEmpty(),
        check('message')
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        check('type')
            .not()
            .isEmpty(),
        check('to-userName')
            .not()
            .isEmpty(),
    ],
    noteControllers.createNote
);


router.get('/getNotes', noteControllers.getNotesByUserId);

router.delete('/:Nid', noteControllers.deleteNote);

module.exports = router;
