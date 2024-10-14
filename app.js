const express = require("express")
const app = express()
const taskRouter = require("./routes/tasks")
const connectDB = require("./db/connect")

require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const PORT = 8000

//ルーティング設計
app.use("/api/v1/tasks", taskRouter)

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT, console.log('サーバーが起動しました'))
  } 
  catch(err) {
    console.log(err)
  }
}

start()
// app.listen(PORT, console.log('サーバーが起動しました'))