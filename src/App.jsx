import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';
import ThemeToggle from './Components/ThemeToggle';
import ForecastCard from './Components/ForecastCard';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [theme, setTheme] = useState('light');

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23d6f4b3a6f4c0db389ba701c314e07a&units=metric`);
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=23d6f4b3a6f4c0db389ba701c314e07a&units=metric`);
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found');
      }
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list.filter((_, index) => index % 8 === 0));

      setRecentSearches((prev) => {
        const updatedSearches = [city, ...prev.filter((item) => item !== city)];
        return updatedSearches.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleRefresh = () => {
    if (weatherData) {
      fetchWeather(weatherData.name);
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`container mx-auto p-6 min-h-screen ${
      theme === 'dark' 
        ? 'bg-black text-purple-400' 
        : 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900'
    }`}>
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 dark:text-purple-300 tracking-tight">
        Weather Dashboard
      </h1>
      <div className="flex justify-center mb-8">
        <ThemeToggle toggleTheme={toggleTheme} isDark={theme === 'dark'} />
      </div>
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={fetchWeather} />
      </div>
      <div className="mb-8">
        <WeatherCard weatherData={weatherData} loading={loading} error={error} onRefresh={handleRefresh} />
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-800 dark:text-purple-300">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forecastData.map((forecast, index) => (
          <ForecastCard key={index} forecast={forecast} />
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-800 dark:text-purple-300">
        Recent Searches
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        {recentSearches.map((city, index) => (
          <li 
            key={index} 
            className="cursor-pointer text-purple-700 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-200 transition-colors duration-200"
            onClick={() => fetchWeather(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;