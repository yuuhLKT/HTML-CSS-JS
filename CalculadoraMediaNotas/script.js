const form = document.getElementById("form-atv");
const imgAprovado = '<img src="img/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="img/reprovado.png" alt="Emoji de Decepção" />';
const nomeAtv = document.getElementById("nome-atv");
const notaAtv = document.getElementById("nota-atv");
const corpoTable = document.getElementById("corpo-table");
const mediaFinalInput = document.getElementById("media-final");
const mediaAtv = document.getElementById("media-atv");

form.addEventListener("submit", function(e){
  e.preventDefault();
  adicionarAtividadeTable();
  calcularMedia();
  adicionarMediaTable()
});

function adicionarAtividadeTable(){
  let linhaBodyTable = '<tr>';
  linhaBodyTable += `<td>${nomeAtv.value}</td>`;
  linhaBodyTable += `<td>${parseFloat(notaAtv.value).toFixed(2)}</td>`;
  linhaBodyTable += `<td>${parseFloat(mediaAtv.value).toFixed(2)}</td>`;
  linhaBodyTable += `<td>${parseFloat(notaAtv.value) >= parseFloat(mediaAtv.value) ? imgAprovado : imgReprovado}</td>`;
  linhaBodyTable += '</tr>';
  
  corpoTable.innerHTML += linhaBodyTable;
  
  nomeAtv.value = "";
  notaAtv.value = "";
  mediaAtv.value = "";
}

function calcularMedia(){
  
  let somaNotas = 0;
  
  for (let i = 0; i < corpoTable.rows.length; i++) {
    somaNotas += parseFloat(corpoTable.rows[i].cells[1].innerText);
  }
  
  return parseFloat(somaNotas / corpoTable.rows.length).toFixed(2);
}

function adicionarMediaTable() {
  const media = calcularMedia();
  const mediaFinal = parseFloat(mediaFinalInput.value);
  const aprovadoTxt = '<span class="resultado aprovado">Aprovado</span>';
  const reprovadoTxt = '<span class="resultado reprovado">Reprovado</span>';

  let linhaMediaFinal = '<tr>';
  linhaMediaFinal += `<td><strong>Media Final</strong></td>`;
  linhaMediaFinal += `<td><strong>${media}</strong></td>`;
  linhaMediaFinal += `<td><strong>${mediaFinal.toFixed(2)}</strong></td>`;
  linhaMediaFinal += `<td>${media >= mediaFinal ? aprovadoTxt : reprovadoTxt}</td>`;
  linhaMediaFinal += '</tr>';

  const footerTable = document.getElementById("footer-table");

  footerTable.innerHTML = linhaMediaFinal;
}

mediaFinalInput.addEventListener("change", adicionarMediaTable);
