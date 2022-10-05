const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const fsExtra = require('fs-extra')

//Load Json Using Callback
/* fs.readJson('./employees.json', (err, dbData) => {
  if (err) console.error(err)
  console.log(dbData)
}) */

//Create Server
const app = express();

//to give permission
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//Set Port
const PORT = 4444;

//http://localhost:4444/employees
app.get("/employees", async (req,res)=>{
    const db = await fsExtra.readJson('./employees.json')
    res.send(db)
})

//to delete the student
app.delete("/employees/:id", async (req,res)=>{
    //const db = await fsExtra.readJson('./employees.json')
    //res.send(db)
    const {id} = req.params
    const employees = await fsExtra.readJson('./employees.json');

    const employeeIndex = employees.findIndex(employee =>  employee.id === id);
    employees.splice(employeeIndex,1);

    await fsExtra.writeJson('./employees.json', employees)

})


//Start Server
app.listen(PORT,()=>{
    console.log("Server Started")
})