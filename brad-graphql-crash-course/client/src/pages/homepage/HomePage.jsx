import React from "react";
import { Clients, Projects } from "./index";
import AddClientModal from "../../components/AddClientModal";
import AddProjectModal from "../../components/AddProjectModel";

function HomePage(props) {
  return (
    <div>
      <div className={"d-flex gap-3 mb-4"}>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </div>
  );
}

export default HomePage;