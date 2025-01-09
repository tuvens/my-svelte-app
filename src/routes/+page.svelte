<script>
  let count = 0;
</script>
 
<h1>Home</h1>
<a href="/about">About</a>
<p>Current count: {count}</p>
<button on:click={() => count++}>Click to increase</button>
<button on:click={() => count--}>Click to decrease</button>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<ul>
  <li><a href="/character/jon">Winterfell</a></li>
  <li><a href="/character/arya">The Wall</a></li>
  <li><a href="/character/daenerys">Dragonglass</a></li>
</ul>

<button on:click={() => alert('Winter is coming!')}>
  Click me
</button>    

<style>
  h1 {
    color: #2a9d8f;
    font-family: Arial, sans-serif;
  }

  p {
    font-size: 18px;
    color: #264653;
  }

  ul {
    list-style-type: square;
  }

  button {
    margin: 5px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #e76f51;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #f4a261;
  }
</style>