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
      alert('Login realizado com sucesso!');
      // Redirecione ou faça algo após o login bem-sucedido
      window.location.href = 'Ticket/index.html';
    })
    .catch((error) => {
      // Trate os erros de login
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao fazer login:', errorMessage);
      // Exiba uma mensagem de erro para o usuário
      window.location.href = '../index.html'
    });
});

// Função para atualizar a exibição dos botões com base no estado de autenticação
function updateButtonVisibility(user) {
  const loginButton = document.getElementById('open-login-popup');
  const logoutButton = document.getElementById('logout-button');
  const ticketButton = document.getElementById('ticket-button');

  if (user) {
      // Se o usuário estiver logado, exibe o botão de logout e oculta o botão de login
      logoutButton.style.display = 'block';
      loginButton.style.display = 'none';
      ticketButton.style.display = 'block'; // Exibe o botão de tickets
  } else {
      // Se o usuário não estiver logado, exibe o botão de login e oculta o botão de logout
      logoutButton.style.display = 'none';
      loginButton.style.display = 'block';
      ticketButton.style.display = 'none'; // Oculta o botão de tickets
  }
}

// Verifica o estado de autenticação ao carregar a página ou quando o estado mudar
firebase.auth().onAuthStateChanged((user) => {
  updateButtonVisibility(user);
});

// Adiciona um listener para o botão de logout
document.getElementById('logout-button').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
      // Logout realizado com sucesso, atualiza a exibição dos botões
      updateButtonVisibility(null);
      alert('Logout realizado com sucesso!');
  }).catch((error) => {
      // Tratamento de erros, se necessário
      console.error('Erro ao fazer logout:', error);
  });
});

document.getElementById('ticket-button').addEventListener('click', function() {
  window.location.href = './Ticket/index.html'; // Substitua com o link correto para a página de tickets
});  
