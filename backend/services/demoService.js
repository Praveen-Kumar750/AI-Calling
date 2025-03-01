import Demo from "../models/demoModel.js";

const createDemo = async (data) => {
  return await Demo.create(data);
};

const getAllDemos = async () => {
  return await Demo.find();
};

const getDemoById = async (id) => {
  return await Demo.findById(id);
};

export default { createDemo, getAllDemos, getDemoById };
