const mongoose = require("mongoose");

const familyNodeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
        },

        phone: {
            type: Number,
            // required: true,
        },
        birthDate: {
            type: String,
        },
        description: {
            type: String,

        },
        deathDate: {
            type: String,
        },
        deathReason: {
            type: String,
        },
        alive: {
            type: Boolean, default: true
        },
        parents: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyNode",
        }
    },
    {
        timestamps: true,
    }
);

const FamilyNode = mongoose.model("familyNode", familyNodeSchema);

module.exports = FamilyNode;
