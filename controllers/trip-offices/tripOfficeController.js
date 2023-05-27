const tripoffices = require('../../models/trip-offices/tripOfficesModel');
const haversine = require('haversine-distance');
const officReviews = require("../../models/trip-offices/officesReviews")
const officFavourite = require("../../models/trip-offices/favouriteOfficesModel");
const activity = require('../../models/activities/activityModel');



const getAllOffices = async(req , res,next) =>{



    pages=[];

    const {page = 1 , limit = 10,type,size} = req.query;

    try {
      const offices = await tripoffices.find({}).populate("author" , "name -_id").limit(limit).skip((page  - 1) * limit)
      const links = Math.floor((offices.length / limit) + 1);
      for(let i = 1; i<=links;i++){
        pages.push(i)
      }
      res.status(200).json({ pages : pages,currentPage : page , data: offices, status: 200 });

    } catch (error) {
        res.status(300).json({ data: error, status: 300 });
    }
}

const createOffice = async(req,res,next) =>{

    try {
        const locationStart = { lat: 28.495297, lng: 34.517070 }
        // console.log(req.body);
        const locationEnd = req.body.location
        const distance = (haversine(locationStart, locationEnd)/1000).toFixed(2)
        console.log(req.body.location , 'yes here');
      
        // console.log(req.files.profileImage, "ksjaihuih");
        var photos = [];
        var body = {
          ...req.body,
          distance : distance,
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
  
        tripoffices
        .create(body)
        .then((doc) => res.status(200).json({ data: doc, status: 200 }))
        .catch((err) => res.status(300).json({ error: err, status: 300 }));
      
    } catch (error) {
        
    }
}


const updateOffice = async (req, res, next) => {

  try {
    const Office = await tripoffices.findOneAndUpdate({_id : req.body._id}, req.body, { returnDocument: "after" })
    if (Office) {
      console.log(Office);
      res.status(200).json({ data: Office, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const getOffice = async (req, res, next) => {
  const {id} = req.query;

  console.log(id);
  
  try {
    const tripoffice = await tripoffices.findOne({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
    const comments = await officReviews.find({office : id}).populate("author" , "name -_id");
    const act = await activity.find({office : id})
    if (tripoffice) {
      console.log(act);
      res.status(200).json({ data:tripoffice, activities : act , reviews : comments, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};


const deleteOffice = async (req, res, next) => {
  const {id} = req.query;

  console.log(id);
  try {
    const tripoffice = await tripoffices.findOneAndDelete({ _id: id });
    if (tripoffice) {
      console.log(tripoffice);
      res.status(200).json({ data: tripoffice,message :"office deleted", reviews : comments, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};


const toggleFavouritreOffice = async (req,res,next) => {
  try {
    const {id} = req.query;
    const isOffice =  await officFavourite.findOne({ office : id , author :req.user._id })
    const body = {
      office : id,
      author: req.user._id,
    };
    console.log(isOffice);
  if(!isOffice){
    console.log("added");
    officFavourite
    .create(body)
    .then((doc) => res.json({doc}).status(200))
    .catch((err) => res.status(300).json({ error: err, status: 300 }));
    return;
  }else{
    console.log("deleted");
    officFavourite
    .findOneAndDelete({office : id, author :req.user._id})
    .then((doc) => res.json(doc))
    .catch((err) => res.status(300).json({ error: err, status: 300 }));
  }
  } catch (error) {
    console.log(error);
  }

}

const getAllFavouriteOffices = async (req,res,next)=>{
  try {
    const {page = 1 , limit = 10} = req.query;
    const allOffices = await officFavourite.find({});
  
    const links = Math.floor((allOffices.length / limit) + 1);
    const favourites = officFavourite.find({author : req.user._id}).populate("office" , "name -createdAt -updatedAt -__v ").populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').limit(limit).skip((page  - 1) * limit).populate('office').then((doc) => res.status(200).json({data:doc ,pages : links , currentPage : page , status:200}));
    return favourites;
  } catch (error) {
    console.log(error);

  }

}

module.exports = { getAllOffices, createOffice , updateOffice , getOffice , toggleFavouritreOffice , getAllFavouriteOffices , deleteOffice};
