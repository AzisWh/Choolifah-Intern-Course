const { Router } = require("express");
const response = require("../../cores/response");
const ModuleService = require("../../services/moduleService");

const getModule = Router();

//by section id
getModule.get("/bab/:section_id/modul", async (req, res) => {
  try {
    const { section_id } = req.params;

    if (!section_id) {
      return res.status(400).json({ message: "Section ID is required." });
    }

    const modules = await ModuleService.getModulesBySectionId(section_id);

    return res.status(200).json({ data: modules });
  } catch (error) {
    if (error.message === "No modules found for this section.") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error fetching modules for section:", error.message);
    return res.status(500).json({ message: "Failed to fetch modules for section." });
  }
});

//by module id
getModule.get("/getmodul/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Module ID is required." });
    }

    const module = await ModuleService.getModuleById(id);

    return res.status(200).json({ data: module });
  } catch (error) {
    if (error.message === "Module not found.") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error fetching module by ID:", error.message);
    return res.status(500).json({ message: "Failed to fetch module by ID." });
  }
});

module.exports = getModule;
