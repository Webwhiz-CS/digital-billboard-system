import { useEffect, useState } from 'react';

export default function MyAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const email = prompt("Enter your email to fetch your ads:");
    fetch('/api/ads/fetch?email=' + email)
      .then(res => res.json())
      .then(data => setAds(data.ads));
  }, []);

  return (
    <div>
      <h2>My Advertisements</h2>
      {ads.length > 0 ? (
        ads.map(ad => (
          <div key={ad.id}>
            <h3>{ad.title}</h3>
            <p>{ad.date} - {ad.timeSlot}</p>
            <p>{ad.mediaType}</p>
            <p>Status: {ad.status}</p>
          </div>
        ))
      ) : <p>No ads found.</p>}
    </div>
  );
}
