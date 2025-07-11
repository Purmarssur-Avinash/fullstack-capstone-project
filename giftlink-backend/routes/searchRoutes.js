/* jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db'); // this exports a function to connect to the DB

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase
        const db = await connectToDatabase();

        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        // Add the name filter to the query if the name parameter is not empty
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name.trim(), $options: "i" }; // Partial, case-insensitive match
        }

        // Task 3: Add other filters to the query
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };
        }

        // Task 4: Fetch filtered gifts
        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
