import { newsSources } from '../../config/newsSources.js';
import { translator } from '../../lib/translator.js';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Test with just 3 sources to start
    const testSources = [
      newsSources.bangla[0], // BBC Bangla
      newsSources.northAmerica[0], // CNN
      newsSources.europe[0] // BBC News
    ];

    const articles = [];
    
    for (const source of testSources) {
      try {
        const response = await axios.get(source.url, { timeout: 10000 });
        // Simple title extraction (we'll skip full RSS parsing for now)
        articles.push({
          title: `Test article from ${source.name}`,
          source: source.name,
          country: source.country
        });
      } catch (error) {
        console.log(`Failed to fetch ${source.name}`);
      }
    }

    res.status(200).json({
      success: true,
      articles: articles.length,
      message: 'Limited collection successful'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
