import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getSubjects } from '../api';

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <div>Loading subjects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Subjects</h1>
      <DataTable data={subjects} />
    </div>
  );
}

export default SubjectsPage;