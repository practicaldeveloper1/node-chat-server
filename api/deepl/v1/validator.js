const { check, validationResult } = require('express-validator');
const { ClientError } = require('../../error');
exports.validateTranslateReq = [
    check('text')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Text can not be empty!'),
    check('target_lang')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Target language can not be empty!')
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!'),

    (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ClientError(422, errors.array());
        }
        next();
    } catch (err) {
        next(err);
    }
    },
];