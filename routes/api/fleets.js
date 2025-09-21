const express = require("express");
const router = express.Router();
require("dotenv").config();

// import model
const Fleet = require("../../models/Fleet");

// get fleets
router.get("/get", async (req, res) => {
  try {
    const fleets = await Fleet.find().sort({ total_fleet: -1 });

    res.json({ fleets: fleets });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
});

// add address
router.post("/add", async (req, res) => {
  try {
    const { address } = req.body;

    // Check if addres already exists
    const existingFleet = await Fleet.findOne({ address });
    if (existingFleet) {
      return res.json({ status: "Wallet already exist" });
    }

    const fleet = new Fleet({ address });
    fleet.save();

    res.json({ status: "Wallet Added" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
});

// add address
router.post("/add-total-fleet", async (req, res) => {
  try {
    const { address, total_fleet } = req.body;

    if (!address || total_fleet === undefined) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Address and total_fleet are required" }] });
    }

    // find and update by address
    const fleet = await Fleet.findOneAndUpdate(
      { address }, // match by address
      { $set: { total_fleet } }, // update total_fleet
      { new: true } // return updated document
    );

    if (!fleet) {
      return res.status(404).json({ errors: [{ msg: "Address not found" }] });
    }

    res.json({ status: "success", fleet });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
});

module.exports = router;
