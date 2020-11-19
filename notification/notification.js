// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendPriceChangeEmail = (email, name) => {
//   sgMail.send({
//     to: email,
//     from: "ayush.suvi@gmail.com",
//     subject: "Item price update",
//     text: `Hi, ${name}. One of the item in your cart has been updated`,
//   });
// };

// const sendItemnotAvailableEmail = (email, name) => {
//   sgMail.send({
//     to: email,
//     from: "ayush.suvi@gmail.com",
//     subject: "Item not available",
//     text: `Hi, ${name}. Few of the item/items in your cart is no more available`,
//   });
// };

// module.exports = {
//   sendPriceChangeEmail,
//   sendItemnotAvailableEmail,
// };

// const azure = require("azure-sb");

// var notificationHubService = azure.createNotificationHubService(
//   "ShoppingCartNotification/ShoppingNotification",
//   "Endpoint=sb://shoppingcartnotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=y/HYx3VKYKXFtYEbFDl7gyakpLHo9Mz4+xd6i9pJq/4="
// );

// const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus")

// // var sendEvent = async (topicName, actionType) => {
// //   const SBClient = azure.createF
// // }

// SendEvent = async (Topic, Action) => {
//     SBClient = ServiceBusClient.createFromConnectionString(process.env.CONNECTION_STRING)
// }

// const topicClient = SBClient.createTopicClient(process.env.TOPIC)

// const sender = topicClient.createSender();
// try {
//   var message =
// }

var azure = require("azure");

var ServiceBusClient = azure.createServiceBusService(process.env.SB_CONNECTION);

var queue = "OrderDetails";

function createQueue() {
  ServiceBusClient.createQueueIfNotExists(queue, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Queue " + queue + "is created");
    }
  });
}

var topic = "orders";
function createTopic() {
  ServiceBusClient.createTopicIfNotExists(topic, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Topic created or exists ");
    }
  });
}

function createSubscription(subscriber) {
  try {
    ServiceBusClient.createSubscription(topic, subscriber, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          "Subscriber " + subscriber + " registered for " + topic + " messages"
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function sendMessage(message) {
  ServiceBusClient.sendTopicMessage(topic, message, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  });
}
function receiveMessages(subscriber) {
  ServiceBusClient.receiveSubscriptionMessage(topic, subscriber, function (
    error,
    message
  ) {
    if (error) {
      console.log(error);
    } else {
      item = JSON.parse(message.body);

      console.log(
        "the item in your cart with orderId " +
          item._id +
          " price has changed to " +
          item.Price
      );
    }
  });
}
module.exports = {
  createQueue,

  createTopic,
  createSubscription,
  sendMessage,
  receiveMessages,
};
