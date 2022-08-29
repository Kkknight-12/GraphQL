import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $quantityPerUnit: String!) {
    createProduct(record: { name: $name, quantityPerUnit: $quantityPerUnit }) {
      record {
        name
      }
    }
  }
`;

function MutationCreateProduct(props) {
  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        name: "hotdog",
        quantityPerUnit: "4",
      },
    }
  );

  console.log(data);
  return (
    <div>
      <button onClick={() => createProduct()}>Create Products</button>
    </div>
  );
}

export default MutationCreateProduct;