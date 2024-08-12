// Função para fazer login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuário logado
            window.location.href = '../'
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Erro: " + errorMessage);
        });
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
});