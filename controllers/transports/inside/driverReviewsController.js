const driverReviews = require("../../../models/transports/inside/driverReviewsModel");



const getAllDriverReviews = async (req,res,next)=>{
    try {
        const allReviews = await driverReviews.find({}).populate("driver" , "name contactnumber").populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
        if (allReviews) {
          console.log(allReviews);
          res.status(200).json({ data: allReviews, status: 200 });
        }
      } catch (error) {
        res.status(300).json({ data: error, status: 300 });
      }
}


const getDriverReviews = async (req,res,next)=>{
  const {id , page = 1 , limit = 10,type,size} = req.query;

  // var query = new Object();
  // if(hotel) query.hotel = {
  //   hotel : hotel
  // };  

  try {
    pages=[];

    const driverReviewsCounter = await driverReviews.find({driver : id}).count({});
    const links = Math.floor((driverReviewsCounter / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }
      const allReviews = await driverReviews.find({driver : id}).populate("driver" , "name contactnumber").populate("author" , "name -_id").limit(limit).skip((page  - 1) * limit)
      if (allReviews) {
        res.status(200).json({pages : pages,currentPage : page , data: allReviews, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
}


const createDriverReview = (req, res) => {
  try {
     console.log(req.body);
     driverReviews.create({author : req.user._id, ...req.body}).then((doc) => res.status(200).json({ data: doc, status: 200 })).catch((err) => res.status(300).json({ error: err, status: 300 }));

  } catch (error) {
    throw error(error)
  }
 
}

const deleteReview = async (req, res, next) => {
  const {id} = req.query;

  console.log(id);
  try {
    const reviewDriver = await driverReviews.findOneAndDelete({ _id: id });
    if (reviewDriver) {
      console.log(reviewDriver);
      res.status(200).json({ data: reviewDriver, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};



module.exports = { getAllDriverReviews , createDriverReview,getDriverReviews , deleteReview};