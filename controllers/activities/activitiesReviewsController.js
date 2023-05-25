const activityreview = require('../../models/activities/activitiesReviews')



const getAllReviews = async (req,res,next)=>{
    try {
        const allReviews = await activityreview.find({}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
        if (allReviews) {
          console.log(allReviews);
          res.status(200).json({ data: allReviews, status: 200 });
        }
      } catch (error) {
        res.status(300).json({ data: error, status: 300 });
      }
}


const getActivityReviews = async (req,res,next)=>{
  const {activity , page = 1 , limit = 10,type,size} = req.query;

  // var query = new Object();
  // if(activity) query.activity = {
  //   activity : activity
  // };  

  try {
    pages=[];

    const reviewCounter = await activityreview.find({activity : activity}).count({});
    const links = Math.floor((reviewCounter / limit) + 1);
    for(let i = 1; i<=links;i++){
      pages.push(i)
    }
      const allReviews = await activityreview.find({activity : activity}).populate("author" , "name -_id").limit(limit).skip((page  - 1) * limit)
      if (allReviews) {
        res.status(200).json({pages : pages,currentPage : page , data: allReviews, status: 200 });
      }
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
}

const deleteActivityReviews = async (req,res,next)=>{
  const {activity} = req.query;

 
  try {
      const allReviews = await activityreview.findOneAndDelete({_id : activity})
        res.status(200).json({ data: allReviews,message:"review deleted" , status: 200 });
      
    } catch (error) {
      res.status(300).json({ data: error, status: 300 });
    }
}


const createReview = (req, res) => {
  try {
     console.log(req.body);
     activityreview.create({author : req.user._id, ...req.body}).then((doc) => res.status(200).json({ data: doc, status: 200 })).catch((err) => res.status(300).json({ error: err, status: 300 }));

  } catch (error) {
    throw error(error)
  }
 
}



module.exports = { getAllReviews ,deleteActivityReviews, createReview,getActivityReviews};
