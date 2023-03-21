const Sections = require("../models/sectionsModel");

const createSection = (req,res) => Sections.create(req.body).then(doc=>res.status(200).json({data:doc , status:200})).catch(err=>res.status(300).json({error:err , status : 300}));

const getSections = async (req,res,next)=>{
    try {
        const allSections = await Sections.find({});
        if(allSections){
            console.log(allSections);
            res.status(200).json({data:allSections,status:200})
        }
    } catch (error) {
        res.status(300).json({data:error,status:300})
    }
    
}



    

//     const verified = user.nationalID == nationalID;



//     if(!verified){    
//         console.log("from user") 
//         next("wrong");
//         res.json("wrong")
//          return;
//      }
     
//     if(user && verified){
// // return nationalID
// console.log("it's okay yasta");
//     }
// }


const updateSection = async (req, res , next) =>{

    // const user = await users.findOne({nationalID}).exec();
const query = { _id: req.body._id }



const updated = Sections.findOneAndUpdate(query, req.body).then((result) => {
    next("success");
    res.status(200).json({data : result})
     return;    }).catch((err) => {
    console.log(err);
});
console.log(updated);


}



const deleteSection = async (req , res , next) =>{
    const query = { _id: req.body._id }



    const updated = Sections.findOneAndDelete(query).then((result) => {
        next("success");
        res.status(200).json({data : result})
         return;    }).catch((err) => {
        console.log(err);
    });
    console.log(updated);
    
 
}




module.exports = {getSections , createSection , updateSection , deleteSection}