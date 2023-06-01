const drivers = require("../../../models/transports/inside/driverModel")
const haversine = require('haversine-distance');
const driverReviews = require("../../../models/transports/inside/driverReviewsModel")



const getAllDrivers = async(req , res,next) =>{



    pages=[];

    const {page = 1 , limit = 10,type,size} = req.query;

    try {
      const allDrivers = await drivers.find({}).populate("author" , "name -_id").limit(limit).skip((page  - 1) * limit)
      const links = Math.floor((allDrivers.length / limit) + 1);
      for(let i = 1; i<=links;i++){
        pages.push(i)
      }
      res.status(200).json({ pages : pages,currentPage : page , data: allDrivers, status: 200 });

    } catch (error) {
        res.status(300).json({ data: error, status: 300 });
    }
}

const createDriver = async(req,res,next) =>{
    try {
        const locationStart = { lat: 28.495297, lng: 34.517070 }
        // console.log(req.body);
        const locationEnd = req.body.location
        const distance = (haversine(locationStart, locationEnd)/1000).toFixed(2)
        console.log(req.body.location , 'yes here');
      
        // console.log(req.files.profileImage, "ksjaihuih");
        var photos = [];
        var driverimages = [];
        var body = {
            ...req.body,
            distance : distance,
            author : req.user._id
        }
        console.log(distance , ";lpdokjihuaygstfcgyahusi");

        if (req.files.photos) {
          for (let i = 0; i < req.files.photos.length; i++) {
            photos[i] = {
              path: req.files.photos[i].path,
            };
          }
          body.photos = photos
      
      
        } 


        if (req.files.driverimage) {
            for (let i = 0; i < req.files.driverimage.length; i++) {
                driverimages[i] = {
                path: req.files.driverimage[i].path,
              };
            }
            body.driverimage = driverimages
        
        
          } 


        
  console.log("dsadasdasdasdasdasdaqqwewqqw");
        drivers
        .create(body)
        .then((doc) => res.status(200).json({ data: doc, status: 200 }))
        .catch((err) => res.status(300).json({ error: err, status: 300 }));
      
    } catch (error) {
        
    }
}


const updateDriver = async (req, res, next) => {
  try {
    const driver = await drivers.findOneAndUpdate({_id : req.body.id}, req.body, { returnDocument: "after" })
    console.log(driver);

    if (driver) {
      res.status(200).json({ data: driver, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const getDriver = async (req, res, next) => {
  const {id} = req.query;

  console.log(id);
  
  try {
    const driver = await drivers.findOne({ _id: id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion');
    const comments = await driverReviews.find({driver : id}).populate("author" , "name -_id").populate("driver" , "-_id -__v");
    if (driver) {
    console.log(driver);

      res.status(200).json({ data:driver, reviews : comments, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};


const deleteDriver = async (req, res, next) => {
  const {id} = req.query;

  console.log(id);
  try {
    const driver = await drivers.findOneAndDelete({ _id: id });
    if (driver) {
      console.log(driver);
      res.status(200).json({ data: driver,message :"driver deleted", status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};




module.exports = { getAllDrivers, createDriver , updateDriver , getDriver  , deleteDriver};
