import axios from "axios";

const mainURL = "http://localhost:4000/api/inventory/main/";
const baseURL = "http://localhost:4000/api/inventory/";

export const getMainInventory = async () => {
  return await axios
    .get(mainURL)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateMainInventory = async (inventory) => {
  return await axios
    .put(mainURL, inventory)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateInventory = async (inventory) => {
  return await axios
    .put(baseURL, inventory)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
