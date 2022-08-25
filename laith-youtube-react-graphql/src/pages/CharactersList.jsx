import { useCharacters } from "../hooks/useCharacters";
import { Link } from "react-router-dom";

// --------------------------------------------------------------------------------------

function CharactersList(props) {
  const { data, error, loading } = useCharacters();

  console.log("data", data);

  if (loading)
    return (
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading........
      </h2>
    );

  if (error) return <div>Error...!</div>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {data?.characters?.results?.map((character) => {
        return (
          <Link to={`${character.id}`} key={character.name}>
            <div style={{ marginLeft: "5px" }}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default CharactersList;