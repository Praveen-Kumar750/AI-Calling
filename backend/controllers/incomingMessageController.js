import MessageHistory from "../models/IncomingMessagesModel.js";

/**
 * @desc Create a new incoming call
 */
export const createIncomingMessage = async (req, res) => {
  try {
    const newMessage = new MessageHistory(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc Get all incoming calls
 */
export const getAllIncomingMessages = async (req, res) => {
  try {
    const calls = await MessageHistory.find();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get an incoming call by ID
 */
export const getIncomingMessageById = async (req, res) => {
  try {
    const call = await MessageHistory.findById(req.params.id);
    if (!call) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get incoming calls by contact number
 */
export const getIncomingMessagesByNumber = async (req, res) => {
  try {
    const calls = await MessageHistory.find({ contactNo: req.params.number });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an incoming call
 */
export const deleteIncomingMessage = async (req, res) => {
  try {
    const call = await MessageHistory.findByIdAndDelete(req.params.id);
    if (!call) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
