const express = require("express");
const router = express.Router();
const zod = require("zod");
const { JWT_SECRET }= require("../config");
const jwt = require('jsonwebtoken');
const { User, Recipe } = require("../db");
var ObjectId = require("mongoose").Types.ObjectId; 

const signupschema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(8)
});
router.post('/signup', async(req, res) => {
  const { success } = signupschema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "invalid input"
    })
  }
  const existinguser = await User.findOne({
    userName: req.body.username
  });
  if (existinguser) {
    console.log(existinguser.userName);
    return res.json({
      message: "user already exists"
    })
  }
  const user = await User.create({
     firstName: req.body.firstname,
     LastName: req.body.lastname,
     userName: req.body.username,
     password: req.body.password
   });
  const userID = req.body.username;
  const token = jwt.sign({ userID }, JWT_SECRET);
  res.json({
    message: "successfully registered",
    token: token
  });
});
const signinschema = zod.object({
    username: zod.string().email(),
    password:zod.string()
})
router.post("/signin", async (req, res) => {
  const { success } = signinschema.safeParse(req.body);
    if (!success) {
        console.log(req.body);
        return res.status(411).json({
        message: "Invalid input"
    });
  }
  const user = await User.findOne({
    userName: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Invalid username or password",
    });
  }
  const userID = user.userName;
  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET
  );
  return res.json({
    message: "Login successful",
    token: token,
  });
});
const newrecipeschema = zod.object({
  imgurl: zod.string(),
  name: zod.string(),
  ing: zod.string(),
  description: zod.string(),
});
router.post('/newrecipe', async (req, res) => {
  const { success } = newrecipeschema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Invalid input"
    });
  }
  const recipe = await Recipe.create({
    imgurl: req.body.imgurl,
    name: req.body.name,
    ing: req.body.ing,
    description: req.body.description,
  });
  return res.json({
    message: "Successfully added new recipe"
  });
});
router.get('/dashboard', async (req, res) => {
  const filters = req.query.filters || "";
  const rec = await Recipe.find({
    name: {
      $regex: filters
    },
    permit:true
  });
  console.log(rec);
  return res.json({
    message: "All recipes",
    recipe: rec
  });
});
router.get('/', async (req, res) => {
  const id = req.query.id||"";
  const recipeId = new ObjectId(id);
  console.log(id);
  const recip = await Recipe.findById({
    _id:recipeId
  });
  return res.json({
    message: "successfully getted",
    recipe: recip
  });
  })
module.exports = router;
