const inputTarefa = document.querySelector(".input-Tarefa");
const butaoTarefa = document.querySelector(".button-Tarefa");
const tarefas = document.querySelector(".tarefas");

inputTarefa.addEventListener("keypress", function (event) {
   if (event.keyCode === 13) {
      if (!inputTarefa.value) {
         return alert("O campo não pode estar vazio");
      }
      criarTarefa(inputTarefa.value);
   }
});

butaoTarefa.addEventListener("click", function (event) {
   if (!inputTarefa.value) {
      return alert("O campo não pode estar vazio");
   }
   criarTarefa(inputTarefa.value);
});

function criarTarefa(valor) {
   const li = document.createElement("li");
   li.innerHTML = valor;
   butaoDeletar(li);
   tarefas.appendChild(li);
   inputTarefa.value = "";
   salvarTarefas();
}

function butaoDeletar(liDaTarefa) {
   liDaTarefa.innerHTML += " ";
   const butaoApagar = document.createElement("button");
   butaoApagar.innerText = "Deletar";
   butaoApagar.setAttribute("class", "Deletar");
   liDaTarefa.appendChild(butaoApagar);
}

document.addEventListener("click", function (event) {
   const elementoClicado = event.target;
   if (elementoClicado.classList.contains("Deletar")) {
      elementoClicado.parentElement.remove();
      salvarTarefas();
   }
});

function salvarTarefas() {
   const liTarefas = tarefas.querySelectorAll("li");
   const tarefasSalvas = [];
   for (let valorDaTarefa of liTarefas) {
      let tarefaTexto = valorDaTarefa.innerText;
      tarefaTexto = tarefaTexto.replace("Deletar", "").trim();
      tarefasSalvas.push(tarefaTexto);
   }
   const tarefasJSON = JSON.stringify(tarefasSalvas);
   localStorage.setItem("tarefas", tarefasJSON);
}

function adicionarTarefasSalvas() {
   const tarefasRecuperadas = localStorage.getItem("tarefas");
   const transformarTarefas = JSON.parse(tarefasRecuperadas);
   for (let tarefa of transformarTarefas) {
      criarTarefa(tarefa);
   }
}
adicionarTarefasSalvas()