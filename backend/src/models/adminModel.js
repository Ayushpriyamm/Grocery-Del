import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    mobile: {
        type: Number,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Admin"],
        default: "Admin",
    },
    
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;