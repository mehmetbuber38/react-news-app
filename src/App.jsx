import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchParam, setSearchParam] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchParam) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    axios.get("https://api.newscatcherapi.com/v2/search", {
      params: {
        q: searchParam
      },
      headers: {
        "x-api-key": "6B_uwVLsxw3NRu-q8ehinM407PnTFviTyFWUFsBSicg"
      }
    })
      .then(response => {
        console.log(response.data);
        setData(response.data.articles);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setSearchParam(e.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
<div className="container grid grid-cols-4 gap-4">
  <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <input className="grid grid-cols-1 md:grid-cols-6" type="text" onChange={handleInputChange} />
    <button onClick={handleSearch}>Search</button>
      {data &&
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <h3 class="mb-3 font-normal text-gray-500 dark:text-gray-400">Title: {item.title}</h3>
              <h3 class="mb-3 font-normal text-gray-500 dark:text-gray-400">Author: {item.author}</h3>
              {/* <h3>Publiched Date: {item.published_date}</h3> */}
            </li>
          ))}
        </ul>
      }
    </div>
    </div>
  );
}

export default App;



