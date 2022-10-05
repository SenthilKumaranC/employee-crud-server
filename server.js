const express = require("express");
const cors = require("cors");
const {v4} = require("uuid");
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

app.post("/employees", async (req,res)=>{
    const employees = await fsExtra.readJson('./employees.json')
    console.log(JSON.stringify(req.body))
    const newEmployee = {id:v4(),...req.body};
    employees.push(newEmployee)
    await fsExtra.writeJson('./employees.json', employees)
    res.send(newEmployee)
})

app.put("/employees", async (req,res)=>{
   
    const {id,changes} = req.body
    const employees = await fsExtra.readJson('./employees.json');
    const employeeIndex = employees.findIndex(employee =>  employee.id === id);

    const modifiedEmployeeData = {...employees[employeeIndex],...changes};

    employees[employeeIndex] = modifiedEmployeeData;

    await fsExtra.writeJson('./employees.json', employees)
    res.send(modifiedEmployeeData)

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
    res.send(id)
})


//Start Server
app.listen(PORT,()=>{
    console.log("Server Started")
})