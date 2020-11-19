const express = require("express");
const Item = require("../Models/item");
const Cart = require("../Models/cart");
const auth = require("../auth/auth");
const {
  createSubscription,
  receiveMessages,
} = require("../notification/notification");
const router = new express.Router();

router.post("/user/cart/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let itemtocart = await Item.findById(_id);
  if (!itemtocart) {
    throw new Error("Item not available");
  }
  const cart = new Cart({
    Name: itemtocart.Name,
    OrderId: itemtocart.id,
    Description: itemtocart.Description,
    Price: itemtocart.Price,
    Owner: req.user._id,
  });

  try {
    // const item = await Item.findByName(req.body.Name);
    // console.log(item);
    // if (!item) {
    //   throw new Error();
    // }

    await cart.save();

    res.status(201).send(cart);
    createSubscription(req.user.Name);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/user/cart", auth, async (req, res) => {
  try {
    const items = await Cart.find({});

    res.status(200).send(items);
  } catch (e) {
    res.status(400).send("Cart Is Empty");
  }
});

router.delete("/user/cart/checkout", auth, async (req, res) => {
  try {
    const item = await Cart.find({});
    if (!item) {
      throw new Error("No item in cart");
    }

    await Cart.remove();
    res.status(200).send("Thank you for shopping with us");
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/user/cart/:id", auth, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      throw new Error();
    }

    await item.remove();
    //sendRemoveCartNotification(item.Name);
    res.status(200).send(" successfully removed ");
  } catch (e) {
    res.status(400).send("cannot find item in cart");
  }
});

module.exports = router;
