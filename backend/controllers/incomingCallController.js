import CallHistory from "../models/IncomingCallsModel.js";

/**
 * @desc Create a new incoming call
 */
export const createIncomingCall = async (req, res) => {
  try {
    const newCall = new CallHistory(req.body);
    await newCall.save();
    res.status(201).json(newCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc Get all incoming calls
 */
export const getAllIncomingCalls = async (req, res) => {
  try {
    const calls = await CallHistory.find();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get an incoming call by ID
 */
export const getIncomingCallById = async (req, res) => {
  try {
    const call = await CallHistory.findById(req.params.id);
    if (!call) return res.status(404).json({ message: "Call not found" });
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get incoming calls by contact number
 */
export const getIncomingCallsByNumber = async (req, res) => {
  try {
    const calls = await CallHistory.find({ contactNo: req.params.number });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an incoming call
 */
export const deleteIncomingCall = async (req, res) => {
  try {
    const call = await CallHistory.findByIdAndDelete(req.params.id);
    if (!call) return res.status(404).json({ message: "Call not found" });
    res.status(200).json({ message: "Call deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
