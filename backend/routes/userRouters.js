// // const express = require("express");
// // const { registerUser } = require("../controllers/userControllers");

// // const router = express.Router();

// // router.route("/").post(registerUser);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();

// // Dummy data for testing
// const notes = [
//   { _id: 1, title: "Note 1", content: "Content 1" },
//   { _id: 2, title: "Note 2", content: "Content 2" },
// ];

// router.get("/", (req, res) => {
//   res.json(notes);
//   router.get("/", async (req, res) => {
//     try {
//       const notes = await Note.find(); // or just send dummy notes
//       res.json(notes);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   });
// });

// module.exports = router;
