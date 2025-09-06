export default async function handler(req, res) {
  // Sample translated news data for testing
  const sampleNews = [
    {
      id: "1",
      title: "মাজারে হামলার ঘটনায় আতঙ্ক কাটেনি, 'মব সন্ত্রাস' নিয়ে আবারো প্রশ্নের মুখে সরকার",
      description: "কেবল মাজারে নয় ধর্ম অবমাননা কিংবা রাজনৈতিক ট্যাগ দিয়ে ঢাকা, রংপুরসহ দেশের বিভিন্ন স্থানে সম্প্রতি দলবদ্ধ হামলার বা বিশৃঙ্খলার বেশ কয়েকটি ঘটনা ঘটেছে।",
      link: "https://www.bbc.com/bengali/articles/cn4wyd3wyndo",
      source: "BBC Bangla",
      sourceCountry: "UK",
      pubDate: new Date().toISOString()
    },
    {
      id: "2", 
      title: "যুক্তরাষ্ট্রে অবৈধ অভিবাসী পাকড়াও অভিযান, হুন্দাই গাড়ির কারখানা থেকে কয়েকশ কর্মী আটক",
      description: "মার্কিন যুক্তরাষ্ট্রের অভ্যন্তরে উৎপাদন বৃদ্ধি এবং অবৈধ অভিবাসন দমন–– ট্রাম্পের এই দুই নীতির মধ্যে বিরোধ তৈরি করা ছাড়াও গুরুত্বপূর্ণ বন্ধু রাষ্ট্র দক্ষিণ কোরিয়ার সঙ্গে যুক্তরাষ্ট্রের সম্পর্কের ওপরও এই",
      link: "https://www.bbc.com/bengali/articles/cly928ve2lgo", 
      source: "BBC Bangla",
      sourceCountry: "UK",
      pubDate: new Date().toISOString()
    }
  ];

  res.status(200).json({
    success: true,
    articles: sampleNews,
    total: sampleNews.length,
    lastUpdated: new Date().toISOString()
  });
}
