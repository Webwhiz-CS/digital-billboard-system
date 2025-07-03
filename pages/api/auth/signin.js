import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersFile = path.join(process.cwd(), 'lib', 'users.json');
const JWT_SECRET = 'your_secret_key';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!fs.existsSync(usersFile)) return res.status(404).json({ message: 'No users found' });

  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
}
