// News API - Serves translated news to frontend
// Provides filtered and organized news for website display

import { newsDatabase } from './collect-news.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      category, 
      country, 
      region, 
      limit = 20, 
      page = 1,
      search,
      credibility = 0
    } = req.query;

    let articles = newsDatabase.articles || [];

    // If no articles, return empty but valid response
    if (articles.length === 0) {
      return res.status(200).json({
        success: true,
        articles: [],
        total: 0,
        page: parseInt(page),
        limit: parseInt(limit),
        message: 'No articles available. Run /api/collect-news to fetch latest news.',
        lastUpdated: newsDatabase.lastUpdated
      });
    }

    // Filter by category
    if (category && category !== 'all') {
      articles = articles.filter(article => 
        article.sourceCategory === category
      );
    }

    // Filter by country
    if (country && country !== 'all') {
      articles = articles.filter(article => 
        article.sourceCountry === country
      );
    }

    // Filter by region (for diaspora news)
    if (region && region !== 'all') {
      const regionCountries = getCountriesForRegion(region);
      articles = articles.filter(article => 
        regionCountries.includes(article.sourceCountry)
      );
    }

    // Filter by minimum credibility
    if (credibility > 0) {
      articles = articles.filter(article => 
        article.sourceCredibility >= parseInt(credibility)
      );
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.originalTitle?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by publication date (newest first)
    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedArticles = articles.slice(startIndex, endIndex);

    // Format articles for frontend
    const formattedArticles = paginatedArticles.map(article => ({
      id: article.id,
      title: article.title,
      originalTitle: article.originalTitle,
      description: article.description,
      originalDescription: article.originalDescription,
      link: article.link,
      pubDate: article.pubDate,
      source: article.source,
      sourceCountry: article.sourceCountry,
      sourceLanguage: article.sourceLanguage,
      category: article.sourceCategory,
      credibility: article.sourceCredibility,
      translation: {
        translated: article.translation?.titleSuccess || false,
        service: article.translation?.service,
        translatedAt: article.translation?.translatedAt
      }
    }));

    // Response with metadata
    const response = {
      success: true,
      articles: formattedArticles,
      pagination: {
        total: articles.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(articles.length / parseInt(limit)),
        hasNext: endIndex < articles.length,
        hasPrev: parseInt(page) > 1
      },
      filters: {
        category: category || 'all',
        country: country || 'all',
        region: region || 'all',
        credibility: parseInt(credibility),
        search: search || null
      },
      meta: {
        lastUpdated: newsDatabase.lastUpdated,
        totalInDatabase: newsDatabase.articles?.length || 0,
        availableCategories: getAvailableCategories(),
        availableCountries: getAvailableCountries(),
        availableRegions: getAvailableRegions()
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('News API error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Helper functions
function getCountriesForRegion(region) {
  const regionMap = {
    'north-america': ['USA', 'Canada'],
    'europe': ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Russia'],
    'middle-east': ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Israel'],
    'asia': ['India', 'Pakistan', 'China', 'Japan', 'South Korea', 'Thailand', 'Malaysia', 'Singapore'],
    'africa': ['South Africa', 'Nigeria', 'Ghana', 'Uganda'],
    'oceania': ['Australia', 'New Zealand'],
    'south-america': ['Brazil', 'Argentina']
  };
  
  return regionMap[region] || [];
}

function getAvailableCategories() {
  if (!newsDatabase.articles) return [];
  
  const categories = new Set();
  newsDatabase.articles.forEach(article => {
    if (article.sourceCategory) {
      categories.add(article.sourceCategory);
    }
  });
  
  return Array.from(categories).sort();
}

function getAvailableCountries() {
  if (!newsDatabase.articles) return [];
  
  const countries = new Set();
  newsDatabase.articles.forEach(article => {
    if (article.sourceCountry) {
      countries.add(article.sourceCountry);
    }
  });
  
  return Array.from(countries).sort();
}

function getAvailableRegions() {
  return [
    'north-america',
    'europe', 
    'middle-east',
    'asia',
    'africa',
    'oceania',
    'south-america'
  ];
}
