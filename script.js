
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
let votoBranco = false;
let votos = [];

/// limpar a tela, pega a insformaçoes do jason, preenche o restante
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    votoBranco = false;
    

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
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="divisao-1-image pequeno"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;    
            }else{
                fotosHtml += `<div class="divisao-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;            
            }
            
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display =   'block';
        descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO NULO </div> ';
    }

}
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
        if (elNumero !== null) {
            elNumero.innerHTML = n;
            numero = `${numero}${n}`;
        
            elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}
function branco(){
    numero.innerHTML = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display =   'block';
    numeros.innerHTML = '';
    lateral.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO BRANCO </div> ';
    
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        });
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML =  '<div class="aviso-gigante pisca">FIM</div> ';
            console.log(votos);
        }
    }
}
comecarEtapa();
