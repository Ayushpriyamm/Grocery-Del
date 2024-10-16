import axios from 'axios';
import User from '../models/userModel.js'

// Function to update user location
export const updateUserLocation = async (req, res) => {
  const { latitude, longitude } = req.body; // Assuming the frontend sends this data
  const  userId  = req.user._id;

  try {
    // Validate input
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude are required." });
    }

    // Call OpenCage API to convert coordinates to address
    const apiKey = process.env.OPENCAGE_API_KEY; // Your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length === 0) {
      return res.status(404).json({ message: "Unable to fetch address from coordinates." });
    }

    // Extract the formatted address
    const address = results[0].formatted;

    // Find the user by ID and update the location and address
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        location: { latitude, longitude },
        address: address
      },
      { new: true } // To return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with the updated user data
    res.json({
      message: "Location updated successfully.",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
