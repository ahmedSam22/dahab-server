const mongoose = require("mongoose");

const favouritActivityModel = new mongoose.Schema({
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
});

const FavouriteActivity = mongoose.model("FavouriteActivity", favouritActivityModel);

module.exports = FavouriteActivity;
