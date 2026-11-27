const SITE = 'https://www.dadwordit.com';
const LOGO = `${SITE}/images/logo.webp`;
const OG_IMAGE = `${SITE}/images/og-default.webp`;

const SAME_AS = [
    'https://www.facebook.com/people/Dadword-It/61554692296159/',
    'https://www.instagram.com/dadword_it/',
    'https://x.com/dadwordit',
    'https://www.linkedin.com/company/dadword-it',
    'https://clutch.co/profile/dadword-it',
    'https://www.upwork.com/agencies/dadwordit/'
];

// Target markets: used for areaServed everywhere
const AREA_SERVED = [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Place', name: 'European Union' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Oman' }
];

const ADDRESS = {
    '@type': 'PostalAddress',
    streetAddress: 'N-1007, North Building, Twinstar, 150 Feet Ring Road, Opp. Balaji Hall',
    addressLocality: 'Rajkot',
    addressRegion: 'Gujarat',
    postalCode: '360004',
    addressCountry: 'IN'
};

const ORGANIZATION = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Dadword IT',
    url: SITE,
    logo: LOGO,
    image: OG_IMAGE,
    email: 'contact@dadwordit.com',
    address: ADDRESS,
    areaServed: AREA_SERVED,
    sameAs: SAME_AS
};

const WEBSITE = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: 'Dadword IT',
    description: 'Senior-led web development agency for custom web portals, Shopify apps, and SaaS products.',
    publisher: { '@id': `${SITE}/#organization` },
    inLanguage: 'en'
};

function buildBreadcrumb(crumbs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url
        }))
    };
}

function withBreadcrumb(schema, crumbs) {
    if (!schema) return [buildBreadcrumb(crumbs)];
    return [schema, buildBreadcrumb(crumbs)];
}

module.exports = {
    SITE,
    LOGO,
    OG_IMAGE,
    SAME_AS,
    ADDRESS,
    AREA_SERVED,
    ORGANIZATION,
    WEBSITE,
    buildBreadcrumb,
    withBreadcrumb
};
