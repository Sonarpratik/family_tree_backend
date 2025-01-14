const Address = require("../models/addressModel");
const { response, handleErrorResponse } = require("../utils/Utilities");
const createAddress = async (req, res) => {
  try {

      const address = await Address.create(req.body);
      response(res, address, "Address created successfully", 200, false);
  } catch (error) {
      console.error("Error deleting order:", error.message);
      handleErrorResponse(res, error);
  }
};
// Get All Addresses
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({isDelete:false}); // Optionally filter for `isDeleted` if required
    response(res, addresses, "All addresses fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get Address by ID
const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return response(res, null, "Address not found", 404, true);
    }
    response(res, address, "Address fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching address by ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Get Addresses by User ID
const getAddressByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const addresses = await Address.find({ user: user_id });
    if (!addresses || addresses.length === 0) {
      return response(res, null, "No addresses found for this user", 404, true);
    }
    response(res, addresses, "Addresses fetched successfully", 200, false);
  } catch (error) {
    console.error("Error fetching addresses by user ID:", error.message);
    handleErrorResponse(res, error);
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAddress) {
      return response(res, null, "Address not found", 404, true);
    }
    response(res, updatedAddress, "Address updated successfully", 200, false);
  } catch (error) {
    console.error("Error updating address:", error.message);
    handleErrorResponse(res, error);
  }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      return response(res, null, "Address not found", 404, true);
    }
    response(res, deletedAddress, "Address deleted successfully", 200, false);
  } catch (error) {
    console.error("Error deleting address:", error.message);
    handleErrorResponse(res, error);
  }
};

