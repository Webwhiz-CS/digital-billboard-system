import { useState } from 'react';

export default function UploadAd() {
  const [form, setForm] = useState({
    title: '',
    mediaType: 'image',
    mediaUrl: '',
    date: '',
    timeSlot: '',
    userEmail: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/ads/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Upload Your Advertisement</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Ad Title" onChange={handleChange} />
        <select name="mediaType" onChange={handleChange}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input name="mediaUrl" placeholder="Image/Video URL" onChange={handleChange} />
        <input type="date" name="date" onChange={handleChange} />
        <select name="timeSlot" onChange={handleChange}>
          <option value="9am-11am">9am-11am</option>
          <option value="12pm-2pm">12pm-2pm</option>
          <option value="4pm-6pm">4pm-6pm</option>
        </select>
        <input name="userEmail" placeholder="Your Email" onChange={handleChange} />
        <button type="submit">Submit Ad</button>
      </form>
    </div>
  );
}
