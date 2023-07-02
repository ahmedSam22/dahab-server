const mongoose = require("mongoose");

const favouriteOfficesModel = new mongoose.Schema({
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tripoffice'
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
});

const FavouriteOffices = mongoose.model("FavOffice", favouriteOfficesModel);

module.exports = FavouriteOffices;
