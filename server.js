//dependencies
require("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()


//routes
app.get("/", (req,res) => {
    res.send("something!")
})

//listener
app.listen(PORT, () => console.log(`listen ${PORT}`))