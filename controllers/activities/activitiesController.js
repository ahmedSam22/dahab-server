const activity = require('../../models/activities/activityModel');
const favouriteactivity= require('../../models/activities/favouriteActivitiesModel');
const activityReview= require('../../models/activities/activitiesReviews');


const getAllActivities = async (req,res,next)=>{


    pages=[];

    const {page = 1 , limit = 10,type,size} = req.query;
    //   var query = new Object();
    //   if(type) query.type = type;

//    console.log(query);

   try {
 

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
    const forPages = await activity.find({})

    const activities = await activity.find({}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("office" , "-_id name").limit(limit).skip((page  - 1) * limit)
    const links = Math.floor((forPages.length / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }
    res.status(200).json({ pages : pages,currentPage : page , data: activities, status: 200 });
     } catch (error) {
       console.log(error);
     }
    

} catch (error) {
res.status(300).json({ data: error, status: 300 });
}
}


const getActivity = async (req, res, next) => {
    const {id} = req.query;
  
    console.log(id);
    try {
      const activityReviews = await activityReview.find({activity : id}).populate("author" , "name -_id")
      const oneActivity = await activity.findOne({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("office" , "-_id -__v");;
      if (oneActivity) {
        console.log(oneActivity);
        res.status(200).json({ data: oneActivity, reviews : activityReviews, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };

  const getFilteredActivity = async (req, res, next) => {
    const {name,night} = req.query;
  
    console.log(name,night , "hhhh");
    try {
      var query = new Object();
      if(night) query.night = night;
      // if(name) query.$and = [{ $match: { 'name':  }} ];  
      const filteredActivity = await activity.find(query).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("office" , "-_id -__v");;
      if (filteredActivity) {
        console.log(filteredActivity);
        res.status(200).json({ data: filteredActivity, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };


const deleteActivity = async (req, res, next) => {
    const {id} = req.query;
  
    console.log(id);
    try {
      const oneActivity = await activity.findOneAndDelete({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
      if (oneActivity) {
        console.log(oneActivity);
        res.status(200).json({ data: oneActivity, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };



const updateActivity = async (req, res, next) => {
    console.log(req.body , "ikuyhygufguh");
  
    try {
      const oneActivity = await activity.findOneAndUpdate({_id : req.body._id}, req.body, { returnDocument: "after" })
      if (oneActivity) {
        console.log(oneActivity);
        res.status(200).json({ data: oneActivity, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
  };
  


const createActivity = (req, res, next) => {

    try {
      // console.log(req.body);
    
      // console.log(req.files.profileImage, "ksjaihuih");
      var photos = [];
    //   if(req.body.time['from'].includes('am' || "AM")){

    //   }
      var body = {
        ...req.body,
        author : req.user._id
      }
      if (req.files.photos) {
        for (let i = 0; i < req.files.photos.length; i++) {
          photos[i] = {
            path: req.files.photos[i].path,
          };
          console.log(photos);
        }
        body.photos = photos
    
    
      } 
      activity
      .create(body)
      .then((doc) => res.status(200).json({ data: doc, status: 200 }))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
    
    } catch (error) {
      throw error(error)
    }
   
  };
  


  const toggleFavouritre = async (req,res,next) => {
    try {
      const {id} = req.query;
      const isExist =  await favouriteactivity.findOne({ activity : id , author :req.user._id })
      const body = {
        activity : id,
        author: req.user._id,
      };
      console.log(isExist);
    if(!isExist){
      console.log("added");
     favouriteactivity
      .create(body)
      .then((doc) => res.json({doc}).status(200))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
      return;
    }else{
      console.log("deleted");
      favouriteactivity
      .findOneAndDelete({activity : id, author :req.user._id})
      .then((doc) => res.json(doc))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
    }
    } catch (error) {
      console.log(error);
    }
  
  }
  

  const getAllFavouriteActivities = async (req,res,next)=>{
    try {
      const {page = 1 , limit = 10} = req.query;
      const allActivities = await favouriteactivity.find({author : req.user._id}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate('activity').limit(limit).skip((page  - 1) * limit);
    
      const links = Math.floor((allActivities.length / limit) + 1);
      console.log(allActivities , "shit");
      const favourites = favouriteactivity.find({author : req.user._id}).populate('activity').limit(limit).skip((page  - 1) * limit).then((doc) => res.status(200).json({data:allActivities ,pages : links , currentPage : page , status:200}));
    //   return favourites;
    } catch (error) {
      throw error(error)
    }
  
  }



  module.exports = { getAllActivities, getActivity , deleteActivity , updateActivity , createActivity , toggleFavouritre , getAllFavouriteActivities,getFilteredActivity};