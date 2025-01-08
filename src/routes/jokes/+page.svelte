 <script>
    import JokeCard from '$lib/JokeCard.svelte';
  
    let joke = "";
  
    async function fetchJoke() {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any");
      const data = await response.json();
  
      if (data.type === "single") {
        joke = data.joke;
      } else {
        joke = `${data.setup} - ${data.delivery}`;
      }
    }
  </script>
  

  <h1>Random Joke Generator</h1>
  <button on:click={fetchJoke}>Want to hear a joke?</button>
  
  {#if joke}
    <JokeCard joke={joke} />
  {/if}
  