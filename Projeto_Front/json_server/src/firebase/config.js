import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Opcional: import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase - você precisará substituir com suas próprias credenciais
const firebaseConfig = {
    apiKey: "chave_de_api_aqui",
    authDomain: "dominio_de_autenticacao_aqui",
    projectId: "nome_do_projeto_aqui",
    storageBucket: "nome_do_bucket_aqui",
    messagingSenderId: "identificador_de_mensagem_aqui",
    appId: "id_do_app_aqui",
    measurementId: "id_de_medicao_aqui" // Opcional
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Opcional: export const analytics = getAnalytics(app);

export default app; 
