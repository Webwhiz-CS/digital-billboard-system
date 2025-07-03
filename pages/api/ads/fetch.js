import fs from 'fs';
import path from 'path';

const adsFile = path.join(process.cwd(), 'lib', 'ads.json');

export default function handler(req, res) {
  const email = req.query.email;
  const ads = JSON.parse(fs.readFileSync(adsFile));
  const userAds = ads.filter(ad => ad.userEmail === email);
  res.status(200).json({ ads: userAds });
}
