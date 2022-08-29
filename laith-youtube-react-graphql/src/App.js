import CharactersList from "./pages/CharactersList";
import { Routes, Route } from "react-router-dom";
import Character from "./pages/Character";
import Search from "./pages/Search";
import MutationCreateProduct from "./pages/Mutation-createProduct";

function App() {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px",
      }}
    >
      <Routes>
        <Route path={"/"} element={<CharactersList />} />
        <Route path={"/:id"} element={<Character />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/create"} element={<MutationCreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;