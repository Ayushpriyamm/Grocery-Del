import { check } from 'express-validator'

export const signupValidation = [
    check("name", "name is required").not().isEmpty(),
    check("mobile", "please enter a valid a phone number").isMobilePhone('en-IN').withMessage('Invalid Mobile number'),
    check("password","Password must be atleast 6 characters").isLength({ min:6 })
]

export const signinValidation = [

    check("mobile", "please enter a valid a phone number").isMobilePhone('en-IN').withMessage('Invalid Mobile number'),
    //check("password","Password must be atleast 6 characters").isLength({min:6})
]

export const updateUserValidation = [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('mobile', 'Please provide a valid mobile number').optional().isMobilePhone('en-IN')
];

