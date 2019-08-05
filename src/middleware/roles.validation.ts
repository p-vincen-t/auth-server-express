const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

export const AddLevelRules = [
    
    check('email')
        // Every validator method in the validator lib is available as a
        // method in the check() APIs.
        // You can customize per validator messages with .withMessage()
        .isEmail().withMessage('must be an email') 
        // Every sanitizer method in the validator lib is available as well!
        .trim()
        .normalizeEmail(),

    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })  
]

export const ResetRules = [
    
    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })   
]

export const UpdateRules = [
    
    check('email')
        // Every validator method in the validator lib is available as a
        // method in the check() APIs.
        // You can customize per validator messages with .withMessage()
        .isEmail().withMessage('must be an email') 
        // Every sanitizer method in the validator lib is available as well!
        .trim()
        .normalizeEmail(),

    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })  
]


export const RegisterRules = [
    check('email')
        // Every validator method in the validator lib is available as a
        // method in the check() APIs.
        // You can customize per validator messages with .withMessage()
        .isEmail().withMessage('must be an email')     
        // Every sanitizer method in the validator lib is available as well!
        .trim()
        .normalizeEmail(),

    check('names').exists(),
    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
]