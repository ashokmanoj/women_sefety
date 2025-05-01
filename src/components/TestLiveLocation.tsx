import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestLiveLocation: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  console.log("Sending request to OpenCage with key:", import.meta.env.VITE_GEOCODE_API_KEY);
  
  

  const fetchAddress = async (latitude: number, longitude: number) => {
    console.log("API Key:", import.meta.env.VITE_GEOCODE_API_KEY);

    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          key: import.meta.env.VITE_GEOCODE_API_KEY,
          q: `${latitude},${longitude}`,
          
        },
        
      });

      console.log("Coordinates:", latitude, longitude);

      console.log("OpenCage response:", response.data);


      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted || 'Unknown location');
      } else {
        setAddress('Address not found');
      }
    } catch (err: any) {
      console.error("Address fetch error:", err);
      setError('Failed to fetch address: ' + err.message);
    }
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported in your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
        setError('');
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError('Failed to get location: ' + err.message);
      }
    );
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Test Live Location</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {location ? (
        <div>
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
          <p><strong>Address:</strong> {address || 'Fetching...'}</p>
        </div>
      ) : (
        !error && <p>Getting your location...</p>
      )}
    </div>
  );
};

export default TestLiveLocation;
