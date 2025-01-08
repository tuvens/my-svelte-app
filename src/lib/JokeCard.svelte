<script>
    export let joke; // This lets us pass the joke text into the component
  </script>
  
  <div class="joke-card">
    <p>{joke}</p>
  </div>
  
  <style>
    .joke-card {
      padding: 1em;
      margin: 1em 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
  </style>
  