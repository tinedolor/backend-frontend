import './Navbar.css';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <ul>
        <li 
          className={activeTab === 'sections' ? 'active' : ''}
          onClick={() => setActiveTab('sections')}
        >
          Sections
        </li>
        <li 
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          Students
        </li>
        <li 
          className={activeTab === 'subjects' ? 'active' : ''}
          onClick={() => setActiveTab('subjects')}
        >
          Subjects
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;