
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

function atualizaInterface(){

    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display =   'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partindo: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="divisao-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;            
        }
        lateral.innerHTML = fotosHtml;
    }

}


function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
        if (elNumero !== null) {
            elNumero.innerHTML = n;
            numero = `${numero} ${n}`;
        
            elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
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
