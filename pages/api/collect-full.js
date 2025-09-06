import { newsSources } from '../../config/newsSources.js';
import { translator } from '../../lib/translator.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

let newsDatabase = {
  articles: [],
  lastUpdated: null
};

export default async function handler(req, res) {
  try {
    const startTime = Date.now();
    const allArticles = [];

    // Process each region with limited sources per region
    for (const [regionName, sources] of Object.entries(newsSources)) {
      console.log(`Processing ${regionName}...`);
      
      // Limit to first 2 sources per region to avoid timeout
      const limitedSources = sources.slice(0, 2);
      
      for (const source of limitedSources) {
        try {
          const response = await axios.get(source.url, { 
            timeout: 8000,
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' }
          });

          const $ = cheerio.load(response.data, { xmlMode: true });
          
          // Extract up to 3 articles per source
          const sourceArticles = [];
          $('item').slice(0, 3).each((index, element) => {
            const $item = $(element);
            const title = $item.find('title').text().trim();
            const description = $item.find('description').text().replace(/<[^>]*>/g, '').trim();
            const link = $item.find('link').text().trim();

            if (title && link) {
              sourceArticles.push({
                title,
                description: description.substring(0, 200),
                link,
                source: source.name,
                sourceCountry: source.country,
                sourceLanguage: source.language || 'en',
                originalTitle: title,
                originalDescription: description.substring(0, 200)
              });
            }
          });

          allArticles.push(...sourceArticles);
          
        } catch (error) {
          console.log(`Failed to fetch ${source.name}: ${error.message}`);
        }
      }
    }

    console.log(`Collected ${allArticles.length} articles, starting translation...`);

    // Translate articles
    const translatedArticles = [];
    for (let i = 0; i < Math.min(allArticles.length, 20); i++) {
      const article = allArticles[i];
      
      if (article.sourceLanguage !== 'bn') {
        try {
          // Translate title
          const titleResponse = await axios.post('https://libretranslate.de/translate', {
            q: article.title,
            source: 'en',
            target: 'bn'
          }, { timeout: 10000 });

          if (titleResponse.data?.translatedText) {
            article.title = titleResponse.data.translatedText;
          }

          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
          console.log(`Translation failed for: ${article.title}`);
        }
      }

      translatedArticles.push(article);
    }

    // Store results
    newsDatabase.articles = translatedArticles;
    newsDatabase.lastUpdated = new Date().toISOString();

    const processingTime = Math.round((Date.now() - startTime) / 1000);

    res.status(200).json({
      success: true,
      message: 'News collection completed successfully',
      totalArticles: translatedArticles.length,
      processingTime: `${processingTime}s`,
      samples: translatedArticles.slice(0, 3)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export { newsDatabase };
