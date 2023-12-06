import React, { useEffect, useState } from 'react'
import "../../styles/overview_css/WeatherInfo.css"

function WeatherInfo() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const apiKey = "1ebe51c7175bcc287fafb88b19855d10";
    const baseURL = "https://api.openweathermap.org/data/2.5"

    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    const fetchWeather = (searchQuery) => {
        fetch(`${baseURL}/weather?q=${searchQuery}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
            }
            );
    }

    //refetch in 10 mins
    useEffect(() => {
        fetchWeather("horsens");

        //set the time interval to refetch the data
        const intervalId = setInterval(() => {
            fetchWeather("horsens");
        }, 60000);

        return () => {
            clearInterval(intervalId);
        }

    }, [])

    //handle search
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            fetchWeather(query);
            setQuery("");

        };
    }

    const weatherType = () =>{
        if(typeof weather.main !== "undefined"){
            
            if (weather.weather[0].main === "Snow"){
                return "weatherMain snowy";
            } else if (weather.weather[0].main === "Clouds"){
                return "weatherMain";
            } else {
                return "weatherMain sunny";
            }
        }
    }
    console.log(weather)

    return (
        <>

            <div className="weatherApp">
                <main className={weatherType()}>
                    <div className="searchBox">
                        <input
                            type="text"
                            className="searchBar"
                            placeholder="Search..."
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    {typeof weather.main !== "undefined" &&
                        (<div>
                            <div className="locationBox">
                                <div className="location">{weather.name}, {weather.sys.country}</div>
                                <div className="date">{formatDate(new Date())}</div>
                            </div>
                            <div className="weatherBox">
                                <div className="temperature">{Math.round(weather.main.temp)} ºC</div>
                                <div className="weather">{weather.weather[0].main}</div>
                            </div>
                        </div>)}
                </main>

            </div>
        </>
    )
    
}

export {WeatherInfo}
