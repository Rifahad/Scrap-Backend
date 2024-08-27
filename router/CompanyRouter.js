const express = require('express')
const Router = express.Router()
const {agenyformPost,
    agentdata,
    agentCard,
    agentcarddata,
    ExistingAgent,
    agentcardGet,
    agentproductdelete,
    adminAgentproductEdit,
    AgentupdateProduct,
    agentproductDelete
} = require('../controller/companyController')
const {Companypickupstorage,CompanyImage} =require('../middleware/multer')


const multer = require('multer')
const upload = multer({ storage: Companypickupstorage });
const CompanyUpload = multer({storage:CompanyImage})



// agent form is saving  in data base 
Router.post('/pickupcompany', upload.single('companyImage'), agenyformPost);


// this path for looping in dashboard 
Router.get('/companydata',agentdata)  


// this path to agent card  to saving  
Router.post('/companycard', CompanyUpload.single('file'), agentCard);


// this path for agent data lopping in dashborad  in campany products
Router.get('/adminagentProduct',agentcarddata)  


// this path to chack existing agent is there 
Router.post('/existingagent',ExistingAgent)

// this path for send data to frontend for show users 
Router.get('/getagentproduct',agentcardGet)


Router.post('/adminagentProductdelete',agentproductdelete)


// agentCard card edit path  



// agentprooduct delete path 
Router.post('/admin/adminAgentlistDelete',agentproductDelete)

module.exports = Router; 







