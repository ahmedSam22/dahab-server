const hotels = require("../models/hotelsModel");
const haversine = require('haversine-distance')
const favouriteHotels = require('../models/favouriteHotelsModule');
const { query } = require("express");

const getAllHotels = async (req, res, next) => {
  // console.log(req.headers.authorization, "okiouyguui");
    pages=[];



 const {page = 1 , limit = 10,type,size , startPrice = 10 , endPrice = 20000} = req.query;
   var query = new Object();
   if(type) query.type = type;
   if(startPrice) query.$and = [{"price.price" :  {$gte : startPrice}} ];  
   if(endPrice) query.$and = [{"price.price" :  {$gte : startPrice , $lte : endPrice }} ]
console.log(query);


  try {
    const allHotels = await hotels.find(query).count({});
    const links = Math.floor((allHotels / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }
    try {
       if(req.headers?.authorization){
      const Hotels = await hotels.find(query).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments").limit(limit).skip((page  - 1) * limit)

      const favs = await favouriteHotels.find({author : req.user._id}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');


      // console.log(favs);
      res.status(200).json({ pages : pages,currentPage : page , data: Hotels,favs:favs, status: 200 });
    }else{
      const Hotels = await hotels.find({}).limit(limit).skip((page  - 1) * limit)

      res.status(200).json({ pages : pages,currentPage : page , data: Hotels, status: 200 });

    }
    } catch (error) {
      console.log(error);
    }
   

    if (allHotels) {
 
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const getHotel = async (req, res, next) => {
  const {id} = req.query;
  console.log(id);
  try {
    const Hotel = await hotels.findOne({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments");
    if (Hotel) {
      console.log(Hotel);
      res.status(200).json({ data: Hotel, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const updateHotel = async (req, res, next) => {
  console.log(req.body , "ikuyhygufguh");

  try {
    const Hotel = await hotels.findOneAndUpdate(req.body._id, req.body, { returnDocument: "after" })
    if (Hotel) {
      console.log(Hotel);
      res.status(200).json({ data: Hotel, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};


const createHotel = (req, res, next) => {

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
    if (req.files.profileImage) {
      body.profileImage = req.files.profileImage[0].path
    } 
    hotels
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
    const isHotel =  await favouriteHotels.findOne({ hotel_id : id , author :req.user._id })
    const body = {
      hotel_id : id,
      author: req.user._id,
    };
    console.log(isHotel);
  if(!isHotel){
    console.log("added");
   favouriteHotels
    .create(body)
    .then((doc) => res.json({doc}).status(200))
    .catch((err) => res.status(300).json({ error: err, status: 300 }));
    return;
  }else{
    console.log("deleted");
    favouriteHotels
    .findOneAndDelete({hotel_id : id, author :req.user._id})
    .then((doc) => res.json(doc))
    .catch((err) => res.status(300).json({ error: err, status: 300 }));
  }
  } catch (error) {
    console.log(error);
  }

}


// const filteredHotels = async (req,res,next) => {
//   const {page = 1 , limit = 10 ,type,size , startPrice = 0 , endPrice } = req.query;
//    pages=[];
//      var query = new Object();
//     if(type) query.type = type;
//     if(startPrice) query.$and = [{"price.price" :  {$gte : startPrice}} ];

//     if(endPrice) query.$and = [{"price.price" :  {$gte : startPrice , $lte : endPrice}} ];
//    try {
  
//     console.log(query , "uj8aiu8aiu");
//     const allHotels = await hotels.find(query).count();
//     const links = Math.floor((allHotels / limit) + 1);
//     for(let i = 1; i<=links;i++){
//       pages.push(i)
//     }
//     const Hotels = await hotels.find(query).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments").limit(limit).skip((page  - 1) * limit)
//     if (allHotels) {
//       console.log(allHotels);
//       res.status(200).json({ pages : pages,currentPage : page , data: Hotels, status: 200 });
//     }
//   } catch (error) {
//     console.log("fe eih");
//     res.status(300).json({ data: error, status: 300 });
//   }
// }


const getAllFavouriteHoterls = async (req,res,next)=>{
  try {
    const {page = 1 , limit = 10} = req.query;
    const allHotels = await favouriteHotels.find({});
  
    const links = Math.floor((allHotels.length / limit) + 1);
    const favourites = favouriteHotels.find({author : req.user._id}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').limit(limit).skip((page  - 1) * limit).populate('hotel_id').then((doc) => res.status(200).json({data:doc ,pages : links , currentPage : page , status:200}));
    return favourites;
  } catch (error) {
    throw error(error)
  }

}
const getDistance = (req,res,next)=>{
  try {
      const a = { lat: 37.8136, lng: 144.9631 }
  const b = { lat: 33.8650, lon: 151.2094 }
console.log(haversine(a, b)/1000)
  } catch (error) {
    throw error(error)
  }


}
module.exports = { getAllHotels, getHotel , updateHotel , createHotel , getDistance , toggleFavouritre,getAllFavouriteHoterls };
