import { useState } from "react";
import { Inputbox } from "../components/Inputbox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
export const Signin = () => {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const access = searchParams.get('access');
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
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
                  `http://localhost:3000/${access}/signin`,
                  {
                    username,
                    password,
                  }
                );

                localStorage.setItem("token", response.data.token);
                console.log(response.data.message);
                navigate(`/Dashboard?access=${access}`);
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"New to Here?"}
            buttonText={"Sign up"}
            to={`/Signup?access=${access}`}
          />
        </div>
      </div>
    </div>
  );
};
