import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_CHARACTER_LOCATIONS = gql`
  query GetCharacterLocations($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          name
        }
      }
    }
  }
`;

function Search(props) {
  const [name, setName] = useState("");
  const [getLocations, { loading, error, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATIONS,
    {
      variables: {
        name,
      },
    }
  );
  console.log("data", data);

  return (
    <div>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => getLocations()}>Search</button>
      {loading && <div>Spinner...</div>}
      {error && <div>Something went wrong....</div>}
      {data && (
        <div style={{ marginTop: "15px" }}>
          {data.characters.results.map((character) => {
            return (
              <div key={character.location.name}>
                <li>{character.location.name}</li>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;