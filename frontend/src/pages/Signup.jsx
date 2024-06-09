import { useState } from "react";
import { Inputbox } from "../components/Inputbox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
export const Signup = () => {
    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const access = searchParams.get("access");
    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <Inputbox
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              placeholder="John"
              label={"First Name"}
            />
            <Inputbox
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              placeholder="Doe"
              label={"Last Name"}
            />
            <Inputbox
              onChange={(e) => {
                setusername(e.target.value);
              }}
              placeholder="harkirat@gmail.com"
              label={"userName"}
            />
            <Inputbox
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="123456"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    `http://localhost:3000/${access}/signup`,
                    {
                      firstname,
                      lastname,
                      username,
                      password,
                    }
                  );

                  localStorage.setItem("token", response.data.token);
                  console.log(response.data.message);
                  navigate(`/Dashboard?access=${access}`);
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={`/Signin?access=${access}`}
            />
          </div>
        </div>
      </div>
    );
};
