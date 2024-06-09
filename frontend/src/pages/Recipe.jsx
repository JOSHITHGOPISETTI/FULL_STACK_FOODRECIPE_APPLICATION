import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
export const Recipe = () => {
    const [Recipe, setRecipe] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    console.log(id);
    useEffect( () => {
      axios.get("http://localhost:3000/user?id=" + id).then((response) => {
        setRecipe(response.data.recipe);
        
      });
    }, [id]);
    return (
      <div className="h-screen w-full overflow-y-scroll">
        <div className="flex justify-center items-center py-5">
          <img
            className=" h-48 w-48 rounded-lg"
            src={Recipe.imgurl}
            alt="recipe"
          />
        </div>
        <div className="flex justify-center items-center py-5">
          <h1 className="font-semibold text-base block text-xl">
            {Recipe.name}
          </h1>
        </div>
        <div className="flex justify-center items-center py-5 px-5">
          <h3 className="font-semibold text-base italic text-lg">
            {Recipe.ing}
          </h3>
        </div>
        <div className="px-5">
          <p className="italic text-lg">{Recipe.description}</p>
        </div>
      </div>
    );

}