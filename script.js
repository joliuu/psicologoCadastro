//carrega os dados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  //verifica se alguém tá logado. se não tiver, redireciona pra tela e cadastro
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'cadastro/';
    }
  });
  carregarDados();
});

//salva os dados dos clientes no localstorage
function salvar() {
  const dados = document.getElementById('clientTableBody').innerHTML;
  localStorage.setItem('dados', dados);
}

//carrega os dados dos clientes
function carregarDados() {
  const tableBody = document.getElementById('clientTableBody');
  const dados = localStorage.getItem('dados');
  if (dados) {
    tableBody.innerHTML = dados;
  }
}

//função para adicionar um cliente quando clicar no botão
function addCliente() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const post = document.getElementById('post').value;
  const sDate = document.getElementById('sDate').value;

  //verifica se preencheu todos os campos
  if (name === "" || isNaN(age) || city === "" || email === "" || phone === "" || post === "" || sDate === "") {
    alert('Por favor, preencha todos os campos.');
  } else {
    const tableBody = document.getElementById('clientTableBody');
    const cliente = document.createElement('tr');
    cliente.classList.add("cliente");

    //cria o elemento do cliente no html
    cliente.innerHTML = `
      <td class="nome">${name}</td>
      <td class="idade">${age}</td>
      <td class="cidade">${city}</td>
      <td class="email">${email}</td>
      <td class="telefone">${phone}</td>
      <td class="post">${post}</td>
      <td class="data">${sDate}</td>
      <td>
        <button class="edit-btn" onclick="editar(this)">Editar</button>
        <button class="delete-btn" onclick="excluir(this)">Excluir</button>
      </td>
    `;
    tableBody.appendChild(cliente);
    salvar();
  }
};

//edita os dados do cliente
function editar(button) {
  const cliente = button.parentNode.parentNode;
  let nome = cliente.getElementsByClassName('nome')[0];
  let idade = cliente.getElementsByClassName('idade')[0];
  let cidade = cliente.getElementsByClassName('cidade')[0];
  let email = cliente.getElementsByClassName('email')[0];
  let telefone = cliente.getElementsByClassName('telefone')[0];
  let post = cliente.getElementsByClassName('post')[0];
  let data = cliente.getElementsByClassName('data')[0];

  nome.innerHTML = `<input type="text" value="${nome.innerText}">`;
  idade.innerHTML = `<input type="number" value="${idade.innerText}">`;
  cidade.innerHTML = `<input type="text" value="${cidade.innerText}">`;
  email.innerHTML = `<input type="email" value="${email.innerText}">`;
  telefone.innerHTML = `<input type="text" value="${telefone.innerText}">`;
  post.innerHTML = `<input type="text" value="${post.innerText}">`;
  data.innerHTML = `<input type="date" value="${data.innerText}">`;

  button.innerText = 'Salvar';
  button.onclick = function() {
    salvarEdicao(button);
  };
}

//salva os dados editados
function salvarEdicao(button) {
  const cliente = button.parentNode.parentNode;
  let nome = cliente.getElementsByClassName('nome')[0].getElementsByTagName('input')[0].value;
  let idade = cliente.getElementsByClassName('idade')[0].getElementsByTagName('input')[0].value;
  let cidade = cliente.getElementsByClassName('cidade')[0].getElementsByTagName('input')[0].value;
  let email = cliente.getElementsByClassName('email')[0].getElementsByTagName('input')[0].value;
  let telefone = cliente.getElementsByClassName('telefone')[0].getElementsByTagName('input')[0].value;
  let post = cliente.getElementsByClassName('post')[0].getElementsByTagName('input')[0].value;
  let data = cliente.getElementsByClassName('data')[0].getElementsByTagName('input')[0].value;

  cliente.getElementsByClassName('nome')[0].innerText = nome;
  cliente.getElementsByClassName('idade')[0].innerText = idade;
  cliente.getElementsByClassName('cidade')[0].innerText = cidade;
  cliente.getElementsByClassName('email')[0].innerText = email;
  cliente.getElementsByClassName('telefone')[0].innerText = telefone;
  cliente.getElementsByClassName('post')[0].innerText = post;
  cliente.getElementsByClassName('data')[0].innerText = data;

  button.innerText = 'Editar';
  button.onclick = function() {
    editar(button);
  }; 
  salvar();
}

//exclui um cliente
function excluir(cliente) {
  cliente.parentNode.parentNode.remove()
  salvar();
}
