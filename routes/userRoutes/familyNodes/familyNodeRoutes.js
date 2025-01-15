const express = require("express");
const familyNode = express.Router();
const {
    createFamilyNode,
    getAllFamilyNodees,
    getFamilyNodeById,
    getFamilyNodeByFamilyNodeId,
    updateFamilyNode,
    deleteFamilyNode,

} = require("./controller/familyNodeController");

familyNode.get("/:id", getFamilyNodeById);
familyNode.put("/:id", updateFamilyNode);
familyNode.get("/:familyNode_id", getFamilyNodeByFamilyNodeId);
familyNode.get("/", getAllFamilyNodees);
familyNode.post("/", createFamilyNode);
familyNode.delete("/:id", deleteFamilyNode);


module.exports = familyNode;
