const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kaustubhumalkar9175_db_user:ghPn7VbApULdGnRC@gofoodcluster.oyxwbfg.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=gofoodcluster";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");
    const fetched_data = mongoose.connection.db.collection("food_items");
    const fetched_category = mongoose.connection.db.collection("food_items_category");
    const fooddata = await fetched_data.find({}).toArray();
    const categorydata = await fetched_category.find({}).toArray();
    global.food_items = fooddata;
    global.food_items_category = categorydata;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = mongoDB;
