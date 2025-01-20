const { response,handleErrorResponse } = require("../../../../utils/Utilities");
const User = require("../model/userModel");
exports.createUser = async (req, res) => {
  try {

      const user = await User.create(req.body);
      response(res, user, "User created successfully", 200, false);
  } catch (error) {
      console.error("Error creating user:", error.message);
      handleErrorResponse(res, error);
  }
};
// Get All Useres
exports.getAllUsers = async (req, res) => {
  try {
    const useres = await User.find(); // Optionally filter for `isDeleted` if required
    response(res, useres, "All useres fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching useres:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return response(res, null, "User not found", 404, true);
    }
    response(res, user, "User fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetchingx user by ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get Useres by User ID
exports.getUserByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const useres = await User.find({ user: user_id });
    if (!useres || useres.length === 0) {
      return response(res, null, "No useres found for this user", 404, true);
    }
    response(res, useres, "Useres fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching useres by user ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return response(res, null, "User not found", 404, true);
    }
    response(res, updatedUser, "User updated successfully", 200, false);
  } catch (error) {
    console.error("Error updating user:", error.message);
    handleErrorResponse(res, error);
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return response(res, null, "User not found", 404, true);
    }
    response(res, deletedUser, "User deleted successfully", 200, false);
  } catch (error) {
    console.error("Error deleting user:", error.message);
    handleErrorResponse(res, error);
  }
};

