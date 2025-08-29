const express = require("express");
const {
  getNote,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getNote);
router.post("/create", protect, createNote);
router.get("/:id", getNoteById);
router.put("/:id", protect, UpdateNote);
router.delete("/:id", protect, DeleteNote);

module.exports = router;
