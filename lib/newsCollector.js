// Automated News Collector
// Fetches news from 100+ global sources via RSS

import { newsSources } from '../config/newsSources.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

// RSS Parser using Axios and Cheerio (no external dependencies)
class NewsCollector {
  constructor() {
    this.collectedNews = [];
    this.errors = [];
    this.maxArticlesPerSource = 10; // Limit per source to avoid overload
  }

  // Parse RSS feed manually using Cheerio
  async parseRSSFeed(url, sourceName) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BishwaBanglaNews/1.0)'
        }
      });

      const $ = cheerio.load(response.data, { xmlMode: true });
      const articles = [];

      // Parse RSS items
      $('item').each((index, element) => {
        if (index >= this.maxArticlesPerSource) return false;

        const $item = $(element);
        const title = $item.find('title').text().trim();
        const link = $item.find('link').text().trim();
        const description = $item.find('description').text().trim();
        const pubDate = $item.find('pubDate').text().trim();
        const category = $item.find('category').text().trim();

        // Clean description (remove HTML tags)
        const cleanDescription = this.cleanHtml(description);

        if (title && link) {
          articles.push({
            title,
            link,
            description: cleanDescription,
            pubDate: this.parseDate(pubDate),
            category: category || 'general',
            source: sourceName,
            collectedAt: new Date().toISOString(),
            id: this.generateId(title, link)
          });
        }
      });

      return articles;
    } catch (error) {
      console.error(`Error fetching ${sourceName}:`, error.message);
      this.errors.push({
        source: sourceName,
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      return [];
    }
  }

  // Clean HTML content
  cleanHtml(text) {
    if (!text) return '';
    
    // Remove HTML tags
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    return cleanText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();
  }

  // Parse publication date
  parseDate(dateString) {
    if (!dateString) return new Date().toISOString();
    
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  // Generate unique article ID
  generateId(title, link) {
    const combined = (title + link).toLowerCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Collect news from a specific region
  async collectFromRegion(regionName) {
    const region = newsSources[regionName];
    if (!region) {
      console.error(`Region ${regionName} not found`);
      return [];
    }

    console.log(`Collecting news from ${regionName} (${region.length} sources)...`);
    
    const promises = region.map(source => 
      this.parseRSSFeed(source.url, source.name)
        .then(articles => articles.map(article => ({
          ...article,
          sourceCountry: source.country,
          sourceLanguage: source.language,
          sourceCredibility: source.credibility,
          sourceCategory: source.category
        })))
    );

    const results = await Promise.allSettled(promises);
    
    const articles = results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value);

    console.log(`Collected ${articles.length} articles from ${regionName}`);
    return articles;
  }

  // Collect news from all sources
  async collectAllNews() {
    console.log('Starting global news collection...');
    this.collectedNews = [];
    this.errors = [];

    const regions = Object.keys(newsSources);
    const allPromises = regions.map(region => this.collectFromRegion(region));
    
    const results = await Promise.allSettled(allPromises);
    
    // Combine all articles
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        this.collectedNews.push(...result.value);
      } else {
        console.error(`Error collecting from ${regions[index]}:`, result.reason);
      }
    });

    // Remove duplicates based on title similarity
    this.collectedNews = this.removeDuplicates(this.collectedNews);
    
    // Sort by publication date (newest first)
    this.collectedNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    console.log(`Total articles collected: ${this.collectedNews.length}`);
    console.log(`Errors encountered: ${this.errors.length}`);

    return {
      articles: this.collectedNews,
      errors: this.errors,
      stats: this.getCollectionStats()
    };
  }

  // Remove duplicate articles
  removeDuplicates(articles) {
    const seen = new Set();
    return articles.filter(article => {
      // Create a signature based on title (first 50 chars)
      const signature = article.title.substring(0, 50).toLowerCase().trim();
      
      if (seen.has(signature)) {
        return false;
      }
      
      seen.add(signature);
      return true;
    });
  }

  // Get collection statistics
  getCollectionStats() {
    const stats = {
      totalArticles: this.collectedNews.length,
      errorCount: this.errors.length,
      sourceBreakdown: {},
      categoryBreakdown: {},
      languageBreakdown: {},
      countryBreakdown: {}
    };

    this.collectedNews.forEach(article => {
      // Source breakdown
      stats.sourceBreakdown[article.source] = 
        (stats.sourceBreakdown[article.source] || 0) + 1;

      // Category breakdown
      stats.categoryBreakdown[article.sourceCategory] = 
        (stats.categoryBreakdown[article.sourceCategory] || 0) + 1;

      // Language breakdown
      stats.languageBreakdown[article.sourceLanguage] = 
        (stats.languageBreakdown[article.sourceLanguage] || 0) + 1;

      // Country breakdown
      stats.countryBreakdown[article.sourceCountry] = 
        (stats.countryBreakdown[article.sourceCountry] || 0) + 1;
    });

    return stats;
  }

  // Get latest news by category
  getNewsByCategory(category, limit = 20) {
    return this.collectedNews
      .filter(article => article.sourceCategory === category)
      .slice(0, limit);
  }

  // Get news by country (for diaspora sections)
  getNewsByCountry(country, limit = 20) {
    return this.collectedNews
      .filter(article => article.sourceCountry === country)
      .slice(0, limit);
  }

  // Get high-credibility news only
  getHighCredibilityNews(minCredibility = 8, limit = 50) {
    return this.collectedNews
      .filter(article => article.sourceCredibility >= minCredibility)
      .slice(0, limit);
  }

  // Search articles by keyword
  searchArticles(keyword, limit = 20) {
    const searchTerm = keyword.toLowerCase();
    return this.collectedNews
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit);
  }
}

// Export singleton instance
export const newsCollector = new NewsCollector();

// Utility function for API routes
export async function collectLatestNews() {
  try {
    const result = await newsCollector.collectAllNews();
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('News collection failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
