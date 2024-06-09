import { useNavigate } from "react-router-dom";
export const Home=() => {
    const navigate = useNavigate();
    return (
      <div>
        <div className="flex justify-center items-center bg-slate-300 min-h-screen min-w-full">
          <button
            className="h-30 w-24 text-yellow-50  rounded-lg bg-slate-700"
            onClick={() => {
              navigate("/Signup?access=user");
            }}
          >
            User
          </button>
          <button
            className="h-30 w-24 ml-40 text-yellow-50 rounded-lg bg-slate-700"
            onClick={() => {
              navigate("/Signup?access=admin");
            }}
          >
            Admin
          </button>
        </div>
      </div>
    );
}