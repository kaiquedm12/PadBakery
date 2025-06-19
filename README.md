# 📦 Setup Firebase - PadBakery

## 🚀 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um projeto (ex: "padbakery")
3. Adicione um app web (\</>) e copie as credenciais

## 🔑 2. Ativar Autenticação

1. Vá em **Authentication > Get started**
2. Ative os métodos:

   * **Email/Password**
   * **Google** (configure a tela de consentimento)

## 🔥 3. Configurar Firestore

1. Vá em **Firestore Database > Create database**
2. Selecione **Modo de Teste** para desenvolvimento

## ⚙️ 4. Inserir Config no Projeto

Atualize `src/firebase/config.js` com suas credenciais:

```js
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-app.firebaseapp.com",
  projectId: "seu-id",
  ...
};
```

## 🛡️ 5. Regras de Segurança (opcional)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🧪 6. Testar Funcionalidades

* `npm run dev`
* Teste login (email/senha e Google)
* Verifique dados no Firestore

---

# ✅ Funcionalidades Prontas

* Autenticação com Firebase (email/senha + Google)
* CRUD completo para produtos, pedidos e vendas
* Contexto de autenticação e rotas protegidas
* Interface responsiva e validada
* Componentes e navegação atualizados
* Serviço `firestoreService.js` com integração

---

# 🔜 Próximos Passos

* [ ] Migrar dados do JSON Server para Firestore
* [ ] Implementar abas de Pedidos, Caixa e Compras
* [ ] Adicionar relatórios, métricas e notificações

---

# 🗂 Estrutura Alterada

```
src/
├── firebase/config.js
├── context/Auth.jsx
├── services/firestoreService.js
├── routes/{Login, Signup, NavBar}.jsx
├── components/RotaProtegida.jsx
└── main.jsx
```

---

# 📦 Tecnologias

* `firebase`
* `@react-oauth/google`
* `react-router-dom`
* `react`

