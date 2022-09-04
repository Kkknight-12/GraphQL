import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// components
import Header from "./components/Header";
import HomePage from "./pages/homepage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Project from "./pages/projectdetail/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// setting up Apollo queries
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/project/:id"} element={<Project />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;