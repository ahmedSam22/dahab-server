const questions = require("../models/security-question");


const addQuestion = (req, res) => questions.create(req.body).then((doc) => res.status(200).json({ data: doc, status: 200 })).catch((err) => res.status(300).json({ error: err, status: 300 }));


const getQuestions = async (req,res,next)=>{
    try {
        const allQuestions = await questions.find({});
        if(allQuestions){
            console.log(allQuestions);
            res.status(200).json({data:allQuestions,status:200})
        }
    } catch (error) {
        res.status(300).json({data:error,status:300})
    }
    
}


const deleteQuestion = async (req, res, next) => {
    const query = { _id: req.body._id };
  
    questions.findOneAndDelete(query)
      .then((result) => {
        next("success");
        res.status(200).json({ data: result });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

module.exports = {addQuestion , getQuestions , deleteQuestion}