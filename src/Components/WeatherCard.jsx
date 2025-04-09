import React from 'react';
import { WiThermometer, WiStrongWind, WiHumidity, WiCloud } from 'react-icons/wi';

const WeatherCard = ({ weatherData, loading, error, onRefresh }) => {
  if (loading) {
    return <div className="text-center text-lg font-semibold text-purple-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center text-lg font-semibold">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center text-lg font-semibold text-purple-800">No weather data available.</div>;
  }

  return (
    <div className="border border-purple-200 rounded-xl p-6 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:bg-gradient-to-br dark:from-purple-900 dark:to-purple-800 transition duration-300 ease-in-out max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-800 dark:text-purple-100">{weatherData.name}</h2>
      <div className="flex justify-center items-center mb-4">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
          alt="Weather Icon" 
          className="w-24 h-24"
        />
      </div>
      <div className="space-y-3">
        <p className="text-lg text-center text-purple-700 dark:text-purple-200 flex items-center justify-center">
          <WiThermometer className="w-6 h-6 mr-2" />
          Temperature: <span className="font-semibold text-purple-900 dark:text-purple-50 ml-1">{weatherData.main.temp} °C</span>
        </p>
        <p className="text-lg text-center text-purple-700 dark:text-purple-200 flex items-center justify-center">
          <WiCloud className="w-6 h-6 mr-2" />
          Condition: <span className="font-semibold capitalize text-purple-900 dark:text-purple-50 ml-1">{weatherData.weather[0].description}</span>
        </p>
        <p className="text-lg text-center text-purple-700 dark:text-purple-200 flex items-center justify-center">
          <WiHumidity className="w-6 h-6 mr-2" />
          Humidity: <span className="font-semibold text-purple-900 dark:text-purple-50 ml-1">{weatherData.main.humidity} %</span>
        </p>
        <p className="text-lg text-center text-purple-700 dark:text-purple-200 flex items-center justify-center">
          <WiStrongWind className="w-6 h-6 mr-2" />
          Wind Speed: <span className="font-semibold text-purple-900 dark:text-purple-50 ml-1">{weatherData.wind.speed} km/h</span>
        </p>
      </div>
      <button 
        onClick={onRefresh} 
        className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Refresh
      </button>
    </div>
  );
};

export default WeatherCard;