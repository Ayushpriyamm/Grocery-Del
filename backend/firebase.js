import admin from 'firebase-admin';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs'; // Import readFileSync from fs

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Set the path to the serviceAccountKey.json file
const serviceAccountPath = resolve(__dirname, 'config', 'serviceAccountKey.json');

// Read the service account key
let serviceAccount;
try {
    // Use readFileSync to read the JSON file
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch (error) {
    console.error('Failed to load service account key:', error);
    throw new Error('Firebase Admin SDK initialization failed');
}

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
