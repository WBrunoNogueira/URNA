
const s = (el) => document.querySelector(el);


let seuVotoPara = s('.divisao-1-1 span');
let cargo = s('.divisao-1-2 span');
let descricao = s('.divisao-1-4');
let aviso = s('.divisao-2');
let lateral = s('.divisao-1-direita');
let numeros = s('.divisao-1-3');


//VARIAVEL DE CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = '';

/// limpar a tela, pega a insformaçoes do jason, preenche o restante
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';

    for (let i = 0;  i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }else{
            numeroHTML += '<div class="numero"></div>';
        }   
       
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display =   'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;

}

function atualizainterface(){

}


function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero} ${n}`;

        elNumero.classList.remove('pisca');
        elNumero.nextElementSibling.classList.add('pisca');

    }
}
function branco(){
    alert('clicou em BRANCO ');
}
function corrige(){
    alert('clicou em CORRIGE ');
}
function confirma(){
    alert('clicou em CONFIRMA');
}

comecarEtapa();