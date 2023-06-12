import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import './App.css';
import  "./styles/App.scss"



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
        "x-api-key": config.apiKey
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
    <div className="container  grid grid-cols-4 gap-4">
      <div className='search'>
        <h3 className='search__title'>Search Api's</h3>
      <input className="search__input grid grid-cols-1 md:grid-cols-6" type="text" onChange={handleInputChange} />
      <button className='search__button' onClick={handleSearch}>Search</button>
      </div>
      {data && data.map((item, index) => (
        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.author}</p>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;




