import { Error403 } from '../controller/error';
import AuthError, { PERMISSION_DENIED } from '../service/error/auth.error';
const { check, validationResult } = require('express-validator');
const { matchedData, sanitize } = require('express-validator');

export const Permission = (permission: string) => async (req, res, next) => {
    if (await res.locals.user.can(permission)) next()
    else return Error403(new AuthError(PERMISSION_DENIED), req, res)
}

export const GroupPermission = ({group, permission}) => async (req, res, next) => {
    
    if (await res.locals.user.can(permission)) next()
    else return Error403(new AuthError(PERMISSION_DENIED), req, res)
}

export const LoginRules = [
    
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