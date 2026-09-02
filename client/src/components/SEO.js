import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.bahoafrica.rw';
const DEFAULT_IMAGE = `${SITE_URL}/images/BAHO_BRAND_yellow.png`;

const pageMetadata = {
  '/home': {
    title: 'BAHO AFRICA | Creative and Culture Hub in Rwanda',
    description: 'BAHO AFRICA is a creative and culture hub in Rwanda empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.',
    type: 'WebSite',
  },
  '/about': {
    title: 'About BAHO AFRICA | Creative and Culture Hub in Rwanda',
    description: 'Learn how BAHO AFRICA empowers communities in Rwanda through creativity, cultural preservation, arts, innovation, and inclusive opportunities.',
    type: 'AboutPage',
  },
  '/projects': {
    title: 'Our Projects | BAHO AFRICA',
    description: 'Explore BAHO AFRICA projects creating opportunities for artists, young people, women, refugees, and creatives with disabilities across Rwanda.',
    type: 'CollectionPage',
  },
  '/events': {
    title: 'Events | BAHO AFRICA',
    description: 'Discover upcoming and past BAHO AFRICA events, festivals, workshops, and creative community experiences in Rwanda.',
    type: 'CollectionPage',
  },
  '/team': {
    title: 'Our Team | BAHO AFRICA',
    description: 'Meet the passionate team advancing BAHO AFRICA\'s mission to support creative communities and cultural development in Rwanda.',
    type: 'AboutPage',
  },
};

const SEO = () => {
  const { pathname } = useLocation();
  const metadata = pageMetadata[pathname] || {
    title: 'BAHO AFRICA | Empowering Talent, Inspiring Africa',
    description: 'BAHO AFRICA is a creative and culture hub based in Rwanda.',
    type: 'WebPage',
  };
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/home' : pathname}`;
  const breadcrumbItems = pathname === '/home'
    ? []
    : [
        { name: 'Home', url: SITE_URL },
        { name: metadata.title.split(' | ')[0], url: canonicalUrl },
      ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BAHO AFRICA',
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      description: 'A creative and culture hub based in Rwanda empowering communities through arts, innovation, culture, entrepreneurship, and education.',
      sameAs: [
        'https://www.instagram.com/baho_africa',
        'https://bahoafrica.pixieset.com',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': metadata.type,
      name: metadata.title,
      description: metadata.description,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: 'BAHO AFRICA', url: SITE_URL },
    },
  ];

  if (breadcrumbItems.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return (
    <Helmet>
      <html lang="en" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BAHO AFRICA" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:alt" content="BAHO AFRICA logo" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;