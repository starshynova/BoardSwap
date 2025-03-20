import Order, { validateOrder } from "../models/order-model.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    if (typeof orderData !== "object" || orderData === null) {
      return res.status(400).json({
        success: false,
        msg: `You need to provide an 'order' object. Received: ${JSON.stringify(
          orderData,
        )}`,
      });
    }

    const errorList = validateOrder(orderData);
    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    }
    const newOrder = await Order.create(orderData);

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create a new order, try again later",
    });
  }
};
