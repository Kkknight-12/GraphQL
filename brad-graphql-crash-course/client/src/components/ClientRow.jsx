import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    // update cache by settin data to the response of deleteClient
    update(cache, { data: { deleteClient } }) {
      // take the clients data from the cache
      // which we will use to iterate with filter method
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      // overwrite the cache data
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          // over write the clients data by only considering those id which
          // are note deleted
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        {
          <button className={"btn btn-danger btn-sm"} onClick={deleteClient}>
            <FaTrash />
          </button>
        }
      </td>
    </tr>
  );
}

export default ClientRow;