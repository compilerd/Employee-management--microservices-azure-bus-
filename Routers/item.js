const express = require("express");
const sharp = require("sharp");
const { sendMessage, createTopic } = require("../notification/notification");
const router = new express.Router();
const auth = require("../auth/auth");

const Item = require("../Models/item");
const User = require("../Models/user");
const Cart = require("../Models/cart");

const { update, create } = require("../Models/cart");

router.post("/product/inventory", async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();

    createTopic(item.Name);
    res.status(201).send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.post("/product/cart", async (req, res) => {
//   const item = new Item(req.body);
//   try {
//     await item.save();
//     res.status(201).send(item);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
router.get("/product/inventory", async (req, res) => {
  try {
    const items = await Item.find({});

    if (!items) {
      throw new Error();
    }
    //receiveMessages();
    res.status(200).send(items);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.patch("/product/inventory/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Name", "Description", "Price"];
  const isallowedchanges = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isallowedchanges) {
    return res.status(400).send("invalid update");
  }
  try {
    const item = await Item.findById(req.params.id);

    updates.forEach((update) => (item[update] = req.body[update]));

    // if (update === "Price") {
    //   eventEmitter.on(
    //     "update",
    //     myEventOnCartItemPrice(req.user.email, req.body.Price)
    //   );
    // }

    await item.save();
    sendMessage(JSON.stringify(item));

    res.status(202).send(item);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
