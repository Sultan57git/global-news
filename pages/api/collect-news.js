// Automated News Collection & Translation API
// This API runs the entire automation: RSS → Translation → Storage

const { newsCollector } = require('../../lib/newsCollector.js');
const { translator } = require('../../lib/translator.js');

// In-memory storage (will be replaced with database later)
let newsDatabase = {
  articles: [],
  lastUpdated: null,
  stats: {}
};

module.exports = async function handler(req, res) {
  // Set CORS headers for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    console.log('🚀 Starting automated news collection and translation...');

    // Step 1: Collect news from all RSS sources
    console.log('📰 Step 1: Collecting news from global sources...');
    const collectionResult = await newsCollector.collectAllNews();
    
    if (!collectionResult.articles || collectionResult.articles.length === 0) {
      return res.status(500).json({
        success: false,
        error: 'No articles collected',
        details: collectionResult.errors
      });
    }

    console.log(`✅ Collected ${collectionResult.articles.length} articles`);

    // Step 2: Filter for recent articles (last 24 hours)
    const recentArticles = filterRecentArticles(collectionResult.articles);
    console.log(`📅 Filtered to ${recentArticles.length} recent articles`);

    // Step 3: Translate articles to Bangla
    console.log('🔄 Step 2: Translating articles to Bangla...');
    const translationResult = await translator.translateArticles(recentArticles);
    
    console.log(`✅ Translation completed: ${translationResult.stats.translated} translated`);

    // Step 4: Store in memory (temporary solution)
    newsDatabase.articles = translationResult.articles;
    newsDatabase.lastUpdated = new Date().toISOString();
    newsDatabase.stats = {
      collection: collectionResult.stats,
      translation: translationResult.stats,
      processingTime: Date.now() - startTime
    };

    // Step 5: Generate response
    const response = {
      success: true,
      message: 'News collection and translation completed successfully',
      data: {
        totalArticles: translationResult.articles.length,
        translated: translationResult.stats.translated,
        fromCache: translationResult.stats.fromCache,
        errors: translationResult.errors.length,
        categories: getCategoryBreakdown(translationResult.articles),
        regions: getRegionBreakdown(translationResult.articles),
        lastUpdated: newsDatabase.lastUpdated,
        processingTime: `${Math.round((Date.now() - startTime) / 1000)}s`
      },
      // Include sample articles for verification
      samples: translationResult.articles.slice(0, 5).map(article => ({
        title: article.title,
        originalTitle: article.originalTitle,
        source: article.source,
        country: article.sourceCountry,
        translated: article.translation?.titleSuccess || false
      }))
    };

    console.log(`🎉 Process completed in ${response.data.processingTime}`);

    res.status(200).json(response);

  } catch (error) {
    console.error('❌ News collection failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'News collection and translation failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

// Filter articles from last 24 hours
function filterRecentArticles(articles) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  return articles.filter(article => {
    const pubDate = new Date(article.pubDate);
    return pubDate >= oneDayAgo;
  });
}

// Get category breakdown for statistics
function getCategoryBreakdown(articles) {
  const breakdown = {};
  
  articles.forEach(article => {
    const category = article.sourceCategory || 'general';
    breakdown[category] = (breakdown[category] || 0) + 1;
  });
  
  return breakdown;
}

// Get region breakdown for statistics
function getRegionBreakdown(articles) {
  const breakdown = {};
  
  articles.forEach(article => {
    const country = article.sourceCountry || 'unknown';
    breakdown[country] = (breakdown[country] || 0) + 1;
  });
  
  return breakdown;
}

// Export functions for other APIs to use
module.exports.newsDatabase = newsDatabase;
