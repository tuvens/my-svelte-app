<script>
    import { onMount } from 'svelte';
  
    let city = 'Winterfell'; // Default city
    let weather = null; // Holds the weather data
    let loading = true; // Indicates loading state
    let error = null; // Holds any error messages
  
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Load the API key
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  
    async function fetchWeather() {
      loading = true;
      error = null;
  
      try {
        const res = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
  
        weather = await res.json();
      } catch (err) {
        console.error(err);
        error = err.message;
      } finally {
        loading = false;
      }
    }
  
    // Fetch weather when the component loads
    onMount(fetchWeather);
  </script>
  
  <style>
    .weather-card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      max-width: 300px;
      background-color: #f9f9f9;
    }
  </style>
  
  <div class="weather-card">
    {#if loading}
      <p>Loading weather data...</p>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
      <h2>Weather in {city}</h2>
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <p><strong>Condition:</strong> {weather.weather[0].description}</p>
      <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
    {/if}
  </div>
  