
const weatherFormEl = document.querySelector(".weather-form");
const locationInputEl = document.querySelector(".weather-form__input");
const weatherDataContainerEl = document.querySelector(".weather-data");
const defaultLocation = "Lome";


weatherFormEl.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const enteredLocation = locationInputEl.value.trim(); 

  if (enteredLocation === "") {
    
    weatherDataContainerEl.textContent = "Please enter a valid location";
  } else {
    
    displayWeatherData(enteredLocation).catch(handleError); 
  }
});


const createWeatherDiv = (className, textContent) => {
  const weatherDiv = document.createElement("div"); 
  weatherDiv.classList.add(className); 
  weatherDiv.textContent = textContent; 
  return weatherDiv;
};


const displayWeatherData = (location) => {
  const API_KEY = "3d1853a7fd9b499794571220230607";

  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json(); 
    })
    .then((data) => {
      
      weatherDataContainerEl.textContent = "";

      
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("weather-card");

      
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("weather-card__body");

      
      const cityDiv = createWeatherDiv(
        "weather-data__city",
        data.location.name
      );
      const humidityDiv = createWeatherDiv("weather-data__humidity");
      humidityDiv.innerHTML = `<i class="fas fa-droplet"></i> ${data.current.humidity}%`;
      const currentWeatherDiv = createWeatherDiv(
        "weather-data__current-weather",
        data.current.condition.text
      );
      const last_updated = data.current.last_updated;
      const timeString = last_updated.split(" ")[1];
      const updatedAtDiv = createWeatherDiv(
        "weather-data__updated-at",
        `Updated at : ${timeString}`
      );
      const windDiv = createWeatherDiv("weather-data__wind");
      windDiv.innerHTML = `<i class="fas fa-wind"></i> ${data.current.wind_kph} km/h ${data.current.wind_dir}`;

      
      const temperatureDivC = createWeatherDiv(
        "weather-data__temperature",
        `${data.current.temp_c}°C`
      );
      const temperatureDivF = createWeatherDiv(
        "weather-data__temperature",
        `${data.current.temp_f}°F`
      );
      
      temperatureDivF.style.display = "none";

      

      
      const weatherIconUrl = data.current.condition.icon;
      const weatherIconEl = document.createElement("img");
      weatherIconEl.src = weatherIconUrl;
      weatherIconEl.style.width = "90px";
      weatherIconEl.classList.add("weather-data__icon");

      
      cardBodyDiv.appendChild(cityDiv);
      cardBodyDiv.appendChild(updatedAtDiv);
      cardBodyDiv.appendChild(weatherIconEl); 
      cardBodyDiv.appendChild(temperatureDivC);
      cardBodyDiv.appendChild(temperatureDivF);
      cardBodyDiv.appendChild(currentWeatherDiv);
      cardBodyDiv.appendChild(humidityDiv);
      cardBodyDiv.appendChild(windDiv);

      
      cardDiv.appendChild(cardBodyDiv);

      
      weatherDataContainerEl.appendChild(cardDiv);

      
      gsap.fromTo(
        cardDiv,
        {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "bottom",
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.2,
        }
      );


    });
};


const handleError = (error) => {
  console.error("Error:", error); 

  
  weatherDataContainerEl.textContent =
    "Error occurred while fetching weather data, check the spelling.";
};

displayWeatherData(defaultLocation);
