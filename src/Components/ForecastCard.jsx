import React from 'react';

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString();
  
  return (
    <div className="border border-purple-200 rounded-xl p-6 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 max-w-sm">
      <h3 className="text-xl font-semibold text-purple-800 mb-3">{date}</h3>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-purple-600">
            <span className="font-medium">Temperature:</span>{' '}
            <span className="text-purple-800">{forecast.main.temp} °C</span>
          </p>
          <p className="text-purple-600">
            <span className="font-medium">Condition:</span>{' '}
            <span className="text-purple-800 capitalize">{forecast.weather[0].description}</span>
          </p>
        </div>
        <img 
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
          alt="Weather Icon"
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default ForecastCard;