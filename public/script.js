// console.log(axios)

const tasksDOM = document.querySelector(".tasks")
const formDOM  = document.querySelector(".task-form")
const taskInputDOM  = document.querySelector(".task-input")
const formAlertDOM  = document.querySelector(".form-alert")

// /api/v1/tasksからタスクを読み込み
const showTasks = async () => {
  try {
    //自作のapiを叩く
    const { data:tasks } = await axios.get("/api/v1/tasks")
    // console.log(tasks)

    //タスクが一つもない時
    if(tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
      return
    }

    //タスクを出力
    const allTasks = tasks.map((task) => {
      const {completed, _id, name} = task
      return `<div class="single-task ${completed && "task-completed"}">
        <h5><span><i class="fas fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
          <a href="./edit.html?id=${_id}" class="edit-link"><i class="fas fa-edit"></i></a>
          <button type="button" class="delete-btn" data-id="${_id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>`;
    })
    .join("") //配列の間にあるカンマを消す;
    
    tasksDOM.innerHTML = allTasks
  } catch(err) {
    console.log(err)
  }
}

showTasks()

// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", {name: name})
    showTasks()
    taskInputDOM.value = ""
    formAlertDOM.style.display = "block"
    formAlertDOM.classList.add("text-success")
    formAlertDOM.textContent = "タスクを追加しました"
  } catch(err) {
    console.log(err)
    formAlertDOM.style.display = "block"
    formAlertDOM.innerHTML = "無効です。もう一度やり直してください"
  }

  setTimeout(() => {
    formAlertDOM.classList.remove("text-success")
    formAlertDOM.style.display = "none"
  }, 3000)
})

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target
  // console.log(element.parentElement)

  if(element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id
    // console.log(id)
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch(err) {
      console.log(err)
    }
  }
})