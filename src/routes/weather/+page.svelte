<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

   // Helper function to simulate a delay
   function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Variables to manage the weather data and input
    let city = 'Dublin'; // Default city
    let weather = null; // Holds the weather data
    let unit = (typeof localStorage !== 'undefined' && localStorage.getItem('unit')) || 'metric';
    let forecast = false; // Default to current weather only
    let loading = true; // Indicates loading state
    let error = null; // Holds any error messages
  
    // API key and endpoint
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Load the API key from .env
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // Geolocation logic
    onMount(async () => {
        console.log('Attempting to get user location...');
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const { latitude, longitude } = position.coords;
            console.log('User location retrieved:', { latitude, longitude });

            // Use a reverse geocoding API to get the city name
            const geocodingUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            try {
                const res = await fetch(geocodingUrl);
                const data = await res.json();
                if (data.city) {
                city = data.city; // Update the city variable
                console.log(`Detected city: ${city}`); // Debug log
                fetchWeather(); // Fetch weather for the detected city
                } else {
                console.error('City not found in geocoding response:', data);
                }
            } catch (error) {
                console.error('Error fetching city from location:', error);
            }
            },
            (error) => {
            console.error('Geolocation permission denied or unavailable:', error);
            }
        );
        } else {
        console.error('Geolocation is not supported by this browser.');
        }
    });

    // Watch for changes to the unit and save them to localStorage
    $: {
        if (typeof localStorage !== 'undefined') { // Ensure localStorage exists
            console.log('Saving unit to localStorage:', unit); // Debug
            localStorage.setItem('unit', unit);
        }
    }

    // Fetch weather data
    async function fetchWeather() {
      loading = true;
      error = null;
  
      try {
        const url = forecast
          ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
          : `${baseUrl}?q=${city}&appid=${apiKey}&units=${unit}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Failed to fetch weather data. Check your API key or city name.');
        }

        // Add a delay here to simulate longer loading
        await delay(1500);

        weather = await res.json();
      } catch (err) {
        console.error(err);
        error = err.message;
      } finally {
        loading = false;
      }
    }
  
    // Fetch weather when the component mounts
    onMount(fetchWeather);
  </script>
  
  <style>
    .weather-card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      max-width: 400px;
      margin: 0 auto;
      background-color: #f9f9f9;
      text-align: center;
    }
    input {
      margin: 10px 0;
      padding: 8px;
      width: calc(100% - 20px);
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .options-container {
      margin-bottom: 10px; /* Adds space below the checkbox container */
    }

    /* Align radio buttons (Celsius/Fahrenheit) on a single row */
    .unit-toggle {
      display: flex;
      gap: 10px; /* Adds space between the radio buttons */
      justify-content: center; /* Centers the radio buttons */
      margin-bottom: 10px; /* Adds space below the unit toggle */
    }

    /* Align the checkbox and its label */
    .forecast-toggle {
      text-align: center; /* Centers the checkbox and label */
      margin-bottom: 10px; /* Adds space below the checkbox container */
    }

    .forecast-toggle label {
      display: inline-flex;
      align-items: center; /* Aligns the checkbox and text label vertically */
    }

    button {
      padding: 8px 12px;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px; /* Adds space above the button */
      margin-bottom: 20px; /* Adds space above the button */
    }
    button:hover {
      background-color: #0056b3;
    }

    .weather-content {
        position: relative;
        min-height: 200px; /* Keeps the container height consistent */
        display: flex;
        align-items: center; /* Vertically center content */
        justify-content: center; /* Horizontally center content */
        text-align: center;
    }

    .spinner {
        position: absolute; /* Makes the spinner independent of the fading content */
        border: 4px solid #f3f3f3; /* Light grey */
        border-top: 4px solid #007bff; /* Blue */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1.5s linear infinite; /* Applies the spin animation */
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg); /* Start at 0 degrees */
        }
        100% {
            transform: rotate(360deg); /* Complete a full rotation */
        }
    }

    .error {
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        padding: 10px;
        }
</style>
  
  <div class="weather-card">
    <!-- City Input -->
    <input
      type="text"
      placeholder="Enter city name"
      bind:value={city}
      on:keydown={(e) => e.key === 'Enter' && fetchWeather()}
    />
  
    <!-- Unit Toggle -->
    <div class="options-container">
        <div class="unit-toggle">
            <label>
                <input type="radio" bind:group={unit} value="metric" /> Celsius
            </label>
            <label>
                <input type="radio" bind:group={unit} value="imperial" /> Fahrenheit
            </label>
        </div>
        
        <!-- Forecast Toggle -->
        <div class="forecast-toggle">
            <label>
                <input type="checkbox" bind:checked={forecast} /> 5-day Forecast
            </label>
        </div>
    </div>    

    <button on:click={fetchWeather}>Get Weather</button>

    <!-- Display Weather Information -->
    <div class="weather-content">
        {#if loading}
        <div class="spinner" transition:fade></div>
        {/if}
    
        {#if !loading && (error || weather)}
        <div transition:fade>
            {#if error}
            <div class="error">
                <strong>Error:</strong> {error}
            </div>
            {:else if weather}
            {#if forecast}
                <h2>5-Day Forecast for {city}</h2>
                {#each weather.list.slice(0, 5) as day}
                <p>{new Date(day.dt * 1000).toLocaleDateString()}: {day.main.temp}° ({day.weather[0].description})</p>
                {/each}
            {:else}
                <h2>Weather in {weather.name}</h2>
                <p><strong>Temperature:</strong> {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                <p><strong>Wind Speed:</strong> {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
            {/if}
            {/if}
        </div>
        {/if}
    </div>        
  </div>
  