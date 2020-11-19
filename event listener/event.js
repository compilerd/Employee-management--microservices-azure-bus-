var events = require("events");
var {
  sendPriceChangeEmail,
  sendItemnotAvailableEmail,
} = require("../notification/notification");

var eventEmitter = new events.EventEmitter();

var myEventOnCartItemPrice = (email, price) => {
  sendPriceChangeEmail(email);
  eventEmitter.emit("update", email, price);
};

var myEventOnCartItemUnavailable = (email, price) => {
  sendItemnotAvailableEmail(email);
  eventEmitter.emit("unavailable", email, price);
};

module.exports = {
  eventEmitter,
  myEventOnCartItemPrice,
  myEventOnCartItemUnavailable,
};
