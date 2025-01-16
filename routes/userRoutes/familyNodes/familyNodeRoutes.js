const express = require("express");
const familyNode = express.Router();
const {
    createFamilyNode,
    getAllFamilyNodes,
    getFamilyNodeById,
    getFamilyNodeByFamilyNodeId,
    updateFamilyNode,
    deleteFamilyNode,

} = require("./controller/familyNodeController");

familyNode.get("/:id", getFamilyNodeById);
familyNode.put("/:id", updateFamilyNode);
familyNode.get("/:familyNode_id", getFamilyNodeByFamilyNodeId);
familyNode.get("/", getAllFamilyNodes);
familyNode.post("/", createFamilyNode);
familyNode.delete("/:id", deleteFamilyNode);


module.exports = familyNode;
