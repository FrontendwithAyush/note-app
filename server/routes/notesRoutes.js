// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");

// router.get("/dashboard", verifyToken, (req, res) => {
//   res.json({ message: "You are authorized!", user: req.user });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// Protected Routes
router.post("/add", verifyToken, noteController.addNote);
router.get("/fetch", verifyToken, noteController.getNotes);
router.delete("/delete/:id", verifyToken, noteController.deleteNote);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

module.exports = router;
