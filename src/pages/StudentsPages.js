import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getStudents } from '../api';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Students</h1>
      <DataTable data={students} />
    </div>
  );
}

export default StudentsPage;