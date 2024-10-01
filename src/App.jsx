import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(''); 
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchImage = async () => {
    const options = {
      method: 'POST',
      url: 'https://text-to-image13.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_MY_API_KEY,
        'x-rapidapi-host': 'text-to-image13.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        prompt: textInput
      },
      responseType: 'arraybuffer'  // Expect binary data
    };
    
    setLoading(true);
    setImage('');
    setError(null);

    try {
      const response = await axios.request(options);
      // console.log('Full Response:', response.data);
      // Convert the binary data to a base64 string
      const base64Image = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      setImage(`data:image/png;base64,${base64Image}`); // Set the image source
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setError('Failed to generate the image. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <div className="app">
      <h1 className='bg-green-400'>Text to Image Generator</h1>

      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter text to generate an image"
      />
      <br />
      <button className="btn" onClick={fetchImage}>Generate Image</button>
      <br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? ( 
        <div>
          <img src="loading.gif" alt="loading" />
          <p>Loading...</p>
        </div>
      ) : image ? (
        <div>
          <h2>Generated Image:</h2>
          <img src={image} alt="Generated" style={{ width: '900px' }} />
        </div>
      ) : null}

    </div>
  );
}

export default App;
