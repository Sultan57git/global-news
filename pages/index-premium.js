import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PremiumHomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'সর্বশেষ', icon: '🌍' },
    { id: 'usa', name: 'আমেরিকা', icon: '🇺🇸' },
    { id: 'europe', name: 'ইউরোপ', icon: '🇪🇺' },
    { id: 'arab', name: 'আরব বিশ্ব', icon: '🕌' },
    { id: 'asia', name: 'এশিয়া', icon: '🏮' },
    { id: 'latin', name: 'লাতিন আমেরিকা', icon: '🌎' }
  ];

  useEffect(() => {
    fetchNews();
  }, [activeCategory]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-news');
      const data = await response.json();
      if (data.success) {
        setNews(data.articles || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>বিশ্ব বাংলা নিউজ - আন্তর্জাতিক সংবাদের বিশ্বস্ত উৎস</title>
        <meta name="description" content="বিশ্বের ৮টি অঞ্চলের সর্বশেষ সংবাদ বাংলায়। আমেরিকা, ইউরোপ, আরব বিশ্ব, চীন, জাপান, কোরিয়া থেকে তাৎক্ষণিক আপডেট।" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Premium Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  বি
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    বিশ্ব বাংলা নিউজ
                  </h1>
                  <p className="text-sm text-slate-500">বিশ্বস্ত আন্তর্জাতিক সংবাদ</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="খবর খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 pl-10 bg-slate-100 border-0 rounded-full focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-2.5 text-slate-400">
                    🔍
                  </div>
                </div>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                  ⚙️
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Category Navigation */}
        <nav className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-medium">
                            {article.source}
                          </span>
                          <span className="text-xs text-slate-500">
                            {article.sourceCountry}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          ৬ সেপ্টেম্বর, ২০২৫
                        </div>
                      </div>
                      
                      <h2 className={`font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200 mb-3 leading-tight ${
                        index === 0 ? 'text-2xl' : 'text-lg'
                      }`}>
                        {article.title}
                      </h2>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full">
                            অনুবাদিত
                          </span>
                        </div>
                        
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                        >
                          <span>বিস্তারিত</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Premium Footer */}
        <footer className="bg-slate-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">বিশ্ব বাংলা নিউজ</h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                বিশ্বের প্রতিটি কোণ থেকে সংবাদ, বাংলায় অনুবাদিত। 
                আমেরিকা থেকে আর্জেন্টিনা, জাপান থেকে জার্মানি - সব খবর এক জায়গায়।
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">উত্তর আমেরিকা</h4>
                  <p className="text-sm text-slate-400">CNN, Reuters, AP</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">ইউরোপ</h4>
                  <p className="text-sm text-slate-400">BBC, Deutsche Welle</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">এশিয়া</h4>
                  <p className="text-sm text-slate-400">NHK, Korea Herald</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">লাতিন আমেরিকা</h4>
                  <p className="text-sm text-slate-400">Clarín, Folha</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm">
                © ২০২৫ বিশ্ব বাংলা নিউজ। বিশ্বস্ত আন্তর্জাতিক সংবাদের উৎস।
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
