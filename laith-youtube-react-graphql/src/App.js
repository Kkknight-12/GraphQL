import CharactersList from "./pages/CharactersList";
import { Routes, Route, Link } from "react-router-dom";
import Character from "./pages/Character";

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
      </Routes>
    </div>
  );
}

export default App;