import { app, firestore } from './firebase.js';

const auth = firebase.auth();

// Função para criar usuário com email e senha
function signUpWithEmailAndPassword(email, password, telefone) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário cadastrado:', user);

      // Enviar evento de cadastro para o Firebase Analytics
      firebase.analytics().logEvent('signup', {
        method: 'email',
        email: email,
        telefone: telefone,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao cadastrar usuário:', errorMessage);
    });
}

    // Obter referência ao formulário e aos campos
    const subscriptionForm = document.getElementById('subscription-form');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const passwordInput = document.getElementById('passwordInput');

    // Lidar com o envio do formulário
    subscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obter os valores dos campos
        const email = emailInput.value;
        const telefone = telefoneInput.value;
        const password = passwordInput.value;

        // Chamar função para criar usuário
        signUpWithEmailAndPassword(email, password, telefone);
    });

    // Formulário de login
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Pegue os valores do formulário
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Faça o login com e-mail e senha
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Limpe os campos do formulário após o login
      loginForm.reset();

      // Acesse o usuário logado
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      // Redirecione ou faça algo após o login bem-sucedido
    })
    .catch((error) => {
      // Trate os erros de login
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao fazer login:', errorMessage);
      // Exiba uma mensagem de erro para o usuário
    });
});

    
