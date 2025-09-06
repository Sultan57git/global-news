// Homepage - Bangla Global News Website
// Beautiful, responsive homepage with SEO optimization

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, [selectedCategory, selectedRegion]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '50',
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedRegion !== 'all' && { region: selectedRegion }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();

      if (data.success) {
        setNews(data.articles);
        setLastUpdated(data.meta.lastUpdated);
      } else {
        console.error('Failed to fetch news:', data.error);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Head>
        <title>বিশ্ব বাংলা নিউজ - ১০০+ দেশের সংবাদ বাংলায়</title>
        <meta name="description" content="প্রবাসী বাংলাদেশীদের জন্য আন্তর্জাতিক সংবাদ। BBC, CNN, Al Jazeera সহ ১০০+ দেশের খবর বাংলায় অনুবাদ। লন্ডন, দুবাই, আমেরিকা, ইউরোপের প্রবাসী সংবাদ।" />
        <meta name="keywords" content="বাংলা খবর, আন্তর্জাতিক সংবাদ, প্রবাসী খবর, global bangla news, bangladeshi news, london bangladeshi, dubai bengali news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="bn" />
        <meta property="og:title" content="বিশ্ব বাংলা নিউজ - ১০০+ দেশের সংবাদ বাংলায়" />
        <meta property="og:description" content="প্রবাসী বাংলাদেশীদের জন্য আন্তর্জাতিক সংবাদ বাংলায়" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-green-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold">বিশ্ব বাংলা নিউজ</h1>
                <p className="text-green-100 mt-2">১০০+ দেশের সংবাদ বাংলায় • প্রবাসী বাংলাদেশীদের জন্য</p>
              </div>
              
              {/* Search */}
              <div className="w-full md:w-auto">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="খবর খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-l-lg text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-lg transition-colors"
                  >
                    খুঁজুন
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 py-3">
              {/* Category Filters */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="all">সকল বিভাগ</option>
                <option value="politics">রাজনীতি</option>
                <option value="general">সাধারণ</option>
                <option value="sports">খেলাধুলা</option>
                <option value="international">আন্তর্জাতিক</option>
                <option value="regional">আঞ্চলিক</option>
              </select>

              {/* Region Filters */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="all">সকল অঞ্চল</option>
                <option value="north-america">উত্তর আমেরিকা</option>
                <option value="europe">ইউরোপ</option>
                <option value="middle-east">মধ্যপ্রাচ্য</option>
                <option value="asia">এশিয়া</option>
                <option value="africa">আফ্রিকা</option>
                <option value="oceania">ওশেনিয়া</option>
              </select>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Last Updated Info */}
          {lastUpdated && (
            <div className="text-center mb-6 text-gray-600">
              <p>সর্বশেষ আপডেট: {formatDate(lastUpdated)}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">খবর লোড হচ্ছে...</p>
            </div>
          )}

          {/* No News State */}
          {!loading && news.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">কোনো খবর পাওয়া যায়নি</h3>
                <p className="text-yellow-700 mb-4">দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সার্চ টার্ম পরিবর্তন করুন।</p>
                <button
                  onClick={fetchNews}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors"
                >
                  পুনরায় লোড করুন
                </button>
              </div>
            </div>
          )}

          {/* News Grid */}
          {!loading && news.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Source Info */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {article.source}
                      </span>
                      <span className="text-xs text-gray-500">
                        {article.sourceCountry}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {formatDate(article.pubDate)}
                      </div>
                      
                      <div className="flex space-x-2">
                        {/* Translation Indicator */}
                        {article.translation.translated && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            অনুবাদিত
                          </span>
                        )}
                        
                        {/* Read More Link */}
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          আরও পড়ুন →
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && news.length > 0 && news.length >= 50 && (
            <div className="text-center mt-8">
              <button
                onClick={() => fetchNews()}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                আরও খবর লোড করুন
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-2">বিশ্ব বাংলা নিউজ</h3>
            <p className="text-gray-400 mb-4">
              বিশ্বব্যাপী বাংলাদেশী ও বাঙালিদের জন্য আন্তর্জাতিক সংবাদ
            </p>
            <p className="text-gray-500 text-sm">
              সূত্র: BBC, CNN, Al Jazeera, Reuters, এবং আরও ৭০+ আন্তর্জাতিক সংবাদমাধ্যম
            </p>
          </div>
        </footer>
      </div>

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
