alert('bem vindo ao jogo do número secreto!')
let listaNumerosSorteados = [];
let numeroNimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('.texto__paragrafop', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('.container__input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        //let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('.texto__paragrafop', 'Você descobriu o número secreto');
        document.getElementById('reiniciar').removeAttribute('disabled', false);
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('.texto__paragrafop', 'O número secreto é menor');
            limparCampo();
        } else {
            exibirTextoNaTela('.texto__paragrafop', 'O número secreto é maior');
            limparCampo();
        }
        tentativas++;
        limparCampo();
    }
} 

function gerarNumeroAleatorio() {
  let numeroEscolhido =  parseInt(Math.random() * numeroNimite + 1);
  let quantidadeDeElementosNALista = listaNumerosSorteados.length;

  if(quantidadeDeElementosNALista == numeroNimite){
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}