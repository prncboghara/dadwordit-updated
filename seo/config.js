const { SITE, LOGO, OG_IMAGE, SAME_AS, ADDRESS, ORGANIZATION, WEBSITE } = require('./schema');

const SEO_CONFIG = {
    index: {
        title: 'Dadword IT | Web Portals, Shopify Apps & SaaS',
        meta: {
            description: 'Senior-led agency for custom web portals, Shopify apps, and SaaS products. AI-enhanced delivery for US, Canada & Europe. Book a free discovery call today.',
            keywords: 'custom web portal development, Shopify app development agency, SaaS product engineering, AI-enhanced web development, web development agency USA, Node.js React Next.js agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Dadword IT | Web Portals, Shopify Apps & SaaS',
            description: 'Senior-led. AI-accelerated. Custom web portals, Shopify apps, and SaaS products for US, Canada, and Europe.',
            image: OG_IMAGE,
            url: `${SITE}/`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Dadword IT | Web Portals, Shopify Apps & SaaS',
            description: 'Senior-led. AI-accelerated. Custom web portals, Shopify apps, and SaaS products for US, Canada & Europe.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'LocalBusiness',
                    '@id': `${SITE}/#localbusiness`,
                    name: 'Dadword IT',
                    alternateName: 'Dadword IT - Web Portal & Shopify Development Agency',
                    description: 'Dadword IT is a senior-led web development agency building custom web portals, Shopify apps, and SaaS products with AI-enhanced engineering workflows.',
                    url: SITE,
                    logo: LOGO,
                    image: OG_IMAGE,
                    address: ADDRESS,
                    geo: {
                        '@type': 'GeoCoordinates',
                        latitude: '22.2969',
                        longitude: '70.7984'
                    },
                    email: 'contact@dadwordit.com',
                    openingHours: 'Mo-Fr 09:00-18:00',
                    priceRange: '$$',
                    areaServed: [
                        { '@type': 'Country', name: 'United States' },
                        { '@type': 'Country', name: 'Canada' },
                        { '@type': 'Country', name: 'Germany' },
                        { '@type': 'Country', name: 'Switzerland' },
                        { '@type': 'Place', name: 'Europe' }
                    ],
                    hasOfferCatalog: {
                        '@type': 'OfferCatalog',
                        name: 'Services',
                        itemListElement: [
                            {
                                '@type': 'Offer',
                                itemOffered: {
                                    '@type': 'Service',
                                    name: 'Custom Web Portal Development',
                                    description: 'B2B dashboards, client portals, and SaaS platform development with React and Next.js'
                                }
                            },
                            {
                                '@type': 'Offer',
                                itemOffered: {
                                    '@type': 'Service',
                                    name: 'Shopify App Development',
                                    description: 'Custom Shopify apps, theme extensions, and Hydrogen storefronts'
                                }
                            },
                            {
                                '@type': 'Offer',
                                itemOffered: {
                                    '@type': 'Service',
                                    name: 'SaaS Product Engineering',
                                    description: 'Full-stack SaaS product development from MVP to enterprise scale'
                                }
                            },
                            {
                                '@type': 'Offer',
                                itemOffered: {
                                    '@type': 'Service',
                                    name: 'AI-Enhanced Development',
                                    description: 'AI-assisted software engineering using Cursor and Claude for faster, senior-quality delivery'
                                }
                            }
                        ]
                    },
                    sameAs: SAME_AS,
                    parentOrganization: { '@id': `${SITE}/#organization` }
                },
                ORGANIZATION,
                WEBSITE
            ]
        },
        canonical: `${SITE}/`
    },
    about: {
        title: 'About Dadword IT | Boutique Senior-Led Web Development Agency',
        meta: {
            description: 'Dadword IT is a boutique, senior-led web development agency building custom web portals, Shopify apps, and SaaS products. AI-enhanced engineering since 2024.',
            keywords: 'about Dadword IT, boutique web development agency, senior web developers, AI-enhanced development agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'About Dadword IT | Boutique Senior-Led Web Development Agency',
            description: 'A lean, senior-led engineering team building web portals, Shopify apps, and SaaS products. AI-enhanced since 2024.',
            image: OG_IMAGE,
            url: `${SITE}/about`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'About Dadword IT | Boutique Senior-Led Web Development Agency',
            description: 'A lean, senior-led engineering team building web portals, Shopify apps, and SaaS products. AI-enhanced since 2024.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${SITE}/about`
            },
            name: 'About Dadword IT',
            description: 'Learn about Dadword IT, a boutique senior-led web development agency building custom web portals, Shopify apps, and SaaS products.',
            publisher: {
                '@type': 'Organization',
                name: 'Dadword IT',
                url: SITE
            }
        },
        canonical: `${SITE}/about`
    },
    service: {
        title: 'Web Portals, Shopify Apps & SaaS Services | Dadword IT',
        meta: {
            description: 'Custom web portal development, Shopify app development, SaaS product engineering, and AI-enhanced development services. Senior engineers, faster delivery.',
            keywords: 'custom web portal development, Shopify app development, SaaS engineering, AI-assisted development agency, Node.js Next.js Shopify agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Web Portals, Shopify Apps & SaaS Services | Dadword IT',
            description: 'Specialist services: custom web portals, Shopify apps, SaaS product engineering, and AI-enhanced development. Senior-led, boutique agency.',
            image: OG_IMAGE,
            url: `${SITE}/service`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Web Portals, Shopify Apps & SaaS Services | Dadword IT',
            description: 'Custom web portals, Shopify apps, SaaS product engineering, and AI-enhanced development. Senior-led, boutique agency.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Web Portal, Shopify App & SaaS Development Services',
            provider: {
                '@type': 'Organization',
                name: 'Dadword IT',
                url: SITE
            },
            areaServed: 'Global',
            description: 'Custom web portal development, Shopify app development, SaaS product engineering, and AI-enhanced delivery for startups and product companies.',
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services',
                itemListElement: [
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Custom Web Portal Development',
                            description: 'B2B dashboards, client portals, and SaaS platform development with React and Next.js.'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Shopify App Development',
                            description: 'Custom Shopify apps, theme extensions, and Hydrogen storefronts.'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'SaaS Product Engineering',
                            description: 'Full-stack SaaS product development from MVP to enterprise scale.'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'AI-Enhanced Development',
                            description: 'AI-assisted software engineering for faster, senior-quality delivery.'
                        }
                    }
                ]
            }
        },
        canonical: `${SITE}/service`
    },
    our_work: {
        title: 'Shopify Apps, Web Portals & SaaS Portfolio | Dadword IT',
        meta: {
            description: 'Explore Shopify apps, custom web portals, and SaaS case studies by Dadword IT. Real products with measurable outcomes for growth teams — view the portfolio.',
            keywords: 'Shopify app portfolio, web portal case studies, SaaS development portfolio, Dadword IT work',
            author: 'Dadword IT'
        },
        og: {
            title: 'Shopify Apps, Web Portals & SaaS Portfolio | Dadword IT',
            description: 'Explore Shopify apps, custom web portals, and SaaS case studies by Dadword IT. Real products, measurable outcomes.',
            image: OG_IMAGE,
            url: `${SITE}/our-work`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Shopify Apps, Web Portals & SaaS Portfolio | Dadword IT',
            description: 'Explore Shopify apps, custom web portals, and SaaS case studies by Dadword IT. Real products, measurable outcomes.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Web Development Portfolio',
            description: 'A showcase of Shopify apps, web portals, and SaaS products built by Dadword IT.',
            url: `${SITE}/our-work`,
            areaServed: 'Global',
            itemListElement: []
        },
        canonical: `${SITE}/our-work`
    },
    blog: {
        title: 'Web Portals, Shopify & SaaS Insights | Dadword IT Blog',
        meta: {
            description: 'Expert insights on Shopify apps, web portals, and SaaS MVPs from Dadword IT. Practical guides for founders and product teams. Start reading the blog.',
            keywords: 'Shopify app development blog, web portal tips, SaaS MVP guides, Dadword IT blog',
            author: 'Dadword IT'
        },
        og: {
            title: 'Web Portals, Shopify & SaaS Insights | Dadword IT Blog',
            description: 'Expert insights on Shopify apps, web portals, and SaaS MVPs from Dadword IT. Practical guides for founders and product teams.',
            image: OG_IMAGE,
            url: `${SITE}/blog`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Web Portals, Shopify & SaaS Insights | Dadword IT Blog',
            description: 'Expert insights on Shopify apps, web portals, and SaaS MVPs from Dadword IT. Practical guides for founders and product teams.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Dadword IT Blog',
            description: 'Expert insights on Shopify apps, web portals, and SaaS product development from Dadword IT.',
            url: `${SITE}/blog`,
            blogPost: []
        },
        canonical: `${SITE}/blog`
    },
    career: {
        title: 'Careers at Dadword IT | Join Our Engineering Team',
        meta: {
            description: 'Explore open roles at Dadword IT. Join a senior-led engineering team building web portals, Shopify apps, and SaaS products with AI-enhanced delivery now.',
            keywords: 'Dadword IT careers, web developer jobs, Shopify developer jobs, SaaS engineer careers',
            author: 'Dadword IT'
        },
        og: {
            title: 'Careers at Dadword IT | Join Our Engineering Team',
            description: 'Open roles at Dadword IT. Join a senior-led team building web portals, Shopify apps, and SaaS products.',
            image: OG_IMAGE,
            url: `${SITE}/career`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Careers at Dadword IT | Join Our Engineering Team',
            description: 'Open roles at Dadword IT. Join a senior-led team building web portals, Shopify apps, and SaaS products.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${SITE}/career`
            },
            name: 'Careers at Dadword IT',
            description: 'Explore open roles and career opportunities at Dadword IT.',
            url: `${SITE}/career`,
            publisher: {
                '@type': 'Organization',
                name: 'Dadword IT',
                url: SITE
            }
        },
        canonical: `${SITE}/career`
    },
    lets_talk: {
        title: 'Book a Strategy Call | Dadword IT',
        meta: {
            description: 'Book a free 30-minute strategy call with Dadword IT. Discuss your Shopify app, web portal, or SaaS idea with a senior engineer today — no obligation.',
            keywords: 'book web development consultation, schedule strategy call, Shopify app consultation, SaaS MVP call',
            author: 'Dadword IT'
        },
        og: {
            title: 'Book a Strategy Call | Dadword IT',
            description: 'Book a free 30-min strategy call with Dadword IT. Discuss your Shopify app, web portal, or SaaS idea with a senior engineer.',
            image: OG_IMAGE,
            url: `${SITE}/lets-talk`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Book a Strategy Call | Dadword IT',
            description: 'Book a free 30-min strategy call with Dadword IT. Discuss your Shopify app, web portal, or SaaS idea with a senior engineer.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Book a Strategy Call with Dadword IT',
            url: `${SITE}/lets-talk`,
            description: 'Schedule a free 30-minute strategy call with a senior engineer at Dadword IT.',
            contactOption: ['Online'],
            areaServed: 'Global',
            availableLanguage: ['English']
        },
        canonical: `${SITE}/lets-talk`
    },
    contact_us: {
        title: 'Contact Dadword IT | Project Inquiry',
        meta: {
            description: 'Send a project inquiry to Dadword IT. Email our team about web portals, Shopify apps, or SaaS builds — we respond within 24 hours. Start your inquiry.',
            keywords: 'Contact Dadword IT, project inquiry, web development agency contact',
            author: 'Dadword IT'
        },
        og: {
            title: 'Contact Dadword IT | Project Inquiry',
            description: 'Send a project inquiry to Dadword IT. Email our team about web portals, Shopify apps, or SaaS builds — we respond within 24 hours.',
            image: OG_IMAGE,
            url: `${SITE}/contact-us`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Contact Dadword IT | Project Inquiry',
            description: 'Send a project inquiry to Dadword IT. Email our team about web portals, Shopify apps, or SaaS builds — we respond within 24 hours.',
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Dadword IT | Project Inquiry',
            url: `${SITE}/contact-us`,
            description: 'Send a project inquiry or email Dadword IT about web portal, Shopify app, or SaaS development.',
            contactOption: ['Email', 'Online'],
            areaServed: 'Global',
            availableLanguage: ['English']
        },
        canonical: `${SITE}/contact-us`
    },
    customer_faq: {
        title: 'FAQ | Web Portals, Shopify Apps & SaaS | Dadword IT',
        meta: {
            description: "Answers to common questions about Dadword IT's web portal, Shopify app, and SaaS development services — timelines, process, pricing fit, and how to start.",
            keywords: 'Dadword IT FAQ, web portal development questions, Shopify app development FAQ',
            author: 'Dadword IT'
        },
        og: {
            title: 'FAQ | Web Portals, Shopify Apps & SaaS | Dadword IT',
            description: "Answers to common questions about Dadword IT's web portal, Shopify app, and SaaS development services.",
            image: OG_IMAGE,
            url: `${SITE}/faq`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'FAQ | Web Portals, Shopify Apps & SaaS | Dadword IT',
            description: "Answers to common questions about Dadword IT's web portal, Shopify app, and SaaS development services.",
            image: OG_IMAGE
        },
        schema: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What services do you offer?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We specialise in custom web portals, Shopify app development, SaaS product builds, and AI-enhanced delivery pipelines. This covers everything from architecture and backend APIs to frontend interfaces and long-term support.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'How long does a typical project take?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'A focused MVP typically ships in 6 to 12 weeks. Larger platforms or multi-phase SaaS products can run 3 to 6 months. We provide a detailed timeline after understanding your scope and priorities in the discovery call.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Do you take on small projects or only large builds?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We work best with projects that have a clear problem and a growth ambition behind them, small or large. We do not take on simple template tweaks, but a focused feature build for a growing product is absolutely within scope.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Do you offer post-launch support and maintenance?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. We offer retainer-based support plans that cover bug fixes, security patches, performance monitoring, and iterative feature development. Many of our clients stay with us long after launch.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Do you use templates or build everything custom?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Everything we ship is purpose-built for your product. We do not resell or reskin generic templates. Custom architecture means your codebase is yours to own, extend, and scale without lock-in.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Will the product be mobile-responsive?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Always. Every interface we design is fully responsive across phones, tablets, and desktops. Mobile performance is treated as a first-class requirement, not an afterthought.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'What is "AI-Enhanced Development"?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We use AI-assisted coding tools (including Cursor and Claude) as part of our engineering workflow. This lets our senior engineers ship faster without cutting corners on quality, which means shorter timelines and lower costs for you.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'How do I get started?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Book a free 30-minute discovery call via our Let's Talk page. We will ask about your goals, timeline, and budget, and give you honest feedback on fit and approach before any commitment."
                    }
                }
            ]
        },
        canonical: `${SITE}/faq`
    },
    privacy_policy: {
        title: 'Privacy Policy | Dadword IT',
        meta: {
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            keywords: 'Privacy Policy, Data Protection, Web Development Privacy, Privacy Policy Dadword IT',
            author: 'Dadword IT'
        },
        og: {
            title: 'Privacy Policy | Dadword IT',
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            image: OG_IMAGE,
            url: `${SITE}/privacy-policy`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Privacy Policy | Dadword IT',
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            image: OG_IMAGE
        },
        schema: null,
        canonical: `${SITE}/privacy-policy`
    },
    terms_and_condition: {
        title: 'Terms and Conditions | Dadword IT',
        meta: {
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services. Understand the terms that govern our relationship with clients.",
            keywords: 'Terms and Conditions, Terms of Service, Web Development Terms, Dadword IT Terms',
            author: 'Dadword IT'
        },
        og: {
            title: 'Terms and Conditions | Dadword IT',
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services.",
            image: OG_IMAGE,
            url: `${SITE}/terms-and-conditions`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Terms and Conditions | Dadword IT',
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services.",
            image: OG_IMAGE
        },
        schema: null,
        canonical: `${SITE}/terms-and-conditions`
    }
};

module.exports = SEO_CONFIG;
