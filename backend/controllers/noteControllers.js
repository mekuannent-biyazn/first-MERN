const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNote = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("pleas feill all fields.");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(400).json({ message: "Note not found!" });
  }
});

const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action.");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedData = await note.save();
    res.json(updatedData);
  } else {
    res.status(404);
    throw new Error("Note is not found.");
  }
});

const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action.");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: "note is deleted." });
  } else {
    res.status(404);
    throw new Error("Note is not found.");
  }
});

module.exports = { getNote, createNote, getNoteById, UpdateNote, DeleteNote };
