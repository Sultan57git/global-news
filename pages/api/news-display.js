// LibreTranslate-Only Translation System
// Simple, reliable, unlimited free translation

import axios from 'axios';

class NewsTranslator {
  constructor() {
    this.translationCache = new Map(); // In-memory cache
    this.requestCount = 0;
    this.lastResetTime = Date.now();
    this.maxRequestsPerMinute = 18; // Conservative limit (LibreTranslate allows 20)
  }

  // Check if we can make a request (rate limiting)
  canMakeRequest() {
    const now = Date.now();
    const timePassed = now - this.lastResetTime;
    
    // Reset counter every minute
    if (timePassed >= 60000) {
      this.requestCount = 0;
      this.lastResetTime = now;
      return true;
    }
    
    // Check if under rate limit
    return this.requestCount < this.maxRequestsPerMinute;
  }

  // Wait for rate limit reset
  async waitForRateLimit() {
    const now = Date.now();
    const timePassed = now - this.lastResetTime;
    const waitTime = 60000 - timePassed;
    
    if (waitTime > 0) {
      console.log(`Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
      await this.delay(waitTime);
      this.requestCount = 0;
      this.lastResetTime = Date.now();
    }
  }

  // Translate text using LibreTranslate
  async translateText(text, sourceLang = 'en', targetLang = 'bn') {
    // Skip if already in Bangla
    if (sourceLang === 'bn' || sourceLang === targetLang) {
      return {
        success: true,
        translatedText: text,
        service: 'no-translation-needed',
        sourceLang,
        targetLang
      };
    }

    // Check cache first
    const cacheKey = `${text.substring(0, 100)}_${sourceLang}_${targetLang}`;
    if (this.translationCache.has(cacheKey)) {
      const cached = this.translationCache.get(cacheKey);
      return {
        ...cached,
        fromCache: true
      };
    }

    // Wait if rate limit reached
    if (!this.canMakeRequest()) {
      await this.waitForRateLimit();
    }

    try {
      const response = await axios.post('https://libretranslate.de/translate', {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'BishwaBanglaNews/1.0'
        }
      });

      this.requestCount++;

      if (response.data && response.data.translatedText) {
        const result = {
          success: true,
          translatedText: response.data.translatedText,
          service: 'LibreTranslate',
          sourceLang,
          targetLang
        };

        // Cache successful translation
        this.translationCache.set(cacheKey, result);
        
        // Limit cache size to prevent memory issues
        if (this.translationCache.size > 1000) {
          const firstKey = this.translationCache.keys().next().value;
          this.translationCache.delete(firstKey);
        }
        
        return result;
      } else {
        throw new Error('Invalid response from LibreTranslate');
      }
    } catch (error) {
      console.error('LibreTranslate error:', error.message);
      return {
        success: false,
        error: error.message,
        service: 'LibreTranslate',
        originalText: text
      };
    }
  }

  // Translate article title and description
  async translateArticle(article) {
    try {
      const sourceLang = article.sourceLanguage || 'en';
      
      // Skip if source is already Bangla
      if (sourceLang === 'bn') {
        return {
          success: true,
          article: {
            ...article,
            translation: {
              status: 'already-bangla',
              translatedAt: new Date().toISOString()
            }
          }
        };
      }

      // Translate title
      const titleResult = await this.translateText(
        article.title, 
        sourceLang, 
        'bn'
      );

      // Small delay between requests
      await this.delay(100);

      // Translate description (limit to first 500 chars to avoid very long translations)
      const truncatedDescription = article.description.substring(0, 500);
      const descriptionResult = await this.translateText(
        truncatedDescription, 
        sourceLang, 
        'bn'
      );

      // Create translated article
      const translatedArticle = {
        ...article,
        originalTitle: article.title,
        originalDescription: article.description,
        title: titleResult.success ? titleResult.translatedText : article.title,
        description: descriptionResult.success ? descriptionResult.translatedText : article.description,
        translation: {
          titleSuccess: titleResult.success,
          descriptionSuccess: descriptionResult.success,
          titleFromCache: titleResult.fromCache || false,
          descriptionFromCache: descriptionResult.fromCache || false,
          service: 'LibreTranslate',
          translatedAt: new Date().toISOString(),
          errors: []
        }
      };

      // Add any errors to translation metadata
      if (!titleResult.success) {
        translatedArticle.translation.errors.push(`Title: ${titleResult.error}`);
      }
      if (!descriptionResult.success) {
        translatedArticle.translation.errors.push(`Description: ${descriptionResult.error}`);
      }

      return {
        success: true,
        article: translatedArticle
      };
    } catch (error) {
      console.error('Article translation error:', error.message);
      return {
        success: false,
        error: error.message,
        article: article // Return original if translation fails
      };
    }
  }

  // Translate multiple articles with progress tracking
  async translateArticles(articles, onProgress = null) {
    console.log(`Starting translation of ${articles.length} articles using LibreTranslate...`);
    
    const results = [];
    const errors = [];
    let translated = 0;
    let fromCache = 0;
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      
      try {
        const result = await this.translateArticle(article);
        
        if (result.success) {
          results.push(result.article);
          
          // Count successful translations
          if (result.article.translation.titleSuccess || result.article.translation.descriptionSuccess) {
            translated++;
          }
          
          // Count cache hits
          if (result.article.translation.titleFromCache || result.article.translation.descriptionFromCache) {
            fromCache++;
          }
        } else {
          errors.push({
            articleId: article.id,
            error: result.error
          });
          results.push(article); // Keep original
        }
        
        // Progress callback
        if (onProgress) {
          onProgress({
            current: i + 1,
            total: articles.length,
            percentage: Math.round(((i + 1) / articles.length) * 100),
            translated,
            fromCache,
            errors: errors.length
          });
        }
        
        // Small delay between articles to be nice to the API
        if (i < articles.length - 1) {
          await this.delay(50);
        }
        
      } catch (error) {
        console.error(`Error translating article ${article.id}:`, error);
        errors.push({
          articleId: article.id,
          error: error.message
        });
        results.push(article); // Keep original
      }
    }
    
    console.log(`Translation completed: ${translated} translated, ${fromCache} from cache, ${errors.length} errors`);
    
    return {
      success: true,
      articles: results,
      errors,
      stats: {
        total: articles.length,
        translated,
        fromCache,
        failed: errors.length,
        cacheSize: this.translationCache.size,
        requestCount: this.requestCount
      }
    };
  }

  // Utility: Add delay between requests
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get translation statistics
  getStats() {
    return {
      service: 'LibreTranslate',
      cacheSize: this.translationCache.size,
      requestCount: this.requestCount,
      lastResetTime: new Date(this.lastResetTime).toISOString(),
      canMakeRequest: this.canMakeRequest(),
      maxRequestsPerMinute: this.maxRequestsPerMinute
    };
  }

  // Clear cache
  clearCache() {
    this.translationCache.clear();
    console.log('Translation cache cleared');
  }

  // Reset rate limiting
  resetRateLimit() {
    this.requestCount = 0;
    this.lastResetTime = Date.now();
    console.log('Rate limit counter reset');
  }
}

// Export singleton instance
export const translator = new NewsTranslator();

// Utility function for API routes
export async function translateNewsCollection(articles) {
  try {
    const result = await translator.translateArticles(articles, (progress) => {
      console.log(`Translation progress: ${progress.percentage}% (${progress.translated} translated, ${progress.fromCache} cached)`);
    });
    
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('News translation failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
