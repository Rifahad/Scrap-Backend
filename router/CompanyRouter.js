const express = require('express')
const Router = express.Router()
const AgentController= require('../controller/companyController')


const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// agent form is saving  in data base 
Router.post('/pickupcompany', upload.single('companyImage'), AgentController.agenyformPost);


// this path for looping in dashboard 
Router.get('/companydata',AgentController.agentdata)  


// this path to agent card  to saving  
Router.post('/companycard', upload.single('file'), AgentController.agentCard);


// this path for agent data lopping in dashborad  in campany products
Router.get('/adminagentProduct',AgentController.agentcarddata)  

    
// this path to chack existing agent is there 
Router.post('/existingagent',AgentController.ExistingAgent)

// this path for send data to frontend for show users 
Router.get('/getagentproduct',AgentController.agentcardGet)


Router.post('/adminagentProductdelete',AgentController.agentproductdelete)


// agentprooduct delete path 
Router.post('/admin/adminAgentlistDelete',AgentController.agentproductDelete)

module.exports = Router; 







