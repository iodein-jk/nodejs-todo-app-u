const taskIDDOM = document.querySelector(".task-edit-id")
const taskNameDOM = document.querySelector(".task-edit-name")
const editFormDOM = document.querySelector(".single-task-form")
const formAlertDOM = document.querySelector(".form-alert")
const taskCompletedDOM = document.querySelector(".task-edit-completed")

const params = window.location.search
const id = new URLSearchParams(params).get("id")
console.log(id)

//特定の一つのタスクを取得する
const showTask = async () => {
  try {
    const { data:task } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id, completed, name } = task
    console.log(task)

    taskIDDOM.textContent = _id
    taskNameDOM.value = name
    if(completed) taskCompletedDOM.checked = true
    
  } catch(err) {
    console.log(err)
  }
}

showTask()

editFormDOM.addEventListener("submit", async (event) => {
  event.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked
    const { data:task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted
    })
    formAlertDOM.style.display = "block"
    formAlertDOM.classList.add("text-success")
    formAlertDOM.textContent = "編集に成功しました"
  } catch(err) {
    console.log(err)
  }

  setTimeout(() => {
    formAlertDOM.classList.remove("text-success")
    formAlertDOM.style.display = "none"
  }, 3000)
})