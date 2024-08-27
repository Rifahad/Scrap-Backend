const {pickupupload} = require('../model/pickup')
const {Company} = require('../model/companymodel')


module.exports={

    totalUserCount: async (req,res)=>{   
         try {
        const totaluser = await pickupupload.countDocuments();
        const userData = await pickupupload.find()
        // console.log(totaluser, 'totaluser');
        res.json({ count: totaluser,userData:userData });
    } catch (error) {
        console.error('Error fetching total user count:', error);
        res.status(500).json({ message: 'Error fetching total user count' });
    }
    },
    totalAgentCount: async (req,res) =>{
        try {
            const totalagent = await Company.countDocuments();

            
            // console.log(totalagent, 'totalagent');
            res.json({ count: totalagent });
        } catch (error) {
            
        }

    },
    totalPickupCount: async (req,res) =>{
        try {
            const totaluser = await pickupupload.countDocuments();
            console.log(totaluser, 'totaluser');
            res.json({ count: totaluser });
        } catch (error) {
            console.error('Error fetching total user count:', error);
            res.status(500).json({ message: 'Error fetching total user count' });
        }
    },
    totalAgentPickupCount:async(req,res)=>{
        try {
            const totalagent = await Company.countDocuments();
            console.log(totalagent, 'totalagent');
            res.json({ count: totalagent });
        } catch (error) {
            
        }
    }
}