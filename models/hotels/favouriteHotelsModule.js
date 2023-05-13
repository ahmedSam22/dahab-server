const mongoose = require("mongoose");

const favouriteHotelsModel = new mongoose.Schema({
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
});

const FavouriteHotels = mongoose.model("FavHotel", favouriteHotelsModel);

module.exports = FavouriteHotels;
