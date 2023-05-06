const reviews = require("../models/reviewsModel");



const getAllReviews = async (req,res,next)=>{
    try {
        const allReviews = await reviews.find({}).populate('author' , 'name -_id').populate('hotel');
        if (allReviews) {
          console.log(allReviews);
          res.status(200).json({ data: allReviews, status: 200 });
        }
      } catch (error) {
        res.status(300).json({ data: error, status: 300 });
      }
}

const createReview = (req, res) => {
  try {
     console.log(req.body);
  reviews.create(req.body).then((doc) => res.status(200).json({ data: doc, status: 200 })).catch((err) => res.status(300).json({ error: err, status: 300 }));

  } catch (error) {
    throw error(error)
  }
 
}



module.exports = { getAllReviews , createReview};
