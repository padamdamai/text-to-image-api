import { useState } from 'react';
import './App.css';
import axios from 'axios';
// console.log(import.meta.env.VITE_MY_API_KEY)
function App() {
  const [imageUrl, setImageUrl] = useState(''); // State to hold the generated image URL

  const options = {
    method: 'POST',
    url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_MY_API_KEY, // Ensure your VITE key is properly set
      'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      inputs: 'Find serenity in the tranquil elegance of a solitary sailboat drifting on a glassy lake at sunset',
    },
  };

  const fetchImage = async () => {
    try {
      const response = await axios.request(options); // Use options, not fetchData
      console.log(response.data); // Inspect the API response structure

      // Assuming the image URL is in response.data.image or similar
      setImageUrl(response.data.image); // Set the image URL in state

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      <h1>Image Generator</h1>
      <button className='btn' onClick={fetchImage}>Generate Image</button>
<br />
      {/* Conditionally render the image if the imageUrl exists */}
      {imageUrl && (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default App;
