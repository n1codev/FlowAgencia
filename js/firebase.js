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
  
  const form = document.querySelector('.contact__form');

  // Adicionar um listener para o evento de envio do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
  
    // Obter os valores dos campos do formulário
    const email = form.querySelector('input[type="email"]').value;
    const nome = form.querySelector('input[type="text"]').value;
    const telefone = form.querySelectorAll('input[type="text"]')[1].value;
    const mensagem = form.querySelector('textarea').value;
  
    // Referência à coleção do Firestore (substitua 'suaColecao' pelo nome da coleção)
    const db = firestore.collection('contatoData');
  
    // Salvar os dados no Firestore
    db.add({
      email: email,
      nome: nome,
      telefone: telefone,
      mensagem: mensagem
    })
    .then(() => {
      // Limpar os campos do formulário após enviar os dados
      form.reset();
      alert('Dados enviados com sucesso!');
    })
    .catch((error) => {
      alert('Erro ao enviar os dados: ' + error.message);
    });
  });