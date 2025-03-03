import OutgoingCallHistory from "../models/OutgoingCallsModel.js";

/**
 * @desc Create a new outgoing call
 */
export const createOutgoingCall = async (req, res) => {
  try {
    const newCall = new OutgoingCallHistory(req.body);
    await newCall.save();
    res.status(201).json(newCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc Get all outgoing calls
 */
export const getAllOutgoingCalls = async (req, res) => {
  try {
    const calls = await OutgoingCallHistory.find();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get an outgoing call by ID
 */
export const getOutgoingCallById = async (req, res) => {
  try {
    const call = await OutgoingCallHistory.findById(req.params.id);
    if (!call) return res.status(404).json({ message: "Call not found" });
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get outgoing calls by contact number
 */
export const getOutgoingCallsByNumber = async (req, res) => {
  try {
    const calls = await OutgoingCallHistory.find({ contactNo: req.params.number });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an outgoing call
 */
export const deleteOutgoingCall = async (req, res) => {
  try {
    const call = await OutgoingCallHistory.findByIdAndDelete(req.params.id);
    if (!call) return res.status(404).json({ message: "Call not found" });
    res.status(200).json({ message: "Call deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
