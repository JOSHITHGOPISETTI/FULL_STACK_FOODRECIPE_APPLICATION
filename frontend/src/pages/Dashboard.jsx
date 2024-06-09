import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Appbar } from "../components/Appbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
export const Dashboard = () => {
    const [recipes, setrecipes] = useState([]);
  const [filters, setfilters] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const access = searchParams.get("access");
    useEffect(() => {
        axios.get(`http://localhost:3000/${access}/dashboard?filters=` + filters)
          .then((response) => {
            setrecipes(response.data.recipe);
          });
    }, [filters]);
    return (
      <div>
        <Appbar label={access} />
        <div className="m-8">
          <Link to={`/Newrecipe?access=${access}`}>
            <button className="rounded-md text-white bg-red-400 mr-4 my-2">
              Add Recipe
            </button>
          </Link>
          <Review access={access}/>
          <div className="my-2">
            <input
              onChange={(e) => {
                setfilters(e.target.value);
              }}
              type="text"
              placeholder="Search recipes..."
              className="w-full px-2 py-1 border rounded border-slate-200"
            ></input>
          </div>
          <div className="flex overflow-y-scroll">
            {recipes.map((recipe) => (
              /*<div
                key={recipe._id}
                className="grid grid-rows-8  shadow-xl mr-15 bg-gray-400 rounded-lg h-52 w-52"
              >
                <div>
                  <img
                    className="row-span-3 mb-4 rounded-lg py-5"
                    src={recipe.imgurl}
                    alt="recipe"
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-base">{recipe.name}</h1>
                </div>
              </div>
            ))*/
              <Link to={"/Recipe/?id=" + recipe._id}>
                <Card
                  sx={{
                    maxWidth: 250,
                    marginLeft: "20px",
                    backgroundColor: "rgb(226 232 240)",
                    borderRadius: "20px",
                    border: "none",
                  }}
                  key={recipe._id}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="50"
                      image={recipe.imgurl}
                      alt="green iguana"
                      sx={{
                        paddingTop: "40px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {recipe.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
}
function Review({ access }) {
  console.log(access);
  if (access == "admin")
    return <div>
      <Link to={`/Review?access=${access}`}>
              <button className="rounded-md text-white bg-red-400 mr-4 my-2">
                Review
              </button>
      </Link>
      </div>
}