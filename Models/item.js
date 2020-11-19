const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: true,
      required: true,
    },

    Description: {
      type: String,
    },

    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// itemSchema.statics.findById = async (id) => {
//   const item = await Item.findO(id);

//   if (!item) {
//     throw new Error("Item not available");
//   }

//   return item;
// };

itemSchema.post("patch", async function (next) {
  const item = this;
  if (item.isModified("Price")) {
  }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
