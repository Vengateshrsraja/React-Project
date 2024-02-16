import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProject = () => {
  const [apiData, setApiData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/unknown?page=${currentPage}&per_page=${itemsPerPage}`);
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    console.log('Component mounted!');

    if (apiData) {
      console.log('Data updated:', apiData);
    }

    return () => {
      console.log('Component will unmount!');
    };
  }, [apiData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    if (!apiData) return null;

    const pages = Array.from({ length: apiData.total_pages }, (_, index) => index + 1);

    return (
      <div>
        {pages.map((page) => (
          <button
            key={page}
            style={{
              cursor: 'pointer',
              marginRight: '5px',
              fontWeight: currentPage === page ? 'bold' : 'normal',
              border: '1px solid #ccc',
              padding: '5px 10px',
            }}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>React Table Component</h1>
      {apiData ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Year</th>
                <th>Color</th>
                <th>Pantone_value</th>
              </tr>
            </thead>
            <tbody>
              {apiData.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                  <td>{item.color}</td>
                  <td>{item.pantone_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPageNumbers()}
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span> Page {currentPage} </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === apiData.total_pages}>
              Next Page
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyProject;
