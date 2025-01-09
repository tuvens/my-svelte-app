<script>
  import { darkMode } from '$lib/stores'; // Import the darkMode store

  // Subscribe to the store (makes the variable reactive)
  $: isDarkMode = $darkMode; // Use $darkMode to access the store value
</script>

<header>
    <nav>
      <a href="/">Home</a> | 
      <a href="/about">About</a> |
      <a href="/jokes">Jokes</a> |
      <a href="/weather">Weather</a>
    </nav>
    <button on:click={() => $darkMode = !$darkMode}>
      Toggle {isDarkMode ? 'Dark' : 'Light'} Mode
    </button>    
  </header>
  
  <main class={isDarkMode ? 'dark' : 'light'}>
    <slot />
  </main>
  
  <footer>
    <p>&copy;  {new Date().getFullYear()} My Svelte App</p>
  </footer>
  
  <style>
    header {
      background-color: #264653;
      color: white;
      padding: 1em;
    }
    nav a {
      color: white;
      margin-right: 15px;
      text-decoration: none;
    }
    button {
      margin-left: 20px;
      padding: 5px 10px;
      background-color: #e76f51;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    main.light {
      background-color: white;
      color: black;
    }
    main.dark {
      background-color: black;
      color: white;
    }
    footer {
      margin-top: 2em;
      text-align: center;
    }
  </style>
      
  