var firebaseConfig = {
    apiKey: "AIzaSyAn8AAnTy8OwOJnijimzU_CJAeVXnyjVLo",
    authDomain: "agenciaflow.firebaseapp.com",
    databaseURL: "https://agenciaflow-default-rtdb.firebaseio.com",
    projectId: "agenciaflow",
    storageBucket: "agenciaflow.appspot.com",
    messagingSenderId: "192122522554",
    appId: "1:192122522554:web:b0cbf6cb5ae37108c9eb83",
    measurementId: "G-VRM4MBPVZF"
  };
  
  // Inicialize o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  
  // Referência para o Firestore
  const firestore = firebase.firestore();
  
  const db = firebase.firestore();
  
  // Verifica o estado de autenticação ao carregar a página
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid; // Obtém o ID do usuário logado
    }
  });
  
  const logoutButton = document.getElementById('logout-btn');
  
  // Evento de clique para o botão de logout
  logoutButton.addEventListener('click', () => {
      firebase.auth().signOut()
          .then(() => {
              // Logout bem-sucedido
              window.location.href = '../index.html'; // Redireciona para a landing page após logout
          })
          .catch((error) => {
              // Trata erros de logout, se necessário
              console.error('Erro ao fazer logout:', error);
          });
  });
  
  // Referência para o elemento onde as informações do usuário serão exibidas
  const userInfoDiv = document.getElementById('user-info');
  
  // Função para exibir as informações do usuário
  function displayUserInfo(user) {
      if (user) {
          const { displayName, email } = user;
  
          // Exemplo de exibição das informações do usuário
          userInfoDiv.innerHTML = `
              <p>Nome: ${displayName}</p>
              <p>Logado como: ${email}</p>
          `;
      } else {
          // Caso o usuário não esteja logado, limpa as informações
          userInfoDiv.innerHTML = 'Usuário não logado.';
      }
  }
  
  // Verifica se há um usuário logado
  firebase.auth().onAuthStateChanged((user) => {
      // Exibe as informações do usuário logado
      displayUserInfo(user);
  });

  // Referência para o formulário de alteração de senha
const changePasswordForm = document.getElementById('change-password-form');

// Event listener para o envio do formulário de alteração de senha
changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = changePasswordForm['new-password'].value;

    // Altera a senha do usuário atual
    const user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(() => {
        // Senha alterada com sucesso
        alert('Senha alterada com sucesso!');
        location.reload();
        changePasswordForm.reset();
    }).catch((error) => {
        // Trata erros ao alterar a senha
        console.error('Erro ao alterar a senha:', error);
        // Exibe mensagem de erro para o usuário
        alert('A senha precisa ter pelo menos 6 caracteres. Por favor, tente novamente.');
    });
});

// Referência para o formulário de alteração de nome de usuário
const changeUsernameForm = document.getElementById('change-username-form');

// Event listener para o envio do formulário de alteração de nome de usuário
changeUsernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = changeUsernameForm['new-username'].value;

    // Altera o nome de usuário do usuário atual
    const user = firebase.auth().currentUser;
    user.updateProfile({ displayName: newUsername }).then(() => {
        // Nome de usuário alterado com sucesso
        alert('Nome de usuário alterado com sucesso!');
        location.reload();
        changeUsernameForm.reset();
    }).catch((error) => {
        // Trata erros ao alterar o nome de usuário
        console.error('Erro ao alterar o nome de usuário:', error);
        // Exibe mensagem de erro para o usuário
    });
});
