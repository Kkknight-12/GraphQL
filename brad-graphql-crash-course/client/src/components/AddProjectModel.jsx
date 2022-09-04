import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";

function AddProjectModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // getClients  -> all clients
  const { loading, error, data } = useQuery(GET_CLIENTS);

  // mutation
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      clientId,
      status,
    },
    update(cache, { data: { addProject } }) {
      // get data from cache getClient
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });

      // re-write cache
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please" + " fill in all fields");
    }

    addProject(name, description, clientId, status).then(
      () => setDescription(""),
      setStatus("new"),
      setName(""),
      setClientId("")
    );
  };

  if (loading) return null;

  if (error) return "Something went wrong...";

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className={"d-flex align-items-center"}>
          <FaList className={"icon"} />
          <div>new Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        aria-labelledby="addProjectLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectLabel">
                New Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className={"form-label"}>
                    Name
                  </label>
                  <input
                    type="text"
                    className={"form-control"}
                    id={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className={"form-label"}>
                    Description
                  </label>
                  <textarea
                    className={"form-control"}
                    id={"description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className={"form-label"}>
                    Status
                  </label>
                  <select
                    className={"form-select"}
                    id={"status"}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={"new"}>Not Started</option>
                    <option value={"progress"}>In Progress</option>
                    <option value={"completed"}>Completed</option>
                  </select>
                </div>

                {/*Clients*/}
                <div className="mb-3">
                  <label className={"form-label"}>Client</label>
                  <select
                    id={"clientId"}
                    className={"form-select"}
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value={""}>Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type={"submit"}
                  className={"btn btn-secondary"}
                  data-bs-dismiss={"modal"}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProjectModal;