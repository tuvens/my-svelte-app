<script>
    let username = '';
    let userProfile = null;
    let error = null;
  
    async function fetchGitHubProfile() {
      error = null;
      userProfile = null;
  
      if (!username) {
        error = 'Please enter a GitHub username.';
        return;
      }
  
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
  
        if (!response.ok) throw new Error('User not found.');
  
        userProfile = await response.json();
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  <div>
    <h1>About This App</h1>
    <p>This is a simple app built with SvelteKit!</p>
    <h2>GitHub Profile Lookup</h2>
    <input
      type="text"
      placeholder="Enter GitHub username"
      bind:value={username}
      on:keypress={(e) => e.key === 'Enter' && fetchGitHubProfile()}
    />
    <button on:click={fetchGitHubProfile}>Fetch Profile</button>
  
    {#if userProfile}
      <div>
        <img src={userProfile.avatar_url} alt={userProfile.login} style="width: 100px; border-radius: 50%;" />
        <h2>{userProfile.name}</h2>
        <p>{userProfile.bio}</p>
        <a href={userProfile.html_url} target="_blank">View on GitHub</a>
      </div>
    {:else if error}
      <p>{error}</p>
    {/if}
  </div>
  