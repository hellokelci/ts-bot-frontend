// src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<string>('Loading...');
  const API_URL = "https://apify-service-1019478763982.us-central1.run.app"; 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resultText = await response.text(); 
      setData(resultText);
    };

    fetchData();
  }, []);

  return (
    <div className="container-tsbot">
      <h1>TS-Bot UI</h1>
      <p>This is the extremely minimalist Vite+React frontend for the Python Flask Server hosted on Cloud Run. The raw response from the service route is:</p>

      <p className="service-response">
        {data}
      </p>
    </div>
  );
}

export default App;