export default async function handler(req, res) {
  try {
    // Test 1: Basic response
    console.log('API called');
    
    // Test 2: Try importing news sources
    const { newsSources } = await import('../../config/newsSources.js');
    console.log('News sources loaded:', Object.keys(newsSources).length);
    
    // Test 3: Try one RSS feed
    const axios = await import('axios');
    const response = await axios.default.get('https://feeds.bbci.co.uk/news/rss.xml', { timeout: 5000 });
    
    res.status(200).json({
      success: true,
      message: 'Debug test successful',
      rssLength: response.data.length,
      sourceCount: Object.keys(newsSources).length
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
