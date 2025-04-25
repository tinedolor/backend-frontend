


function DataTable({ data }) {
    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }
  
    // Flatten nested objects if needed
    const flattenObject = (obj) => {
      if (typeof obj !== 'object' || obj === null) return obj;
      
      return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          return { ...acc, ...flattenObject(obj[key]) };
        }
        return { ...acc, [key]: obj[key] };
      }, {});
    };
  
    const flattenedData = data.map(item => flattenObject(item));
    const headers = Object.keys(flattenedData[0]);
  
    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={`${index}-${header}`}>
                  {typeof row[header] === 'object' 
                    ? JSON.stringify(row[header]) 
                    : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default DataTable;