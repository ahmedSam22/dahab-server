const reviews = require("../models/hotels/reviewsModel");



const getAllReviews = async (req,res,next)=>{
    try {
        const allReviews = await reviews.find({}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
        if (allReviews) {
          console.log(allReviews);
          res.status(200).json({ data: allReviews, status: 200 });
        }
      } catch (error) {
        res.status(300).json({ data: error, status: 300 });
      }
}


const getHotelReviews = async (req,res,next)=>{
  const {hotel , page = 1 , limit = 10,type,size} = req.query;

  // var query = new Object();
  // if(hotel) query.hotel = {
  //   hotel : hotel
  // };  

  try {
    pages=[];

    const reviewCounter = await reviews.find({hotel : hotel}).count({});
    const links = Math.floor((reviewCounter / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }
      const allReviews = await reviews.find({hotel : hotel}).populate("author" , "name -_id").limit(limit).skip((page  - 1) * limit)
      if (allReviews) {
        res.status(200).json({pages : pages,currentPage : page , data: allReviews, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
}


const createReview = (req, res) => {
  try {
     console.log(req.body);
  reviews.create({author : req.user._id, ...req.body}).then((doc) => res.status(200).json({ data: doc, status: 200 })).catch((err) => res.status(300).json({ error: err, status: 300 }));

  } catch (error) {
    throw error(error)
  }
 
}



module.exports = { getAllReviews , createReview,getHotelReviews};
