const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const note = new Note({
      user: req.user.userId,
      description,
    });

    await note.save();

    res.status(201).json({ message: "Note added successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding note", error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findOneAndDelete({
      _id: noteId,
      user: req.user.userId,
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
