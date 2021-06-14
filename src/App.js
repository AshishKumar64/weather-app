import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(position =>  {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
  }, [lat, long]);

  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=0cdb5f0b19f2ccd7b04133b0ddb8765b`
    const response =  await fetch(url).then(response => response.json());
    setWeather(response);
    console.log(response)
  }
  const search = evt => {
    console.log(query)
    if (evt.key === "Enter") {
       fetchApi();
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
