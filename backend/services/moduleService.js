const ModuleRepository = require("../repository/moduleRepository");
const moduleRepo = new ModuleRepository();

// Add module
exports.addModule = async (data, options) => {
  try {
    if (!data.title || !data.section_id) {
      throw new Error("Title and section_id are required.");
    }
    const newModule = await moduleRepo.createModule(data, options);
    return newModule;
  } catch (error) {
    console.error("Error adding module:", error);
    throw new Error("Failed to add module: " + error.message);
  }
};

// Update module
exports.updateModule = async (id, data, options) => {
  try {
    const module = await moduleRepo.getModuleById(id);
    if (!module) return null;

    const updatedModule = await moduleRepo.updateModule(id, data, options);
    return updatedModule;
  } catch (error) {
    console.error("Error updating module with ID:", id, error);
    throw new Error("Failed to update module with ID " + id + ": " + error.message);
  }
};

// Get module by ID
exports.getModuleById = async (id) => {
  try {
    if (!id) {
      throw new Error("Module ID is required.");
    }

    const module = await moduleRepo.getModuleById(id);
    if (!module) {
      throw new Error("Module not found.");
    }

    return module;
  } catch (error) {
    console.error("Error fetching module by ID:", error.message);
    throw error;
  }
};

// Get modules by section
exports.getModulesBySectionId = async (section_id) => {
  try {
    if (!section_id) {
      throw new Error("Section ID is required.");
    }

    const modules = await moduleRepo.getAllModulesBySectionId(section_id);

    if (!modules || modules.length === 0) {
      throw new Error("No modules found for this section.");
    }

    return modules;
  } catch (error) {
    console.error("Error fetching modules for section:", error.message);
    throw error;
  }
};
