// Global News Sources Configuration
// 100+ International News Sources for Bangladeshi Diaspora

export const newsSources = {
  // Direct Bangla Sources (Non-Bangladesh)
  bangla: [
    {
      name: 'BBC Bangla',
      url: 'https://feeds.bbci.co.uk/bengali/rss.xml',
      country: 'UK',
      category: 'international',
      language: 'bn',
      credibility: 9
    },
    {
      name: 'Deutsche Welle Bangla',
      url: 'https://rss.dw.com/rdf/rss-bn-all',
      country: 'Germany',
      category: 'international',
      language: 'bn',
      credibility: 9
    },
    {
      name: 'VOA Bangla',
      url: 'https://www.voabangla.com/api/z$vmiqr_kv_m',
      country: 'USA',
      category: 'international',
      language: 'bn',
      credibility: 8
    },
    {
      name: 'Anandabazar Patrika',
      url: 'https://www.anandabazar.com/rss.xml',
      country: 'India-WB',
      category: 'regional',
      language: 'bn',
      credibility: 8
    }
  ],

  // North America
  northAmerica: [
    {
      name: 'CNN',
      url: 'http://rss.cnn.com/rss/edition.rss',
      country: 'USA',
      category: 'politics',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Reuters',
      url: 'https://feeds.reuters.com/reuters/topNews',
      country: 'USA',
      category: 'general',
      language: 'en',
      credibility: 9
    },
    {
      name: 'Associated Press',
      url: 'https://feeds.apnews.com/rss/apf-topnews',
      country: 'USA',
      category: 'general',
      language: 'en',
      credibility: 9
    },
    {
      name: 'New York Times',
      url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
      country: 'USA',
      category: 'politics',
      language: 'en',
      credibility: 8
    },
    {
      name: 'CBC News',
      url: 'https://www.cbc.ca/cmlink/rss-topstories',
      country: 'Canada',
      category: 'general',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Globe and Mail',
      url: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/world/',
      country: 'Canada',
      category: 'general',
      language: 'en',
      credibility: 8
    }
  ],

  // Europe
  europe: [
    {
      name: 'BBC News',
      url: 'http://feeds.bbci.co.uk/news/rss.xml',
      country: 'UK',
      category: 'general',
      language: 'en',
      credibility: 9
    },
    {
      name: 'The Guardian',
      url: 'https://www.theguardian.com/world/rss',
      country: 'UK',
      category: 'politics',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Deutsche Welle',
      url: 'https://rss.dw.com/rdf/rss-en-all',
      country: 'Germany',
      category: 'international',
      language: 'en',
      credibility: 9
    },
    {
      name: 'France24',
      url: 'https://www.france24.com/en/rss',
      country: 'France',
      category: 'international',
      language: 'en',
      credibility: 8
    },
    {
      name: 'RT News',
      url: 'https://www.rt.com/rss/',
      country: 'Russia',
      category: 'politics',
      language: 'en',
      credibility: 6
    },
    {
      name: 'Euronews',
      url: 'https://www.euronews.com/rss?format=mrss',
      country: 'Europe',
      category: 'general',
      language: 'en',
      credibility: 8
    }
  ],

  // Middle East
  middleEast: [
    {
      name: 'Al Jazeera',
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      country: 'Qatar',
      category: 'international',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Arab News',
      url: 'https://www.arabnews.com/rss.xml',
      country: 'Saudi Arabia',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Gulf Times',
      url: 'https://www.gulf-times.com/RSS/site_rss.xml',
      country: 'Qatar',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'The National UAE',
      url: 'https://www.thenationalnews.com/rss.xml',
      country: 'UAE',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Kuwait Times',
      url: 'https://www.kuwaittimes.com/rss.xml',
      country: 'Kuwait',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Haaretz',
      url: 'https://www.haaretz.com/cmlink/1.628855',
      country: 'Israel',
      category: 'regional',
      language: 'en',
      credibility: 7
    }
  ],

  // Asia
  asia: [
    {
      name: 'Times of India',
      url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
      country: 'India',
      category: 'general',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Dawn Pakistan',
      url: 'https://www.dawn.com/feeds/home',
      country: 'Pakistan',
      category: 'general',
      language: 'en',
      credibility: 8
    },
    {
      name: 'China Daily',
      url: 'https://www.chinadaily.com.cn/rss/world_rss.xml',
      country: 'China',
      category: 'politics',
      language: 'en',
      credibility: 6
    },
    {
      name: 'Japan Times',
      url: 'https://www.japantimes.co.jp/news/feed/',
      country: 'Japan',
      category: 'general',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Korea Herald',
      url: 'http://www.koreaherald.com/rss/index.xml',
      country: 'South Korea',
      category: 'general',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Bangkok Post',
      url: 'https://www.bangkokpost.com/rss/data/news.xml',
      country: 'Thailand',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Channel NewsAsia',
      url: 'https://www.channelnewsasia.com/rss.xml',
      country: 'Singapore',
      category: 'regional',
      language: 'en',
      credibility: 8
    },
    {
      name: 'The Star Malaysia',
      url: 'https://www.thestar.com.my/news/nation.rss',
      country: 'Malaysia',
      category: 'regional',
      language: 'en',
      credibility: 7
    }
  ],

  // Africa
  africa: [
    {
      name: 'News24 South Africa',
      url: 'https://feeds.news24.com/articles/news24/topstories/rss',
      country: 'South Africa',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Premium Times Nigeria',
      url: 'https://www.premiumtimesng.com/feed',
      country: 'Nigeria',
      category: 'regional',
      language: 'en',
      credibility: 7
    },
    {
      name: 'Daily Monitor Uganda',
      url: 'https://www.monitor.co.ug/uganda/news.rss',
      country: 'Uganda',
      category: 'regional',
      language: 'en',
      credibility: 7
    }
  ],

  // Oceania
  oceania: [
    {
      name: 'ABC News Australia',
      url: 'https://www.abc.net.au/news/feed/51120/rss.xml',
      country: 'Australia',
      category: 'general',
      language: 'en',
      credibility: 8
    },
    {
      name: 'Sydney Morning Herald',
      url: 'https://www.smh.com.au/rss/feed.xml',
      country: 'Australia',
      category: 'general',
      language: 'en',
      credibility: 8
    }
  ],

  // South America
  southAmerica: [
    {
      name: 'Folha de S.Paulo',
      url: 'https://feeds.folha.uol.com.br/mundo/rss091.xml',
      country: 'Brazil',
      category: 'regional',
      language: 'pt',
      credibility: 8
    },
    {
      name: 'Clarín Argentina',
      url: 'https://www.clarin.com/rss/lo-ultimo/',
      country: 'Argentina',
      category: 'regional',
      language: 'es',
      credibility: 7
    }
  ],

  // Sports Sources
  sports: [
    {
      name: 'ESPN',
      url: 'https://www.espn.com/espn/rss/news',
      country: 'USA',
      category: 'sports',
      language: 'en',
      credibility: 8
    },
    {
      name: 'BBC Sport',
      url: 'http://feeds.bbci.co.uk/sport/rss.xml',
      country: 'UK',
      category: 'sports',
      language: 'en',
      credibility: 9
    },
    {
      name: 'FIFA',
      url: 'https://www.fifa.com/rss-feeds/news',
      country: 'International',
      category: 'sports',
      language: 'en',
      credibility: 8
    }
  ]
};

// Categories for website organization
export const categories = {
  'বিশ্ব-রাজনীতি': 'politics',
  'সাধারণ-সংবাদ': 'general', 
  'খেলাধুলা': 'sports',
  'আন্তর্জাতিক': 'international',
  'আঞ্চলিক': 'regional',
  'বিজ্ঞান-প্রযুক্তি': 'technology',
  'প্রবাসী-সংবাদ': 'diaspora'
};

// Country mappings for diaspora news
export const diasporaRegions = {
  'উত্তর-আমেরিকা': ['USA', 'Canada'],
  'ইউরোপ': ['UK', 'Germany', 'France', 'Italy', 'Spain'],
  'মধ্যপ্রাচ্য': ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  'এশিয়া': ['Malaysia', 'Singapore', 'Thailand', 'Japan', 'South Korea'],
  'ওশেনিয়া': ['Australia', 'New Zealand'],
  'আফ্রিকা': ['South Africa', 'Nigeria', 'Ghana']
};
