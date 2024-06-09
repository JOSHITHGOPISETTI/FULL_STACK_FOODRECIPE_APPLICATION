const express = require("express");
const router = express.Router();
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { Admin, Recipe } = require("../db");
var ObjectId = require("mongoose").Types.ObjectId;

const signupschema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email(),
  password: zod.string().startsWith('author@').min(8),
});
router.post("/signup", async (req, res) => {
  const { success } = signupschema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "invalid input",
    });
  }
  const existinguser = await Admin.findOne({
    userName: req.body.username,
  });
  if (existinguser) {
    console.log(existinguser.userName);
    return res.json({
      message: "Admin already exists",
    });
  }
  const user = await Admin.create({
    firstName: req.body.firstname,
    LastName: req.body.lastname,
    userName: req.body.username,
    password: req.body.password,
  });
  const adminID = req.body.username;
  const token = jwt.sign({ adminID }, JWT_SECRET);
  res.json({
    message: "successfully registered",
    token: token,
  });
});
const signinschema = zod.object({
  username: zod.string().email(),
  password: zod.string()
});
router.post("/signin", async (req, res) => {
  const { success } = signinschema.safeParse(req.body);
  if (!success) {
    console.log(req.body);
    return res.status(411).json({
      message: "Invalid input",
    });
  }
  const admin = await Admin.findOne({
    userName: req.body.username,
    password: req.body.password
  });
  if (!admin) {
    return res.status(411).json({
      message: "Invalid username or password",
    });
  }
  const adminID = admin.userName;
  const token = jwt.sign(
    {
      adminID,
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
router.post("/newrecipe", async (req, res) => {
  const { success } = newrecipeschema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Invalid input",
    });
  }
  const recipe = await Recipe.create({
    imgurl: req.body.imgurl,
    name: req.body.name,
    ing: req.body.ing,
    description: req.body.description,
    permit: true
  });
  return res.json({
    message: "Successfully added new recipe",
  });
});
router.get("/dashboard", async (req, res) => {
  const filters = req.query.filters || "";
  const rec = await Recipe.find({
    name: {
      $regex: filters,
    },
    permit: true,
  });
  console.log(rec);
  return res.json({
    message: "All recipes",
    recipe: rec,
  });
});
router.get("/review", async (req, res) => {
    /*const filters = req.query.filters || "";
    name: {
      $regex: filters,
    },*/
  const rec = await Recipe.find({
    permit: false
  });
  console.log(rec);
  return res.json({
    message: "permit need recipes",
    recipe: rec,
  });
});
router.put("/permit", async (req, res) => {
    const id = req.query.id;
    const oper = req.query.oper||"";
    const recipeId = new ObjectId(id);
    console.log(id);
    if (oper == "allow") {
      const recip = await Recipe.findByIdAndUpdate(
        {
          _id: recipeId,
        },
        {
          permit: true,
        }
      );
      return res.json({
        message: "successfully updated",
      });   
    }
    if (oper == "delete")
    {
       const recip=await Recipe.findByIdAndDelete({
          _id: recipeId
       });
        return res.json({
            message: "Recipe deleted successfully"
        });
    }
})
module.exports = router;

