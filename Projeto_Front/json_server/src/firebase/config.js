import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Opcional: import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase - você precisará substituir com suas próprias credenciais
const firebaseConfig = {
    apiKey: "AIzaSyB4DIVjtDw7xweO0Nd3WvhEGdsJoORFnyg",
    authDomain: "padbakery-4a821.firebaseapp.com",
    projectId: "padbakery-4a821",
    storageBucket: "padbakery-4a821.appspot.com",
    messagingSenderId: "165596287237",
    appId: "1:165596287237:web:1fdb6a2dba2e100e19a76c",
    measurementId: "G-SNVNNSX95S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Opcional: export const analytics = getAnalytics(app);

export default app; 