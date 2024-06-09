import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Recipe } from "./pages/Recipe";
import { Newrecipe } from "./pages/Newrecipe";
import { Review } from "./pages/Review";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Recipe" element={<Recipe />} />
        <Route path="/Newrecipe" element={<Newrecipe />} />
        <Route path="/Review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
