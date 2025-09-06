// Next.js App Component - Global Application Setup
// This file wraps all pages and handles global styles

import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // Global error handling
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    };

    // Handle JavaScript errors
    const handleError = (event) => {
      console.error('JavaScript error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <>
      {/* Global Head Configuration */}
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#16a34a" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Bengali" />
        <meta name="author" content="Bishwa Bangla News" />
        <meta name="generator" content="Next.js" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:site_name" content="বিশ্ব বাংলা নিউজ" />
        <meta property="og:locale" content="bn_BD" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BishwaBanglaNews" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload Important Resources */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        
        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//libretranslate.de" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//feeds.bbci.co.uk" />
        
        {/* Structured Data for News Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "বিশ্ব বাংলা নিউজ",
              "alternateName": "Bishwa Bangla News",
              "description": "প্রবাসী বাংলাদেশীদের জন্য আন্তর্জাতিক সংবাদ বাংলায়",
              "url": "https://bishwa-bangla-news.vercel.app",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bishwa-bangla-news.vercel.app/logo.png"
              },
              "sameAs": [
                "https://twitter.com/BishwaBanglaNews",
                "https://facebook.com/BishwaBanglaNews"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BD"
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Bangladesh"
                },
                {
                  "@type": "Country", 
                  "name": "India"
                },
                {
                  "@type": "Country",
                  "name": "United Kingdom"
                },
                {
                  "@type": "Country",
                  "name": "United States"
                }
              ],
              "knowsLanguage": ["bn", "en"],
              "publishingPrinciples": "https://bishwa-bangla-news.vercel.app/editorial-guidelines"
            })
          }}
        />
      </Head>

      {/* Global Loading Bar */}
      <div id="global-loading" className="hidden">
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 z-50 animate-pulse"></div>
      </div>

      {/* Main App Component */}
      <Component {...pageProps} />

      {/* Global Analytics Script (Google Analytics) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Google Analytics (replace GA_MEASUREMENT_ID with actual ID when available)
            if (typeof window !== 'undefined' && window.gtag) {
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
                content_group1: 'News',
                content_group2: 'Bangla'
              });
            }
          `
        }}
      />

      {/* Service Worker Registration for PWA */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }}
      />

      {/* Global Styles */}
      <style jsx global>{`
        /* Additional global styles that can't be in CSS */
        html {
          font-size: 16px;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        
        /* Focus ring for accessibility */
        .focus-visible {
          outline: 2px solid #16a34a;
          outline-offset: 2px;
        }
        
        /* Selection color */
        ::selection {
          background-color: #16a34a;
          color: white;
        }
        
        ::-moz-selection {
          background-color: #16a34a;
          color: white;
        }
        
        /* Loading state for images */
        img {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        img.loaded {
          opacity: 1;
        }
        
        /* Print optimizations */
        @media print {
          body {
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .no-print {
            display: none !important;
          }
          
          a {
            text-decoration: none;
            color: black;
          }
          
          a[href]:after {
            content: " (" attr(href) ")";
            font-size: 10pt;
            color: #666;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          body {
            background: white;
            color: black;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
