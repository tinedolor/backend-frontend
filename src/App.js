import { useState } from 'react';
import SectionsPage from './pages/SectionsPages';
import StudentsPage from './pages/StudentsPages';
import SubjectsPage from './pages/SubjectsPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('sections');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!newStudent.studentId || !newStudent.lastName || !newStudent.email) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add student');
      }

      // Reset form and close modal
      setShowAddStudentModal(false);
      setNewStudent({ studentId: '', lastName: '', email: '' });
      
      // You might want to refresh the student list here
      // Either by lifting state up or using a state management solution
      // For now, we'll just log success
      console.log('Student added successfully');
      
    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.message || 'An error occurred while adding the student');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Navbar = ({ activeTab, setActiveTab }) => (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <button
            className={`nav-button ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            Sections
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-button ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === 'sections' && <SectionsPage />}
        {activeTab === 'students' && (
          <>
            <div className="students-header">
              <h2>Students</h2>
              <button 
                className="add-student-button"
                onClick={() => setShowAddStudentModal(true)}
              >
                Add Student
              </button>
            </div>
            <StudentsPage />
            
            {/* Add Student Modal */}
            {showAddStudentModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => {
                    setShowAddStudentModal(false);
                    setError('');
                  }}>
                    &times;
                  </span>
                  <h3>Add New Student</h3>
                  {error && <div className="error-message">{error}</div>}
                  <form onSubmit={handleAddStudent}>
                    <div className="form-group">
                      <label>Student ID:</label>
                      <input
                        type="text"
                        name="studentId"
                        value={newStudent.studentId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        name="lastName"
                        value={newStudent.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button">
                      Add Student
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === 'subjects' && <SubjectsPage />}
      </div>
    </div>
  );
}

export default App;