const express = require("express");

const {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue,
    assignIssue,
    getMyIssues
} = require("../controllers/issueController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIssue);

router.get("/", protect, getIssues);

router.put("/:id", protect, updateIssue);


router.delete("/:id", protect, deleteIssue);

router.put(
  "/assign/:id",
  protect,
  assignIssue
);

router.get(
    "/my",
    protect,
    getMyIssues
);


module.exports = router;