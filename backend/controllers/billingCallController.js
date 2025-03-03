import BillingCallLog from "../models/BillingCallsModel.js";

/**
 * @desc Get all billing call logs
 */
export const getAllBillingLogs = async (req, res) => {
  try {
    const logs = await BillingCallLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get a billing log by ID
 */
export const getBillingLogById = async (req, res) => {
  try {
    const log = await BillingCallLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get billing logs by contact number
 */
export const getBillingLogsByNumber = async (req, res) => {
  try {
    const logs = await BillingCallLog.find({ contactNo: req.params.number });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete a billing log
 */
export const deleteBillingLog = async (req, res) => {
  try {
    const log = await BillingCallLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
