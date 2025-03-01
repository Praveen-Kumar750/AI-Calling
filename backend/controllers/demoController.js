import Demo from "../models/demoModel.js";
import demoService from "../services/demoService.js";

// @desc    Schedule a new demo
// @route   POST /api/demo
// @access  Public
export const scheduleDemo = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const demo = await demoService.createDemo({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    res.status(201).json(demo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scheduled demos
// @route   GET /api/demo
// @access  Public
export const getDemos = async (req, res) => {
  try {
    const demos = await demoService.getAllDemos();
    res.status(200).json(demos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single scheduled demo by ID
// @route   GET /api/demo/:id
// @access  Public
export const getDemoById = async (req, res) => {
  try {
    const demo = await demoService.getDemoById(req.params.id);
    if (!demo) {
      return res.status(404).json({ message: "Demo not found" });
    }
    res.status(200).json(demo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
