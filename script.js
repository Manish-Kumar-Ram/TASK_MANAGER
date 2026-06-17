const conatiner=document.querySelector(".container");
const tasklist=document.getElementById("task-list");

const taskInput=document.getElementById("task-input");
const addTaskBtn=document.querySelector("#add-task-btn");
const searchTask=document.getElementById("search-input");


let taksarr=[];




// ye vala function render + add karne ke loye jai dynamically
function renderTasks(tasks = taksarr) {
    tasklist.innerHTML = "";
     if (tasks.length === 0) {
        tasklist.innerHTML = `<p style="text-align:center; width:100%; color: #888; font-size:50px">Koi user nahi mila! </p>`;
        return; // Yahan se function ruk jayega
    }
    tasks.forEach((elem, index) => {
        tasklist.innerHTML += `
            <div class="task-card" data-index="${index}">
                <div class="task-info">
                    <input type="checkbox">
                    <span>${elem.text}</span>
                </div>
                <div class="actions">
                    <button class="edit"><i class="ri-pencil-line"></i></button>
                    <button class="delete"  ><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>
        `;
    });
}




// ye vala function hai for the generating  the tasks with btn click
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        taksarr.push({ text: taskInput.value });
        taskInput.value = "";
    }
    renderTasks(); 
    saveTasks()
});




conatiner.addEventListener("click", (e) => {
    
    // Yahan .closest() use karo taaki icon par click ho toh bhi button mile
    if (e.target.closest('.delete')) {
        const index = e.target.closest('.task-card').dataset.index;
        taksarr.splice(index, 1);
        renderTasks();
        saveTasks();
    }

    // Yahan bhi .closest() use karo
    if (e.target.closest('.edit')) {
        const index = e.target.closest('.task-card').dataset.index;
        const newText = prompt("Edit Task:", taksarr[index].text);
        if (newText !== null && newText.trim() !== "") {
            taksarr[index].text = newText;
            renderTasks();
            saveTasks();
        }
    }
});



function loadTasks() {
    const savedTasks = localStorage.getItem("myTasks");
    if (savedTasks) {
        taksarr = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Data ko LocalStorage mein save karne ke liye
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(taksarr));
}

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
console.log(themeToggle);


const savedTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);


themeToggle.addEventListener("click", () => {
    let currentTheme = body.getAttribute("data-theme");
    let newTheme = currentTheme === "light" ? "dark" : "light";
    
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); 
});

searchTask.addEventListener("input",()=>{

    
    let value=searchTask.value.trim();
    
   let filterTask = taksarr.filter((task) => 
        task.text.toLowerCase().includes(value)
    );
    renderTasks(filterTask)
})

loadTasks()