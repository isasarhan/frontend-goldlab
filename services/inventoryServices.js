import axios from "axios";

const mainURL = "https://gold-lab-backend.onrender.com/api/inventory/main/";

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
    .put(mainURL, inventory)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
