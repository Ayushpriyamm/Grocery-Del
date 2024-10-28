import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    try {
        const payload = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};
