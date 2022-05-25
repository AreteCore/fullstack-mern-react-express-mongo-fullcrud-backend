//dependencies
require("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()
// const {PORT = 3001, DATABASE_URL} = process.env
const morgan = require("morgan")
const cors = require("cors")


//database connection
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)

//no semicolons here
mongoose.connection
.on("open", ()=> console.log("connected to mongo"))
.on("close", () => console.log("disconnected from mongo"))
.on("error", (error) => console.log("error mongo BRAHHHH: " + error))
//end no semicolons

//schema/Model
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

//need to be able to parse stuff
//thus... middleware!
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())


//routes
app.get("/", (req,res) => {
    res.send("something!")
})

//iducs
//index
app.get("/people", async (req,res) => {
    try {
        res.json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

//delete
app.delete("/people/:id", async (req,res) => {
try {
    res.json( await People.findByIdAndDelete(req.params.id))
} catch (error) {
    res.status(400).json(error)
}
})
//update
app.put("/people/:id", async (req,res) => {
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch(error) {
        res.status(400).json(error)
    }
})

//create
app.post("/people", async (req,res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

//show
app.get("/people/:id", async (req,res) => {
    try {
        res.json(await People.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

//listener
app.listen(PORT, () => console.log(`listen ${PORT}`))