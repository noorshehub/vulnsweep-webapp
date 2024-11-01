import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://e6ajtwdi4j.execute-api.us-east-1.amazonaws.com/prod/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const parsedResult = JSON.parse(data.body); // Parse the JSON string in 'body'
      console.log("Parsed result:", parsedResult);  // Log the parsed result
      setResult(parsedResult); // Set the parsed result
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>VulnSweep</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputUrl} 
          onChange={(e) => setInputUrl(e.target.value)} 
          placeholder="Enter URL to scan" 
        />
        <button type="submit">Scan</button>
      </form>
      {loading && <p className="loading-text">Scanning...</p>}
      {result && (
  <div className="result-card">
    <h2>Scan Results</h2>
    <div className="result-field" data-tooltip="The URL you scanned">
      <strong>URL:</strong> <span>{result.url}</span>
    </div>
    <div className="result-field" data-tooltip="The IP address associated with the URL">
      <strong>IP Address:</strong> <span>{result.ip_address}</span>
    </div>
    <div className="result-field" data-tooltip="Open ports found during the scan">
      <strong>Open Ports:</strong> <span>{result.open_ports ? result.open_ports.join(', ') : 'No open ports found'}</span>
    </div>
  </div>
)}
    </div>
  );
}

export default App;