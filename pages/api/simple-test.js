export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Simple API is working!',
    platform: 'Netlify',
    timestamp: new Date().toISOString()
  });
}
