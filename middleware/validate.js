const { body, validationResult } = require('express-validator');

const validateBook = [
    body('title').notEmpty().isString().withMessage('Title is required'),
    body('author').notEmpty().isString().withMessage('Author is required'),
    body('genre').notEmpty().isString().withMessage('Genre is required'),
    body('publishedYear').isInt({ min: 0 }).withMessage('Published year must be a positive integer'),
    body('pages').isInt({ min: 0 }).withMessage('Pages must be a positive integer'),
    body('protagonist').notEmpty().withMessage('Protagonist is required'),
    body('themes').isArray({ min: 1 }).withMessage('At least one theme is required'),
    body('themes.*').isString().withMessage('Themes must be strings'),
    body('setting').notEmpty().withMessage('Setting is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateClient = [
    body('name').notEmpty().isString().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { 
    validateBook, 
    validateClient
};