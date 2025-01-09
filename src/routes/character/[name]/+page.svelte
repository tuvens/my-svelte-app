<script lang="ts">
    export let data: { name?: string };

    // Log the raw value of `data.name`
    console.log('data.name:', data.name);

    if (['weather', 'about', 'jokes'].includes(data.name?.toLowerCase() || '')) {
    throw new Error(`${data.name} is not a valid dynamic route`);
    }


    // Use a fallback name if "name" is undefined
    let name = data.name || 'Stranger';

    // Log the final value of `name` after applying the fallback
    console.log('name:', name);

  let images: { [key: string]: string } = {
    jon: '/images/stark.jpg',
    daenerys: '/images/targaryen.jpg',
    arya: '/images/arya.jpg'
  };
  
 // Default image if name not found
 let image = images[name.toLowerCase()] || '/images/stranger.jpg';

// Function to capitalize the first letter of a name
function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Capitalize the name for display purposes
let displayName = capitalizeFirstLetter(name);
  </script>
  
  <h1>Welcome, {displayName}, you know nothing!</h1>
  <p>Your favorite house in Game of Thrones is... Stark!</p>
  <img src="{image}" alt="{name}" style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 20px;" />

  <p>This is a dynamic route where the name in the URL determines the content.</p>

  <a href="/">Go back home</a>
  