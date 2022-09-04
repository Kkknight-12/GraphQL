import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

function AddClientModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // mutation
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update(cache, { data: { addClient } }) {
      // get data from cache getClient
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });

      // re-write cache
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please" + " fill in all fields");
    }

    addClient(name, email, phone).then(
      () => setEmail(""),
      setPhone(""),
      setName("")
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className={"d-flex align-items-center"}>
          <FaUser className={"icon"} />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModal">
                Add Client
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
                    Email
                  </label>
                  <input
                    type="email"
                    className={"form-control"}
                    id={"name"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className={"form-label"}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={"form-control"}
                    id={"name"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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

export default AddClientModal;