const Issue = require("../models/Issue");

// Create Issue
exports.createIssue = async (req, res) => {
    try {

        const issue = await Issue.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(issue);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getIssues = async (req, res) => {

    try {

        const issues = await Issue.find()
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        res.json(issues);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateIssue = async (req, res) => {

    try {

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(issue);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteIssue = async (req, res) => {

    try {

        await Issue.findByIdAndDelete(req.params.id);

        res.json({
            message: "Issue Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.assignIssue = async (req, res) => {
    try {

        const { assignedTo } = req.body;

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { assignedTo },
            { new: true }
        );

        res.json(issue);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


exports.getMyIssues = async (req, res) => {

    try {

        const issues = await Issue.find({
            assignedTo: req.user.id
        });

        res.json(issues);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};