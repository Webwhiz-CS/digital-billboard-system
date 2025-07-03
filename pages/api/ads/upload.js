import fs from 'fs';
import path from 'path';

const adsFile = path.join(process.cwd(), 'lib', 'ads.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, mediaType, mediaUrl, date, timeSlot, userEmail } = req.body;

  const newAd = {
    id: Date.now(),
    title,
    mediaType,
    mediaUrl,
    date,
    timeSlot,
    userEmail,
    status: "pending"
  };

  let ads = [];
  if (fs.existsSync(adsFile)) {
    ads = JSON.parse(fs.readFileSync(adsFile));
  }

  ads.push(newAd);
  fs.writeFileSync(adsFile, JSON.stringify(ads, null, 2));
  res.status(201).json({ message: "Ad uploaded successfully", ad: newAd });
}
