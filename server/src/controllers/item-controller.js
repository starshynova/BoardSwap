import Item, { validateItem } from "../models/item-model.js";
import User from "../models/user-model.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getItems = async (req, res) => {
  try {
    const { type, sort } = req.query;
    const filter = {};

    if (type && ["Puzzle", "Board Game"].includes(type)) {
      filter.type = type;
    }

    let sortQuery = {};

    if (sort === "price_asc") {
      sortQuery.price = 1;
    } else if (sort === "price_desc") {
      sortQuery.price = -1;
    }

    const items = await Item.find(filter).sort(sortQuery);
    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get products, try again later" });
  }
};

export const createItem = async (req, res) => {
  try {
    const item = req.body.item;

    if (typeof item !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'product' object. Received: ${JSON.stringify(
          item,
        )}`,
      });

      return;
    }

    const errorList = validateItem(item);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newItem = await Item.create(item);
      await User.findByIdAndUpdate(
        item.seller_id,
        { $push: { items: newItem._id } },
        { new: true },
      );

      res.status(201).json({ success: true, item: newItem });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create a new product, try again later",
    });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }
    res.status(200).json({ success: true, result: item });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get product by ID, try again later",
    });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { item } = req.body;
  if (!id) {
    res.status(400).send({ error: "Please, provide product ID" });
    return;
  }
  if (!item) {
    res.status(400).send({ error: "Please, provide product data" });
    return;
  }
  if (typeof item !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'product' object. Received: ${JSON.stringify(
        item,
      )}`,
    });

    return;
  }
  const errorList = validateItem(item);

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "product not found" });
    }

    res.status(200).json({ success: true, user: updatedItem });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update product, try again later",
    });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Please, provide product ID" });
    return;
  }
  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    } else {
      res.status(200).json({ success: true, item: deletedItem });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete product, try again later",
    });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ success: false, msg: "Search query is required" });
    }

    const searchQuery = {
      $or: [
        { title: { $regex: q, $options: "i" } }, // Case-insensitive search in title
        { description: { $regex: q, $options: "i" } }, // Case-insensitive search in description
      ],
    };

    const items = await Item.find(searchQuery);

    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to search products, try again later",
    });
  }
};
