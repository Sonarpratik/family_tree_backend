const { response,handleErrorResponse } = require("../../../../utils/Utilities");
const FamilyNode = require("../model/familyNodeModel");
exports.createFamilyNode = async (req, res) => {
  try {

      const familyNode = await FamilyNode.create(req.body);
      response(res, familyNode, "FamilyNode created successfully", 200, false);
  } catch (error) {
      console.error("Error creating familyNode:", error.message);
      handleErrorResponse(res, error);
  }
};
// Get All FamilyNodees
exports.getAllFamilyNodes = async (req, res) => {
  try {
    const familyNodees = await FamilyNode.find({isDelete:false}); // Optionally filter for `isDeleted` if required
    response(res, familyNodees, "All familyNodees fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching familyNodees:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get FamilyNode by ID
exports.getFamilyNodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const familyNode = await FamilyNode.findById(id);
    if (!familyNode) {
      return response(res, null, "FamilyNode not found", 404, true);
    }
    response(res, familyNode, "FamilyNode fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching familyNode by ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get FamilyNodees by FamilyNode ID
exports.getFamilyNodeByFamilyNodeId = async (req, res) => {
  try {
    const { familyNode_id } = req.params;
    const familyNodees = await FamilyNode.find({ familyNode: familyNode_id });
    if (!familyNodees || familyNodees.length === 0) {
      return response(res, null, "No familyNodees found for this familyNode", 404, true);
    }
    response(res, familyNodees, "FamilyNodees fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching familyNodees by familyNode ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Update FamilyNode
exports.updateFamilyNode = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFamilyNode = await FamilyNode.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFamilyNode) {
      return response(res, null, "FamilyNode not found", 404, true);
    }
    response(res, updatedFamilyNode, "FamilyNode updated successfully", 200, false);
  } catch (error) {
    console.error("Error updating familyNode:", error.message);
    handleErrorResponse(res, error);
  }
};

// Delete FamilyNode
exports.deleteFamilyNode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFamilyNode = await FamilyNode.findByIdAndDelete(id);
    if (!deletedFamilyNode) {
      return response(res, null, "FamilyNode not found", 404, true);
    }
    response(res, deletedFamilyNode, "FamilyNode deleted successfully", 200, false);
  } catch (error) {
    console.error("Error deleting familyNode:", error.message);
    handleErrorResponse(res, error);
  }
};

