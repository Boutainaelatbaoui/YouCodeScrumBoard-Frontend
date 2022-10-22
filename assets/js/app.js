/**
 * In this file app.js you will find all CRUD functions name.
 * 
 */

let form              = document.getElementById('modal-form');
let form_title        = document.getElementById("form-title");
let form_feature      = document.getElementById("select-feature");
let form_bug          = document.getElementById("select-bug");
let form_priority     = document.getElementById('form-priority');
let form_status       = document.getElementById('form-status');
let form_date         = document.getElementById("form-date");
let form_description  = document.getElementById("form-description");

let btn_save          = document.getElementById('btn-save');
let btn_edit          = document.getElementById('btn-edit');
let btn_delete        = document.getElementById('btn-delete');

let to_do_tasks       = document.getElementById('to-do-tasks');
let in_progress_tasks = document.getElementById('in-progress-tasks');
let done_tasks        = document.getElementById('done-tasks');

let index_global;

form.addEventListener("submit", saveTask);
btn_delete.addEventListener("click", deleteTask);
btn_edit.addEventListener("click", updateTask);


function saveTask(e) {
    e.preventDefault()

    var checked;
    if(form_feature.checked){
        checked = "Feature";
    }else {
        checked = "Bug";
    }

    // Créez task object
    let task = {
        'title'         :   form_title.value,
        'type'          :   checked,
        'priority'      :   form_priority.value,
        'status'        :   form_status.value,
        'date'          :   form_date.value,
        'description'   :   form_description.value,
    };
    // Ajoutez object au Array
    tasks.push(task);
    // Clear task form from data
    initTaskForm();
    // refresh tasks
    reloadTasks();
}


function addTask(){
    btn_save.style.display = "block";
    btn_edit.style.display = "none";
    btn_delete.style.display = "none";

    // Clear task form from data
    initTaskForm();
}

function formTask(index){
    index_global = index;
    if(tasks[index].type === "Feature"){
        form_feature.checked = true;
    }else {
        form_bug.checked = true;
    }



    btn_save.style.display = "none";
    btn_edit.style.display = "block";
    btn_delete.style.display = "block";


    form_title.value = tasks[index].title;
    form_priority.value = tasks[index].priority;
    form_status.value = tasks[index].status;
    form_date.value = tasks[index].date;
    form_description.value = tasks[index].description;

}

function deleteTask() {
    // Remove task from array by index splice function
    tasks.splice(index_global, 1);
    // Clear task form from data
    initTaskForm();
    // refresh tasks
    reloadTasks();
}

function updateTask() {
    // GET TASK ATTRIBUTES FROM INPUTS
    var checked;
    if(form_feature.checked){
        checked = "Feature";
    }else {
        checked = "Bug";
    }

    // Remplacer ancienne task par nouvelle task
    tasks[index_global].title = form_title.value;
    tasks[index_global].type  = checked;
    tasks[index_global].priority = form_priority.value;
    tasks[index_global].status = form_status.value;
    tasks[index_global].date = form_date.value;
    tasks[index_global].description = form_description.value;

    // Fermer Modal form
    initTaskForm();

    // Refresh tasks
    reloadTasks();
    
}

function initTaskForm() {
    // Clear task form from data
    document.getElementById("modal-form").reset();
    // Hide all action buttons
}

function reloadTasks() {
    // Remove tasks elements
    to_do_tasks.innerHTML ='';
    in_progress_tasks.innerHTML ='';
    done_tasks.innerHTML ='';
    // Set Task count
    let to_do_tasks_count = 0;
    let in_progress_tasks_count = 0;
    let done_tasks_count = 0;

    for(let i=0;i<tasks.length;i++){
        let button = `
        <button class="w-100 d-flex bg-white p-0 py-2 border-0 border-bottom" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="formTask(${i})">
            <div class="px-2">
                <i class="`+((tasks[i].status == 'To Do')?'bi bi-question-circle'
                :(tasks[i].status == 'In Progress')?'bi bi-arrow-counterclockwise'
                :'bi bi-check-circle')+` text-success fs-2"></i> 
            </div>
            <div class="text-start w-100 pe-2">
                <div class="fw-bold">${tasks[i].title}</div>
            <div class="text-start">
                <div class="text-gray">#${i+1} created in ${tasks[i].date}</div>
                <div class="" title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly.">${tasks[i].description.slice(0, 150)}</div>
            </div>
            <div class="">
                <span class="btn btn-primary py-1 px-2">${tasks[i].priority}</span>
                <span class="btn btn-light text-black py-1 px-2">${tasks[i].type}</span>
            </div>
        </div>
        </button>`

        switch(tasks[i].status) {
            case 'To Do': 
                to_do_tasks.innerHTML += button;
                to_do_tasks_count++;
                break;

            case 'In Progress': 
                in_progress_tasks.innerHTML += button;
                in_progress_tasks_count++;
                break;

            case 'Done': 
                done_tasks.innerHTML += button;
                done_tasks_count++;
                break;
        }
    }
    document.getElementById("to-do-tasks-count").innerText = to_do_tasks_count;
    document.getElementById("in-progress-tasks-count").innerText = in_progress_tasks_count;
    document.getElementById("done-tasks-count").innerText = done_tasks_count;
}
