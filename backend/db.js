const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/receipe');
mongoose.connect("mongodb://0.0.0.0:27017/receipe")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
const UserSchema = new mongoose.Schema({
    firstName:String,
    LastName: String,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const AdminSchema = new mongoose.Schema({
    firstName: String,
    LastName: String,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const RecipeSchema = new mongoose.Schema({
  imgurl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ing: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permit: {
    type: Boolean,
    default: false
  }
});
const User = mongoose.model('User', UserSchema);
const Admin=mongoose.model('Admin', AdminSchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports =
{
    User,
    Admin,
    Recipe
}