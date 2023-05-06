const Sections = require("../models/sectionsModel");


const createSection = (req, res , next) =>{

  try {
      console.log(req.file.path);

if(req.file.path){
  Sections.create({...req.body , photo : req.file.path}).then((doc) => res.status(200).json({ data: doc, status: 200 }))
  .catch((err) => res.status(300).json({ error: err, status: 300 }));
}else{ 
  Sections.create(req.body).then((doc) => res.status(200).json({ data: doc, status: 200 }))
  .catch((err) => res.status(300).json({ error: err, status: 300 }));
}
    // Sections.create({...req.body , photo : req.file.path})
  } catch (error) {
    throw error(error)
  }

  }

const getSections = async (req, res, next) => {
  try {
    const allSections = await Sections.find({});
    if (allSections) {
      console.log(allSections);
      res.status(200).json({ data: allSections, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};



const updateSection = async (req, res, next) => {

try {
    // const user = await users.findOne({nationalID}).exec();
  const query = { _id: req.body._id };

  const updated = Sections.findOneAndUpdate(query, req.body)
    .then((result) => {
      next("success");
      res.status(200).json({ data: result });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(updated);
} catch (error) {
  throw error(error)
}


};

const deleteSection = async (req, res, next) => {


  try {
      const query = { _id: req.body._id };

  const updated = Sections.findOneAndDelete(query)
    .then((result) => {
      next("success");
      res.status(200).json({ data: result });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(updated);
  } catch (error) {
    throw error(error)
  }

};

module.exports = { getSections, createSection, updateSection, deleteSection };
