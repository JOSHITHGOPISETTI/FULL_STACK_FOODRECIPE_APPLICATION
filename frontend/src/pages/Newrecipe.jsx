import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export const Newrecipe = () =>
{
    const [imgurl, setimgurl] = useState("");
    const [name, setname] = useState("");
    const [ing, seting] = useState("");
    const [description, setdescription] = useState("");
    const [flag, setflag] = useState("1");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const access = searchParams.get("access");
    return (
      <div className="  h-screen">
        <div className="my-20 mx-5 block w-90%">
          <input
            onChange={(e) => {
              setimgurl(e.target.value);
            }}
            placeholder="Image Url"
            className="w-full px-2 py-1 border rounded text-lg font-medium italic bg-slate-300"
          />
        </div>
        <div className="my-20 mx-5 block w-90%">
          <input
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Recipe Name"
            className="w-full px-2 py-1 border rounded text-lg font-medium italic bg-slate-300"
          />
        </div>
        <div className="my-20 mx-5 h-40 block w-90%">
          <textarea
            onChange={(e) => {
              seting(e.target.value);
            }}
            placeholder="Ingerdiants"
            className="w-full px-2 py-1 border h-full text-start rounded text-lg font-medium italic bg-slate-300 overflow-y-scroll"
          ></textarea>
        </div>
        <div className="my-20 mx-5 h-40 block w-90%">
          <textarea
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            placeholder="Description"
            className="w-full px-2 py-1 h-full border rounded text-lg font-medium italic bg-slate-300 overflow-y-scroll"
          ></textarea>
        </div>
            <button /*onClick={(e) => {
                e.preventDefault()
                setflag(flag + 1)
            }} */
                onClick={async () => {
                    const response = await axios.post(
                        `http://localhost:3000/${access}/newrecipe`,
                        {
                            imgurl,
                            name,
                            ing,
                            description,
                        }
                    );
                    console.log(response.data.message);
                    navigate(`/Dashboard?access=${access}`);
                }}
                
                    className = "rounded-md  ml-96  h-10 w-20 text-white bg-red-400" >
          Add
        </button>
      </div>
    );
}