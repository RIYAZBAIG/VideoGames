import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameList from '../components/GameList';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  console.log('HomePage component rendering');

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');

    const fetchGames = async () => {
      console.log('Fetching games from API');

      try {
        // const response = await axios.get('http://localhost:3000/api/games');
        const response = await axios.get('https://freetestapi.com/api/v1/actresses?sort=name&order=dec');

        console.log('API response:', response.data);

        setGames(response.data);
        setFilteredGames(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (query, score, orderBy) => {
    console.log('Search triggered with query:', query, 'score:', score, 'orderBy:', orderBy);

    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase()) &&
      game.rating >= score
    );

    if (orderBy === 'Release Date') {
      filtered.sort((a, b) => new Date(b.firstReleaseDate) - new Date(a.firstReleaseDate));
    } else if (orderBy === 'Score') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    console.log('Filtered games:', filtered);
    setFilteredGames(filtered);
  };

  return (
    <div className="homepage">
      <div className="header-container">
        <h1 className='home'>Video Games</h1>
        <Link to="/contact">
          <h1 className='home'>Contact</h1>
        </Link>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading games...</p>
      ) : (
        <GameList games={filteredGames} />
      )}
    </div>
  );
};

export default HomePage;
