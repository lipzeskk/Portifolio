var btnAddTarefa = document.getElementById("addTaskBtn");
var taskInput = document.getElementById("taskInput");
var lista = document.getElementById("taskList");
 
btnAddTarefa.addEventListener("click", function () {
if  (taskInput.value ==="") {
    alert("Digite uma Tarefa");
 
} else {
    var taskNova = document.createElement("li");
    taskNova.innerHTML = taskInput.value + " <button>X</button>";
    taskNova.querySelector("button").addEventListener("click",function (){
        taskNova.remove();
    });
    lista.appendChild(taskNova);
    taskInput.value = "";
}
});