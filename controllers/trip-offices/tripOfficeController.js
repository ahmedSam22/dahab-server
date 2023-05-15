const tripoffices = require('../../models/trip-offices/tripOfficesModel');
const haversine = require('haversine-distance');


const getAllOffices = async(req , res,next) =>{



    pages=[];

    const {page = 1 , limit = 10,type,size} = req.query;
      var query = new Object();
      if(type) query.type = type;

   console.log(query);
    try {
            const countedOffices = tripoffices.find({}).count({})
            const links = Math.floor((countedOffices / limit) + 1);
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
            const offices = await tripoffices.find({}).limit(limit).skip((page  - 1) * limit)
         
            res.status(200).json({ pages : pages,currentPage : page , data: offices, status: 200 });
             } catch (error) {
               console.log(error);
             }
            

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



module.exports = { getAllOffices, createOffice  };
