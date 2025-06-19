# Configuração do Firebase

## 1. Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Digite o nome do projeto (ex: "padbakery")
4. Siga os passos de configuração

## 2. Configurar Autenticação

1. No console do Firebase, vá para "Authentication"
2. Clique em "Get started"
3. Vá para a aba "Sign-in method"
4. Habilite "Email/Password"
5. Habilite "Google" e configure o OAuth consent screen

## 3. Configurar Firestore Database

1. No console do Firebase, vá para "Firestore Database"
2. Clique em "Create database"
3. Escolha "Start in test mode" (para desenvolvimento)
4. Escolha a localização mais próxima

## 4. Obter Credenciais

1. No console do Firebase, clique na engrenagem (⚙️) ao lado de "Project Overview"
2. Selecione "Project settings"
3. Role para baixo até "Your apps"
4. Clique no ícone da web (</>)
5. Registre o app com um nome (ex: "padbakery-web")
6. Copie as credenciais do Firebase

## 5. Atualizar Configuração

Substitua as credenciais no arquivo `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id"
};
```

## 6. Regras do Firestore (Opcional)

Para produção, configure as regras de segurança no Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 7. Testar

1. Execute `npm run dev`
2. Teste o login com email/senha
3. Teste o login com Google
4. Verifique se os dados estão sendo salvos no Firestore

## Estrutura do Banco de Dados

O Firestore será organizado nas seguintes coleções:

- `users` - Usuários do sistema
- `products` - Produtos do estoque
- `orders` - Pedidos
- `sales` - Vendas/Receitas
- `purchases` - Compras/Fornecedores

## Próximos Passos

Após configurar o Firebase, você pode:
1. Migrar os dados do json-server para o Firestore
2. Implementar as novas funcionalidades (Pedidos, Caixa, Compras)
3. Adicionar mais medidas de segurança 