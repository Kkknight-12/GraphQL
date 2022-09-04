# Laith React 4

[React With GraphQL (Apollo Client) Crash Course](https://www.youtube.com/watch?v=gAbIQx26wSI&t=2443s)

pwd

```jsx
/Users/knight/FrontEnd_Projects/GraphQl/laith-youtube-react-graphql
```

API used

```jsx
https://rickandmortyapi.com/graphql
```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  **ApolloClient,
  InMemoryCache,
  ApolloProvider,**
} from "@apollo/client";

const client = new **ApolloClient**({                 // 1
  uri: "https://rickandmortyapi.com/graphql",    // 2
  cache: new **InMemoryCache**(),                      // 3
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <**ApolloProvider** client={client}>
      <App />
    </**ApolloProvider**>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

 Using **ApolloClient (1)** to create ****our base **url (2)**  where we would like to fetch data from. It takes 2 parameter `uri: '' , cache:`

- once made query, graphql memories it. so time we make same query instead of hitting graphql server we can get data from **cache(3)**.

### Get Data From Graphql server

for convienence create a custom hook which will do the job for us

- create a query with **gql** ` ` , for making query we write **query** keyword
- use **useQuery** hook from graphql to fetch the data
- return the data to be used by components

```jsx
import { **useQuery**, **gql** } from "@apollo/client";

// --------------------------------------------------------------------------------------

const GET_CHARACTERS = **gql**`
  **query** {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export const useCharacters = () => {

  const { data, error, loading } = **useQuery**(GET_CHARACTERS);
  return {
    data,
    error,
    loading,
  };

};
```

```jsx
import React from "react";

import { useCharacters } from "../hooks/useCharacter";

// --------------------------------------------------------------------------------------

function CharactersList(props) {

  const { data, error, loading } = **useCharacters**();

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
          <div key={character.name}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CharactersList;
```

### make specific query →:id

```jsx
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_CHARACTER = gql`
  **query** GetCharacter(**$id**: **ID!**) {    // ID is a special type ! says its neccessary to pass id
    character(**id**: **$id**) {
      name
      id
      image
      episode {
        name
        episode
      }
    }
  }
`;

function Character(id) {
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    **variables**: {
      **id**,
    },
  });

  return {
    data,
    error,
    loading,
  };
}

export default Character;
```

apollo examples

- 1
    
    [Queries](https://www.apollographql.com/docs/react/data/queries/#options)
    
    ```jsx
    const GET_DOG_PHOTO = gql`
      query Dog($breed: String!) {
        dog(breed: $breed) {
          id
          displayImage
        }
      }
    `;
    
    function DogPhoto({ breed }) {
      const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables: { breed },
      });
    
      if (loading) return null;
      if (error) return `Error! ${error}`;
    
      return (
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      );
    }
    ```
    
- 2
    
    [Hooks](https://www.apollographql.com/docs/react/api/react/hooks)
    
    ```jsx
    import { gql, useQuery } from '@apollo/client';
    
    const GET_GREETING = gql`
      query GetGreeting($language: String!) {
        greeting(language: $language) {
          message
        }
      }
    `;
    
    function Hello() {
      const { loading, error, data } = useQuery(GET_GREETING, {
        variables: { language: 'english' },
      });
      if (loading) return <p>Loading ...</p>;
      return <h1>Hello {data.greeting.message}!</h1>;
    }
    ```
    

### Lazy Query

usefull when we want to perform search query

find Explanation in OneNote ⇒ GraphQL/lazyQuery

```jsx
import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_CHARACTER_LOCATIONS = gql`
  **query** GetCharacterLocations($name: String!) {
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
    </div>
  );
}

export default Search;
```

### Mutation

```jsx
https://graphql-compose.herokuapp.com/northwind/
```

mutation query to Create ⇒ POST request

```jsx
**mutation**{
  createProduct(record:{
    name: "Hot Beach",
    supplierID:1,
    productID: 123.3123,
    categoryID:123321,
  }){
    record{name} // data that we want to get 
  }
}
```

response

```jsx
{
  "data": {
    "createProduct": {
      "record": {
        "name": "Hot Beach"
      }
    }
  },
  "extensions": {
    "complexity": 3,
    "maxComplexity": 10000
  }
}
```