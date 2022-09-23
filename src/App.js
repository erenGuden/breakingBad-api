import "./App.css";
import CharacterGrid from "./components/CharacterGrid";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );
      // console.log(result.data)
      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, [query]);

  // Get index for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
