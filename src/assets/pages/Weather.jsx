import React, { useState } from "react";
import vid from "./vid.mp4";
import axios from "axios";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { RiLoaderFill } from "react-icons/ri";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const Weather = () => {
  const [value, setValue] = useState("");
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=560e83ebb4dea4c42c7524194c3aaeb5`
      );
      setLoading(false);
      setTemp(resp.data.main.temp);
      setCity(resp.data.name);
      setDesc(resp.data.weather[0].description);
      setHumidity(resp.data.main.humidity);
      setWind(resp.data.wind.speed);
      setError("");
    } catch (error) {
      setError("City not found. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-screen w-full flex justify-center items-center bg-gray-100">
        <div>
          <video
            src={vid}
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 h-full w-full object-cover"
          ></video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
        <div className="absolute p-6 bg-white bg-opacity-90 rounded-lg shadow-xl w-full max-w-md mx-auto text-center">
          <div className="mb-6">
            <TiWeatherWindyCloudy className="text-5xl text-gray-700 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-800">Weather App</h1>
          </div>
          <input
            type="text"
            className="w-full p-3 border rounded-md text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            placeholder="Enter City Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md text-lg hover:bg-blue-600 transition-colors"
            onClick={getWeather}
          >
            {loading ? (
              <RiLoaderFill className="animate-spin text-2xl mx-auto" />
            ) : (
              "Check Weather"
            )}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {temp && (
            <div className="mt-6 text-gray-800">
              <h2 className="text-2xl font-bold">{city}</h2>
              <p className="text-xl text-orange-500">{temp}°C</p>
              <p className="capitalize text-orange-600 font-semibold">{desc}</p>
              <div className="flex justify-around mt-4 text-lg">
                <div className="flex items-center">
                  <WiHumidity className="text-2xl text-sky-500" />
                  <p className="ml-2"><span className="text-sky-700">{humidity}%</span></p>
                </div>
                <div className="flex items-center">
                  <WiStrongWind className="text-2xl text-cyan-600" />
                  <p className="ml-2 text-cyan-800">{wind} m/s</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
