import { Component, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Navigation menu
const menuItems = [
  { name: "Dashboard", path: "/", icon: "▦" },
  { name: "Students", path: "/students", icon: "♙" },
  { name: "Attendance", path: "/attendance", icon: "◷" },
  { name: "Performance", path: "/performance", icon: "▥" },
];

// Sidebar
function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>

        <div>
          <h2>
            Student<span>Hub</span>
          </h2>
          <p>MANAGEMENT SYSTEM</p>
        </div>
      </div>

      <p className="menu-heading">MENU</p>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">?</div>
          <h4>Need help?</h4>
          <p>Contact the support team for assistance.</p>

          <button
            onClick={() =>
              alert("Contact: support@studenthub.com")
            }
          >
            Contact Support
          </button>
        </div>

        <button
          className="profile"
          type="button"
          onClick={() => navigate("/profile")}
        >
          <div className="avatar admin-avatar">BH</div>

          <div>
            <h4>Admin User</h4>
            <p>Administrator</p>
          </div>

          <span className="profile-dots">•••</span>
        </button>
      </div>
    </aside>
  );
}

// Administrator page
function AdministratorPage() {
  return (
    <section className="panel simple-page">
      <h1>Administrator</h1>
      <p>Welcome to the StudentHub Administrator page.</p>
      <p>
        Manage student records, attendance, and performance.
      </p>
    </section>
  );
}

// Profile page
function ProfilePage() {
  return (
    <section className="panel simple-page">
      <h1>My Profile</h1>

      <div className="avatar admin-avatar">BH</div>

      <h3>Bhuvan H B</h3>

      <p>
        <strong>Role:</strong> Student
      </p>

      <p>
        <strong>Portal:</strong> StudentHub
      </p>
    </section>
  );
}

// Reusable statistic card
function StatCard({
  title,
  value,
  change,
  icon,
  color,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>

        <div className={`stat-icon ${color}`}>
          {icon}
        </div>
      </div>

      <h2>{value}</h2>

      <p className="stat-change">
        <span>↗ {change}</span>{" "}
        <span className="muted">from last month</span>
      </p>
    </div>
  );
}

