module.exports = async function handler(req, res) {
  res.status(200).json({ 
    message: 'API system is working!',
    timestamp: new Date().toISOString()
  });
}
