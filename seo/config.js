const LOGO = 'https://www.dadwordit.com/images/logo.webp';
const SITE = 'https://www.dadwordit.com';

const SEO_CONFIG = {
    index: {
        title: 'Dadword IT — Web Portals, Shopify Apps & SaaS Development Agency',
        meta: {
            description: 'Dadword IT is a senior-led web development agency specialising in custom web portals, Shopify app development, and SaaS product engineering. AI-enhanced delivery for US, Canada & Europe.',
            keywords: 'custom web portal development, Shopify app development agency, SaaS product engineering, AI-enhanced web development, web development agency USA, Node.js React Next.js agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Dadword IT — Web Portals, Shopify Apps & SaaS Development Agency',
            description: 'Senior-led. AI-accelerated. We build custom web portals, Shopify apps, and SaaS products for startups and product companies in the US, Canada, and Europe.',
            image: LOGO,
            url: `${SITE}/`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Dadword IT — Web Portals, Shopify Apps & SaaS Development Agency',
            description: 'Senior-led. AI-accelerated. Custom web portals, Shopify apps, and SaaS products for US, Canada & Europe.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dadword IT",
            "alternateName": "Dadword IT - Web Portal & Shopify Development Agency",
            "description": "Dadword IT is a senior-led web development agency building custom web portals, Shopify apps, and SaaS products with AI-enhanced engineering workflows.",
            "url": SITE,
            "logo": LOGO,
            "image": LOGO,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "N-1007, North Building, Twinstar, 150 Feet Ring Road, Opp. Balaji Hall",
                "addressLocality": "Rajkot",
                "addressRegion": "Gujarat",
                "postalCode": "360004",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.2969",
                "longitude": "70.7984"
            },
            "email": "contact@dadwordit.com",
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "areaServed": [
                {
                    "@type": "Country",
                    "name": "United States"
                },
                {
                    "@type": "Country",
                    "name": "Canada"
                },
                {
                    "@type": "Country",
                    "name": "Germany"
                },
                {
                    "@type": "Country",
                    "name": "Switzerland"
                },
                {
                    "@type": "Place",
                    "name": "Europe"
                }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Custom Web Portal Development",
                            "description": "B2B dashboards, client portals, and SaaS platform development with React and Next.js"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Shopify App Development",
                            "description": "Custom Shopify apps, theme extensions, and Hydrogen storefronts"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "SaaS Product Engineering",
                            "description": "Full-stack SaaS product development from MVP to enterprise scale"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI-Enhanced Development",
                            "description": "AI-assisted software engineering using Cursor and Claude for faster, senior-quality delivery"
                        }
                    }
                ]
            },
            "sameAs": [
                "https://www.facebook.com/people/Dadword-It/61554692296159/",
                "https://www.instagram.com/dadword_it/",
                "https://x.com/dadwordit",
                "https://www.linkedin.com/company/dadword-it"
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
            image: LOGO,
            url: `${SITE}/about`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'About Dadword IT | Boutique Senior-Led Web Development Agency',
            description: 'A lean, senior-led engineering team building web portals, Shopify apps, and SaaS products. AI-enhanced since 2024.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${SITE}/about`
            },
            "name": "About Dadword IT",
            "description": "Learn about Dadword IT, a boutique senior-led web development agency building custom web portals, Shopify apps, and SaaS products.",
            "publisher": {
                "@type": "Organization",
                "name": "Dadword IT",
                "url": SITE
            }
        },
        canonical: `${SITE}/about`
    },
    service: {
        title: 'Services — Web Portals, Shopify Apps, SaaS & AI Development | Dadword IT',
        meta: {
            description: 'Custom web portal development, Shopify app development, SaaS product engineering, and AI-enhanced development services. Senior engineers, faster delivery.',
            keywords: 'custom web portal development, Shopify app development, SaaS engineering, AI-assisted development agency, Node.js Next.js Shopify agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Services — Web Portals, Shopify Apps, SaaS & AI Development | Dadword IT',
            description: 'Specialist services: custom web portals, Shopify apps, SaaS product engineering, and AI-enhanced development. Senior-led, boutique agency.',
            image: LOGO,
            url: `${SITE}/service`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Services — Web Portals, Shopify Apps, SaaS & AI | Dadword IT',
            description: 'Custom web portals, Shopify apps, SaaS product engineering, and AI-enhanced development. Senior-led, boutique agency.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web Portal, Shopify App & SaaS Development Services",
            "provider": {
                "@type": "Organization",
                "name": "Dadword IT",
                "url": SITE
            },
            "areaServed": "Global",
            "description": "Custom web portal development, Shopify app development, SaaS product engineering, and AI-enhanced delivery for startups and product companies.",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Custom Web Portal Development",
                            "description": "B2B dashboards, client portals, and SaaS platform development with React and Next.js."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Shopify App Development",
                            "description": "Custom Shopify apps, theme extensions, and Hydrogen storefronts."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "SaaS Product Engineering",
                            "description": "Full-stack SaaS product development from MVP to enterprise scale."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI-Enhanced Development",
                            "description": "AI-assisted software engineering for faster, senior-quality delivery."
                        }
                    }
                ]
            }
        },
        canonical: `${SITE}/service`
    },
    our_work: {
        title: 'Web Development Portfolio | Dadword IT',
        meta: {
            description: 'Explore the web development and design portfolio of Dadword IT. View our successful projects and case studies for clients across various industries.',
            keywords: 'web development portfolio, web design portfolio, custom web development projects',
            author: 'Dadword IT'
        },
        og: {
            title: 'Web Development Portfolio | Dadword IT',
            description: 'Explore the web development and design portfolio of Dadword IT. View our successful projects and case studies for clients across various industries.',
            image: LOGO,
            url: `${SITE}/our-work`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Web Development Portfolio | Dadword IT',
            description: 'Explore the web development and design portfolio of Dadword IT. View our successful projects and case studies for clients across various industries.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Web Development Portfolio",
            "description": "A showcase of successful web development and design projects by Dadword IT.",
            "url": `${SITE}/our-work`,
            "areaServed": "Global",
        },
        canonical: `${SITE}/our-work`
    },
    blog: {
        title: 'Blog | Dadword IT',
        meta: {
            description: 'Discover the latest web development and design tips, tutorials, and trends on the Dadword IT blog. Stay updated with expert insights from our web development agency.',
            keywords: 'web development blog, web design tips, web development tutorials, dadword IT blog',
            author: 'Dadword IT'
        },
        og: {
            title: 'Blog | Dadword IT',
            description: 'Discover the latest web development and design tips, tutorials, and trends on the Dadword IT blog. Stay updated with expert insights from our web development agency.',
            image: LOGO,
            url: `${SITE}/blog`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog | Dadword IT',
            description: 'Discover the latest web development and design tips, tutorials, and trends on the Dadword IT blog. Stay updated with expert insights from our web development agency.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Web Development Blog",
            "description": "Discover expert web development and design tips from Dadword IT.",
            "url": `${SITE}/blog`,
            "blogPost": []
        },
        canonical: `${SITE}/blog`
    },
    career: {
        title: 'Careers at Dadword IT | Join Our Engineering Team',
        meta: {
            description: 'Explore open roles and career opportunities at Dadword IT. Join a senior-led team building web portals, Shopify apps, and SaaS products with AI-enhanced delivery.',
            keywords: 'Dadword IT careers, web developer jobs, Shopify developer jobs, SaaS engineer careers',
            author: 'Dadword IT'
        },
        og: {
            title: 'Careers at Dadword IT | Join Our Engineering Team',
            description: 'Explore open roles and career opportunities at Dadword IT. Join a senior-led team building web portals, Shopify apps, and SaaS products.',
            image: LOGO,
            url: `${SITE}/career`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Careers at Dadword IT | Join Our Engineering Team',
            description: 'Explore open roles and career opportunities at Dadword IT. Join a senior-led team building web portals, Shopify apps, and SaaS products.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${SITE}/career`
            },
            "name": "Careers at Dadword IT",
            "description": "Explore open roles and career opportunities at Dadword IT.",
            "url": `${SITE}/career`,
            "publisher": {
                "@type": "Organization",
                "name": "Dadword IT",
                "url": SITE
            }
        },
        canonical: `${SITE}/career`
    },
    lets_talk: {
        title: 'Schedule a Call | Talk to Web Development Experts | Dadword IT',
        meta: {
            description: 'Schedule a call with Dadword IT, a leading web development agency. Book a consultation to discuss your web design and development needs today!',
            keywords: 'Schedule a Call with Web Developers, Book a Web Development Consultation, Talk to a Web Design Expert, Contact Web Development Agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Schedule a Call | Talk to Web Development Experts | Dadword IT',
            description: 'Schedule a call with Dadword IT, a leading web development agency. Book a consultation to discuss your web design and development needs today!',
            image: LOGO,
            url: `${SITE}/lets-talk`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Schedule a Call | Talk to Web Development Experts | Dadword IT',
            description: 'Schedule a call with Dadword IT, a leading web development agency. Book a consultation to discuss your web design and development needs today!',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Let's Talk | Schedule a Call with Dadword IT",
            "url": `${SITE}/lets-talk`,
            "description": "Schedule a consultation with Dadword IT to discuss your web development and design needs.",
            "contactOption": ["TollFree", "Online"],
            "areaServed": "Global",
            "availableLanguage": ["English"]
        },
        canonical: `${SITE}/lets-talk`
    },
    contact_us: {
        title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts',
        meta: {
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            keywords: 'Contact Dadword IT, web development agency contact, get in touch Dadword IT',
            author: 'Dadword IT'
        },
        og: {
            title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts',
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            image: LOGO,
            url: `${SITE}/contact-us`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts',
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Dadword IT | Web Development Agency",
            "url": `${SITE}/contact-us`,
            "description": "Reach out to Dadword IT for professional web development and design services.",
            "contactOption": ["Email", "Phone", "Online"],
            "areaServed": "Global",
            "availableLanguage": ["English"]
        },
        canonical: `${SITE}/contact-us`
    },
    customer_faq: {
        title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
        meta: {
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            keywords: 'Dadword IT FAQ, web portal development questions, Shopify app development FAQ',
            author: 'Dadword IT'
        },
        og: {
            title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            image: LOGO,
            url: `${SITE}/faq`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            image: LOGO
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What services do you offer?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We specialise in custom web portals, Shopify app development, SaaS product builds, and AI-enhanced delivery pipelines. This covers everything from architecture and backend APIs to frontend interfaces and long-term support."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How long does a typical project take?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A focused MVP typically ships in 6 to 12 weeks. Larger platforms or multi-phase SaaS products can run 3 to 6 months. We provide a detailed timeline after understanding your scope and priorities in the discovery call."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you take on small projects or only large builds?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We work best with projects that have a clear problem and a growth ambition behind them, small or large. We do not take on simple template tweaks, but a focused feature build for a growing product is absolutely within scope."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you offer post-launch support and maintenance?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. We offer retainer-based support plans that cover bug fixes, security patches, performance monitoring, and iterative feature development. Many of our clients stay with us long after launch."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you use templates or build everything custom?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Everything we ship is purpose-built for your product. We do not resell or reskin generic templates. Custom architecture means your codebase is yours to own, extend, and scale without lock-in."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Will the product be mobile-responsive?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Always. Every interface we design is fully responsive across phones, tablets, and desktops. Mobile performance is treated as a first-class requirement, not an afterthought."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is \"AI-Enhanced Development\"?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We use AI-assisted coding tools (including Cursor and Claude) as part of our engineering workflow. This lets our senior engineers ship faster without cutting corners on quality, which means shorter timelines and lower costs for you."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I get started?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Book a free 30-minute discovery call via our Let's Talk page. We will ask about your goals, timeline, and budget, and give you honest feedback on fit and approach before any commitment."
                    }
                }
            ]
        },
        canonical: `${SITE}/faq`
    },
    privacy_policy: {
        title: 'Privacy Policy | Dadword IT - Web Development Agency',
        meta: {
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            keywords: 'Privacy Policy, Data Protection, Web Development Privacy, Privacy Policy Dadword IT, Web Development Agency Privacy, How We Protect Your Data',
            author: 'Dadword IT'
        },
        og: {
            title: 'Privacy Policy | Dadword IT - Web Development Agency',
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            image: LOGO,
            url: `${SITE}/privacy-policy`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Privacy Policy | Dadword IT - Web Development Agency',
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            image: LOGO
        },
        schema: null,
        canonical: `${SITE}/privacy-policy`
    },
    terms_and_condition: {
        title: 'Terms and Conditions | Dadword IT - Web Development Agency',
        meta: {
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services. Understand the terms that govern our relationship with clients.",
            keywords: 'Terms and Conditions, Terms of Service, Web Development Terms, Dadword IT Terms and Conditions, Web Design Terms, Service Agreement Dadword IT',
            author: 'Dadword IT'
        },
        og: {
            title: 'Terms and Conditions | Dadword IT - Web Development Agency',
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services. Understand the terms that govern our relationship with clients.",
            image: LOGO,
            url: `${SITE}/terms-and-conditions`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Terms and Conditions | Dadword IT - Web Development Agency',
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services. Understand the terms that govern our relationship with clients.",
            image: LOGO
        },
        schema: null,
        canonical: `${SITE}/terms-and-conditions`
    }
}

module.exports = SEO_CONFIG;
