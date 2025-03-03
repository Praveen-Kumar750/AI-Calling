import OutgoingMessageHistory from "../models/OutgoingMessagesModel.js";

/**
 * @desc Create a new outgoing call
 */
export const createOutgoingMessage = async (req, res) => {
  try {
    const newMessage = new OutgoingMessageHistory(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc Get all outgoing calls
 */
export const getAllOutgoingMessages = async (req, res) => {
  try {
    const calls = await OutgoingMessageHistory.find();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get an outgoing call by ID
 */
export const getOutgoingMessageById = async (req, res) => {
  try {
    const call = await OutgoingMessageHistory.findById(req.params.id);
    if (!call) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get outgoing calls by contact number
 */
export const getOutgoingMessagesByNumber = async (req, res) => {
  try {
    const calls = await OutgoingMessageHistory.find({ contactNo: req.params.number });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an outgoing call
 */
export const deleteOutgoingMessage = async (req, res) => {
  try {
    const call = await OutgoingMessageHistory.findByIdAndDelete(req.params.id);
    if (!call) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
