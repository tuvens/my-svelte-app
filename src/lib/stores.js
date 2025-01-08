import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Check if we're in the browser

// Check localStorage only in the browser and convert the string to a boolean
const storedDarkMode = browser ? localStorage.getItem('darkMode') === 'true' : false;

// Create a writable store with the initial value
export const darkMode = writable(storedDarkMode);

// Subscribe to changes in the store and save to localStorage as a string
if (browser) {
    darkMode.subscribe((value) => {
      localStorage.setItem('darkMode', String(value)); // Convert the boolean to a string
    });
  }