const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    OrderId: {
      type: String,
    },

    Description: {
      type: String,
    },

    Price: {
      type: Number,
      required: true,
    },

    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
