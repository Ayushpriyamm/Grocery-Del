import dotenv from 'dotenv';
import ExpressSession from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

dotenv.config();

const MongoDBStore = connectMongoDBSession(ExpressSession);

// Create a session store
export const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'session' 
});

sessionStore.on("error", (error) => {
    console.log("Session store error", error);
});

export const authenticate = async (email, password) => {
    console.log("Authenticating:", email); 
    if (email === process.env.Admin_EMAIL && password === process.env.Admin_PASSWORD) {
        return Promise.resolve({ email: email, password: password });
    } else {
        return null;
    }
};

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;
