import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getSections } from '../api';

function SectionsPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        setSections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  if (loading) return <div>Loading sections...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Sections</h1>
      <DataTable data={sections} />
    </div>
  );
}

export default SectionsPage;