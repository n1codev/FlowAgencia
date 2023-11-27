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

// Função para criar um ticket associado ao usuário logado
async function criarTicket(title, description) {
  try {
    const currentUser = firebase.auth().currentUser; // Obtém o usuário atual

    if (currentUser) {
      const db = firebase.firestore();

      // Cria um novo documento na coleção 'tickets' associado ao ID do usuário logado
      await db.collection('tickets').add({
        title: title,
        description: description,
        status: 'Aberto',
        createdBy: currentUser.uid // Armazena o ID do usuário que criou o ticket
      });

      console.log('Ticket criado com sucesso!');
      // Exibe uma mensagem de sucesso
      alert('Ticket criado com sucesso!');

      // Recarrega a página para exibir os tickets atualizados
      location.reload();
    } else {
      console.error('Nenhum usuário logado.');
      alert('nenhum usuário logado!');
      // Lógica para lidar com a ausência de usuário logado
    }
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
  }
}

// Adiciona um listener para o formulário de criação de tickets
document.getElementById('new-ticket-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('ticket-title').value;
  const description = document.getElementById('ticket-description').value;

  criarTicket(title, description);
});

// Função para listar os tickets do usuário logado
function listarTickets(userId) {
  const ticketList = document.querySelector('.ticket-list');

  db.collection('tickets')
    .where('createdBy', '==', userId) // Filtra os tickets pelo ID do usuário atual
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const ticket = doc.data();
        // Crie elementos HTML para exibir os tickets (exemplo)
        const ticketElement = document.createElement('div');
        ticketElement.classList.add('ticket');
        ticketElement.innerHTML = `
          <h3>${ticket.title}</h3>
          <p>${ticket.description}</p>
          <p>Status: ${ticket.status}</p>
        `;
        ticketList.appendChild(ticketElement);
      });
    })
    .catch((error) => {
      console.error('Erro ao recuperar tickets:', error);
    });
}

// Verifica o estado de autenticação ao carregar a página
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid; // Obtém o ID do usuário logado
    listarTickets(userId);
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
