import useCharacter from "../hooks/useCharacter";
import { useNavigate, useParams } from "react-router";

function Character() {
  const { id } = useParams();
  const history = useNavigate();
  const { error, data, loading } = useCharacter(id);

  const goBack = () => {
    history("/");
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error, no matching id found...!</h1>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <button
        onClick={goBack}
        style={{
          display: "inline-block",
          height: "20px",
          position: "absolute",
          left: 10,
          top: 10,
        }}
      >
        Go back
      </button>
      <div
        style={{
          marginTop: "80px",
          maxWidth: "400px",
        }}
      >
        <img
          src={data.character.image}
          width={"100%"}
          alt={data.character.name}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "4rem",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0", marginTop: "20px" }}>
          {data.character.name}
        </h1>
        <p>{data.character.gender}</p>
        <div>
          {data.character.episode.map((data) => {
            return (
              <div key={data.name} style={{ marginTop: "0.8rem" }}>
                {data.name} - <b>{data.episode}</b>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Character;