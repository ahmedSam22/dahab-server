const customiseactivity = require('../../models/activities/customizeActivity');



const getAllCustomises = async (req,res,next)=>{


    pages=[];

    const {page = 1 , limit = 10,size} = req.query;
  
   try {
    const countedCustomises = customiseactivity.find({}).count({})
    const links = Math.floor((countedCustomises / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }

    try {
    //     if(req.headers?.authorization){
    //    const offices = await tripoffices.find(query).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').limit(limit).skip((page  - 1) * limit)
 
    //    const favs = await favouriteHotels.find({author : req.user._id}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
 
    //    // console.log(favs);
    //    res.status(200).json({ pages : pages,currentPage : page , data: offices,favs:favs, status: 200 });
    //  }else{
    //    const Hotels = await hotels.find({}).limit(limit).skip((page  - 1) * limit)
 
    //    res.status(200).json({ pages : pages,currentPage : page , data: Hotels, status: 200 });
 
    //  }
    const customises = await customiseactivity.find({}).populate("author" , "name -_id").populate("office" , "-_id -__v").limit(limit).skip((page  - 1) * limit)
 
    res.status(200).json({ pages : pages,currentPage : page , data: customises, status: 200 });
     } catch (error) {
       console.log(error);
     }
    

} catch (error) {
res.status(300).json({ data: error, status: 300 });
}
}


const getCustomise = async (req, res, next) => {
    const {id} = req.query;
  
    console.log(id);
    try {
      const oneCustomise = await customiseactivity.findOne({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("office" , "-_id -__v");;
      if (oneCustomise) {
        console.log(oneCustomise);
        res.status(200).json({ data: oneCustomise , status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };



const deleteCustomise = async (req, res, next) => {
    const {id} = req.query;
  
    console.log(id);
    try {
      const oneCustomise = await customiseactivity.findOneAndDelete({ _id: id })
      if (oneCustomise) {
        console.log(oneCustomise);
        res.status(200).json({ data: oneCustomise,message : "deleted " , status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };



const updateCustomise = async (req, res, next) => {
    console.log(req.body , "ikuyhygufguh");
  
    try {
      const oneCustomise = await customiseactivity.findOneAndUpdate({_id : req.body.id}, req.body, { returnDocument: "after" })
      if (oneCustomise) {
        console.log(oneCustomise);
        res.status(200).json({ data: oneCustomise, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };
  


const createCustomise = (req, res, next) => {

    try {
      // console.log(req.body);
    
      // console.log(req.files.profileImage, "ksjaihuih");
    //   if(req.body.time['from'].includes('am' || "AM")){

    //   }
      var body = {
        ...req.body,
        author : req.user._id
      }
  
      customiseactivity
      .create(body)
      .then((doc) => res.status(200).json({ data: doc, status: 200 }))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
    
    } catch (error) {
      throw error(error)
    }
   
  };
  

  module.exports = { getAllCustomises, getCustomise , deleteCustomise , updateCustomise , createCustomise}