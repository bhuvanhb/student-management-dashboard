/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Temporary Student Data
// ===============================

let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    course: "CSE",
    year: "3rd Year",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Reddy",
    email: "priya@gmail.com",
    course: "AIML",
    year: "2nd Year",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    course: "CSE",
    year: "3rd Year",
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Rao",
    email: "sneha@gmail.com",
    course: "ECE",
    year: "1st Year",
    status: "Active",
  },
  {
    id: 5,
    name: "Kiran Patel",
    email: "kiran@gmail.com",
    course: "AIML",
    year: "2nd Year",
    status: "Inactive",
  },
];

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "StudentHub Backend API is running",
  });
});

// ===============================
// GET ALL STUDENTS
// ===============================

app.get("/api/students", (req, res) => {
  res.json(students);
});

// ===============================
// GET ONE STUDENT
// ===============================

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

// ===============================
// POST - ADD NEW STUDENT
// ===============================

app.post("/api/students", (req, res) => {
  const {
    name,
    email,
    course,
    year,
  } = req.body;

  // Validation
  if (!name || !email || !course || !year) {
    return res.status(400).json({
      message:
        "Name, email, course and year are required",
    });
  }

  // Create new student
  const newStudent = {
    id: Date.now(),
    name,
    email,
    course,
    year,
    status: "Active",
  };

  // Add student to array
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// ===============================
// PUT - UPDATE STUDENT
// ===============================

app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  // Student not found
  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const {
    name,
    email,
    course,
    year,
    status,
  } = req.body;

  // Update student
  students[studentIndex] = {
    ...students[studentIndex],

    name:
      name || students[studentIndex].name,

    email:
      email || students[studentIndex].email,

    course:
      course || students[studentIndex].course,

    year:
      year || students[studentIndex].year,

    status:
      status || students[studentIndex].status,
  };

  res.json(students[studentIndex]);
});

// ===============================
// DELETE - DELETE STUDENT
// ===============================

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  // Student not found
  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  // Remove student
  const deletedStudent =
    students.splice(studentIndex, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `StudentHub Backend running on http://localhost:${PORT}`
  );
});