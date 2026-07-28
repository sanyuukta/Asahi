const express = require("express")
const router = express.Router()

router.get("/orders",(req,res)=>{
res.json({ message:"ASAHI Admin API Working" })
})

module.exports = router