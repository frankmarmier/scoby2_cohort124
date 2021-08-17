const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");

const Item = require("../models/Item");
const User = require("../models/User");

const items = [
  {
    name: "Plant Name",
    description: "A beautiful Plant",
    category: "Plant",
    quantity: 3,
    location: {
      coordinates: [48.8566, 2.3522],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
  {
    name: "Plant Name2",
    description: "A beautiful Plant2",
    category: "Plant",
    quantity: 3,
    location: {
      coordinates: [48.8566, 2.3522],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
  {
    name: "Plant Name3",
    description: "A beautiful Plant3",
    category: "Plant",
    quantity: 3,
    location: {
      coordinates: [48.8566, 2.3522],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
];

async function seedItems() {
  try {
    await Item.collection
      .drop()
      .catch((error) => console.log("No collection to drop, proceeding..."));
    console.log("Item collection dropped");

    const usersInDB = await User.find();

    items.forEach((item) => {
      const randomUserIndex = Math.floor(Math.random() * usersInDB.length);
      item.creator = usersInDB[randomUserIndex]._id;
    });
    const createdItems = await Item.create(items);
    console.log(createdItems);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

seedItems();

module.exports = seedItems;