// Student table
function StudentTable({
  students,
  search,
  setSearch,
  onEdit,
  onDelete,
}) {
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="panel student-panel">
      <div className="panel-heading">
        <div>
          <h3>Recent Students</h3>
          <p>Manage and view your student records</p>
        </div>

        <button
          className="text-button"
          onClick={() => setSearch("")}
        >
          View all →
        </button>
      </div>

      <div className="table-tools">
        <div className="search-box">
          <span>⌕</span>

          <input
            placeholder="Search students..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <button
          className="filter-button"
          onClick={() => setSearch("")}
        >
          ↕ Reset
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>COURSE</th>
              <th>YEAR</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <div
                      className={`avatar avatar-${
                        student.id % 5
                      }`}
                    >
                      {student.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>

                    <div>
                      <strong>{student.name}</strong>
                      <p>{student.email}</p>
                    </div>
                  </div>
                </td>

                <td>{student.course}</td>

                <td>{student.year}</td>

                <td>
                  <span
                    className={`status ${
                      student.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td>
                  <div className="student-actions">
                    <button
                      className="more-button"
                      onClick={() => onEdit(student)}
                      title="Edit student"
                    >
                      ✏️
                    </button>

                    <button
                      className="more-button"
                      onClick={() =>
                        onDelete(student.id)
                      }
                      title="Delete student"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="empty-message"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filteredStudents.length} of{" "}
        {students.length} students
      </div>
    </section>
  );
}

// Activity panel
function ActivityPanel() {
  const activities = [
    {
      initials: "AR",
      name: "Aarav Sharma",
      action: "submitted an assignment",
      time: "10 min ago",
      color: "activity-green",
    },
    {
      initials: "PR",
      name: "Priya Reddy",
      action: "marked attendance",
      time: "35 min ago",
      color: "activity-purple",
    },
    {
      initials: "RK",
      name: "Rahul Kumar",
      action: "updated profile",
      time: "1 hour ago",
      color: "activity-orange",
    },
  ];

  return (
    <section className="panel activity-panel">
      <div className="panel-heading">
        <div>
          <h3>Recent Activity</h3>
          <p>Latest updates from students</p>
        </div>

        <button className="text-button">•••</button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div
            className="activity-item"
            key={activity.name}
          >
            <div
              className={`avatar ${activity.color}`}
            >
              {activity.initials}
            </div>

            <div className="activity-content">
              <p>
                <strong>{activity.name}</strong>{" "}
                {activity.action}
              </p>

              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="activity-link">
        View all activity →
      </button>
    </section>
  );
}

// Dashboard
function Dashboard({
  students,
  search,
  setSearch,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">OVERVIEW</p>

          <h1>Dashboard</h1>

          <p className="welcome-text">
            Welcome back! Here's what's happening at your
            institution.
          </p>
        </div>

        <div className="date-label">
          ▦ &nbsp; Academic Year 2026–27
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={students.length.toLocaleString()}
          change="12.5%"
          icon="♙"
          color="icon-green"
        />

        <StatCard
          title="Active Students"
          value={
            students.filter(
              (student) =>
                student.status === "Active"
            ).length
          }
          change="8.2%"
          icon="✓"
          color="icon-blue"
        />

        <StatCard
          title="Attendance Rate"
          value="92.4%"
          change="4.3%"
          icon="◷"
          color="icon-purple"
        />

        <StatCard
          title="Avg. Performance"
          value="84.6%"
          change="6.1%"
          icon="↗"
          color="icon-orange"
        />
      </div>

      <div className="content-grid">
        <StudentTable
          students={students}
          search={search}
          setSearch={setSearch}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <ActivityPanel />
      </div>
    </>
  );
}

// Add student form
function AddStudentForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("CSE");
  const [year, setYear] = useState("1st Year");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please enter name and email.");
      return;
    }

    const success = await onAdd({
      name: name.trim(),
      email: email.trim(),
      course,
      year,
    });

    if (!success) {
      return;
    }
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <h3>Add New Student</h3>
          <p>Enter the student's details below</p>
        </div>
      </div>

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >
        <label>
          Full Name

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter student name"
            required
          />
        </label>

        <label>
          Email Address

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="student@example.com"
            required
          />
        </label>

        <label>
          Course

          <select
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
          >
            <option>CSE</option>
            <option>AIML</option>
            <option>ECE</option>
            <option>ISE</option>
          </select>
        </label>

        <label>
          Year

          <select
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Add Student
          </button>
        </div>
      </form>
    </section>
  );
}

// Edit student form
function EditStudentForm({
  student,
  onUpdate,
  onCancel,
}) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [course, setCourse] = useState(student.course);
  const [year, setYear] = useState(student.year);
  const [status, setStatus] = useState(
    student.status
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please enter name and email.");
      return;
    }

    const success = await onUpdate(student.id, {
      name: name.trim(),
      email: email.trim(),
      course,
      year,
      status,
    });

    if (success) {
      onCancel();
    }
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <h3>Edit Student</h3>
          <p>Update the student's details below</p>
        </div>
      </div>

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >
        <label>
          Full Name

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </label>

        <label>
          Email Address

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </label>

        <label>
          Course

          <select
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
          >
            <option>CSE</option>
            <option>AIML</option>
            <option>ECE</option>
            <option>ISE</option>
          </select>
        </label>

        <label>
          Year

          <select
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </label>

        <label>
          Status

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Update Student
          </button>
        </div>
      </form>
    </section>
  );
}

// Students page
function StudentsPage({
  students,
  search,
  setSearch,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] =
    useState(null);

  async function handleAdd(student) {
    const success = await onAdd(student);

    if (success) {
      setShowForm(false);
    }

    return success;
  }

  async function handleUpdate(
    id,
    updatedStudent
  ) {
    const success = await onEdit(
      id,
      updatedStudent
    );

    if (success) {
      setEditingStudent(null);
    }

    return success;
  }

  if (showForm) {
    return (
      <AddStudentForm
        onAdd={handleAdd}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  if (editingStudent) {
    return (
      <EditStudentForm
        student={editingStudent}
        onUpdate={handleUpdate}
        onCancel={() =>
          setEditingStudent(null)
        }
      />
    );
  }

  return (
    <>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">MANAGEMENT</p>

          <h1>Students</h1>

          <p className="welcome-text">
            View and manage all student records.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Student
        </button>
      </div>

      <StudentTable
        students={students}
        search={search}
        setSearch={setSearch}
        onEdit={(student) =>
          setEditingStudent(student)
        }
        onDelete={onDelete}
      />
    </>
  );
}

// Attendance page - Class Component
class AttendancePage extends Component {
  render() {
    const { students } = this.props;

    const attendanceRecords = {
      1: { attended: 18, total: 20 },
      2: { attended: 19, total: 20 },
      3: { attended: 16, total: 20 },
      4: { attended: 17, total: 20 },
      5: { attended: 13, total: 20 },
    };

    return (
      <>
        <div className="welcome-section">
          <div>
            <p className="eyebrow">
              STUDENT RECORDS
            </p>

            <h1>Attendance</h1>

            <p className="welcome-text">
              Track attendance for each student.
            </p>
          </div>

          <div className="date-label">
            Academic Year 2026–27
          </div>
        </div>

        <section className="panel student-panel attendance-panel">
          <div className="panel-heading">
            <div>
              <h3>Student Attendance</h3>
              <p>
                Attendance summary for each student
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>COURSE</th>
                  <th>CLASSES</th>
                  <th>ATTENDANCE</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => {
                  const record =
                    attendanceRecords[student.id];

                  const attended = record
                    ? record.attended
                    : 0;

                  const total = record
                    ? record.total
                    : 0;

                  const percentage =
                    total > 0
                      ? Math.round(
                          (attended / total) * 100
                        )
                      : 0;

                  return (
                    <tr key={student.id}>
                      <td>
                        <div className="student-info">
                          <div
                            className={`avatar avatar-${
                              student.id % 5
                            }`}
                          >
                            {student.name
                              .split(" ")
                              .map(
                                (part) =>
                                  part[0]
                              )
                              .join("")}
                          </div>

                          <div>
                            <strong>
                              {student.name}
                            </strong>
                            <p>{student.email}</p>
                          </div>
                        </div>
                      </td>

                      <td>{student.course}</td>

                      <td>
                        {total > 0
                          ? `${attended} / ${total}`
                          : "No records"}
                      </td>

                      <td>
                        <div className="attendance-value">
                          <strong>
                            {total > 0
                              ? `${percentage}%`
                              : "—"}
                          </strong>

                          {total > 0 && (
                            <div className="attendance-track">
                              <div
                                className={`attendance-fill ${
                                  percentage <
                                  75
                                    ? "attendance-low"
                                    : ""
                                }`}
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="empty-message"
                    >
                      No student records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing attendance for{" "}
            {students.length} students
          </div>
        </section>
      </>
    );
  }
}

// Performance page
function PerformancePage() {
  return (
    <section className="panel simple-page">
      <div className="simple-page-icon">▥</div>

      <h2>Performance</h2>

      <p>
        Review marks and academic performance.
      </p>

      <h3>Average Performance: 84.6%</h3>

      <p>
        Use this section to review students' academic
        progress.
      </p>
    </section>
  );
}

// Main application layout
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Student data from Express backend
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // GET - Load students
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch students"
          );
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error loading students:",
          error
        );

        setLoading(false);

        alert(
          "Unable to load students. Please make sure the backend server is running."
        );
      });
  }, []);

  // POST - Add student
  async function addStudent(student) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add student"
        );
      }

      const newStudent =
        await response.json();

      setStudents((previousStudents) => [
        ...previousStudents,
        newStudent,
      ]);

      navigate("/students");

      return true;
    } catch (error) {
      console.error(
        "Error adding student:",
        error
      );

      alert(
        "Unable to add student. Please make sure the backend server is running."
      );

      return false;
    }
  }

  // PUT - Update student
  async function updateStudent(
    id,
    updatedStudent
  ) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update student"
        );
      }

      const updatedStudentFromServer =
        await response.json();

      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === id
            ? updatedStudentFromServer
            : student
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Error updating student:",
        error
      );

      alert(
        "Unable to update student. Please make sure the backend server is running."
      );

      return false;
    }
  }

  // DELETE - Delete student
  async function deleteStudent(id) {
    const student = students.find(
      (item) => item.id === id
    );

    if (!student) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete student"
        );
      }

      setStudents((previousStudents) =>
        previousStudents.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting student:",
        error
      );

      alert(
        "Unable to delete student. Please make sure the backend server is running."
      );
    }
  }

  const pageNames = {
    "/": "Dashboard",
    "/students": "Students",
    "/attendance": "Attendance",
    "/performance": "Performance",
    "/administrator": "Administrator",
    "/profile": "Profile",
  };

  const activePage =
    pageNames[location.pathname] ||
    "Dashboard";

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Pages <span>/</span>{" "}
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <div className="top-search">
              <span>⌕</span>

              <input
                placeholder="Search anything..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <kbd>⌘ K</kbd>
            </div>

            <button
              className="top-icon"
              aria-label="Notifications"
              type="button"
            >
              ♧
              <span className="notification-dot"></span>
            </button>

            <button
              className="text-button"
              type="button"
              onClick={() =>
                navigate("/administrator")
              }
            >
              Administrator
            </button>

            <button
              className="avatar admin-avatar"
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              aria-label="Open profile"
            >
              AD
            </button>
          </div>
        </header>

        <div className="page-content">
          {loading ? (
            <section className="panel simple-page">
              <h2>Loading students...</h2>

              <p>
                Fetching student records from the
                backend.
              </p>
            </section>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    students={students}
                    search={search}
                    setSearch={setSearch}
                    onEdit={updateStudent}
                    onDelete={deleteStudent}
                  />
                }
              />

              <Route
                path="/students"
                element={
                  <StudentsPage
                    students={students}
                    search={search}
                    setSearch={setSearch}
                    onAdd={addStudent}
                    onEdit={updateStudent}
                    onDelete={deleteStudent}
                  />
                }
              />

              <Route
                path="/attendance"
                element={
                  <AttendancePage
                    students={students}
                  />
                }
              />

              <Route
                path="/performance"
                element={
                  <PerformancePage />
                }
              />

              <Route
                path="/administrator"
                element={
                  <AdministratorPage />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProfilePage />
                }
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                    replace
                  />
                }
              />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}