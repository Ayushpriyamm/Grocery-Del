import { check } from 'express-validator'

const signupValidation = [
    check("name", "name is required").not().isEmpty(),
    check("mobile", "please enter a valid a phone number").isMobilePhone('en-IN').withMessage('Invalid Mobile number'),
    check("password","Password must be atleast 6 characters").isLength({min:6})
]

export default signupValidation