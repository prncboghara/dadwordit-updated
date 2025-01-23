const SEO_CONFIG = {
    index: {
        title: 'Dadword IT - Leading Web Development Agency',
        meta: {
            description: 'Dadword IT is a leading web development agency providing exceptional web design and web development services to help businesses succeed online.',
            keywords: 'web development agency, web design, web development services, Dadword IT, website development, responsive design, custom web development',
            author: 'Dadword IT'
        },
        og: {
            title: 'Dadword IT - Leading Web Development Agency',
            description: 'Exceptional web design and web development services for your business.',
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Dadword IT - Leading Web Development Agency',
            description: 'Exceptional web design and web development services for your business.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Dadword IT",
			"url": "https://dadwordit.com",
			"description": "Dadword IT is a leading web development agency providing exceptional web design and web development services.",
			"sameAs": [
				"https://www.facebook.com/people/Dadword-It/61554692296159/",
				"https://www.instagram.com/dadword_it/",
				"https://x.com/dadwordit",
				"https://www.linkedin.com/company/dadword-it"
			]
		}
    },
    about: {
        title: 'About Dadword IT | Leading Web Development Agency',
        meta: {
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            keywords: 'About Dadword IT, web development agency, web design services',
            author: 'Dadword IT'
        },
        og: {
            title: 'About Dadword IT | Leading Web Development Agency',
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'About Dadword IT | Leading Web Development ',
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
			"@context": "https://schema.org",
			"@type": "AboutPage",
			"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://www.dadwordit.com/about"
		},
			"name": "About Dadword IT",
			"description": "Learn about Dadword IT, a leading web development agency providing top-notch web design and development services.",
			"publisher": {
				"@type": "Organization",
				"name": "Dadword IT",
				"url": "https://www.dadwordit.com"
			}
		},
        canonical: "https://www.dadwordit.com/about"
    },
    service: {
        title: 'Web Development & Design Services | Dadword IT',
        meta: {
            description: 'Discover professional web development and design services by Dadword IT. We build custom, responsive websites tailored to your business needs. Contact us today!',
            keywords: 'Creative Agency, Marketing Agency, Web Development Agency',
            author: 'Dadword IT'
        },
        og: {
            title: 'Web Development & Design Services | Dadword IT',
            description: 'Discover professional web development and design services by Dadword IT. We build custom, responsive websites tailored to your business needs. Contact us today!',
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Web Development & Design Services | Dadword IT',
            description: 'Discover professional web development and design services by Dadword IT. We build custom, responsive websites tailored to your business needs. Contact us today!',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
			"@context": "https://schema.org",
			"@type": "Service",
			"name": "Web Development and Design Services",
			"provider": {
				"@type": "Organization",
				"name": "Dadword IT",
				"url": "https://www.dadwordit.com"
			},
			"areaServed": "Global",
			"description": "We provide professional web development and design services, creating custom, responsive websites for businesses of all sizes.",
			"hasOfferCatalog": {
				"@type": "OfferCatalog",
				"name": "Services",
				"itemListElement": [
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Service",
							"name": "Web Development Services",
							"description": "Custom web development services to meet your business needs."
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Service",
							"name": "Web Design Services",
							"description": "Responsive and visually appealing web design tailored to your brand."
						}
					}
				]
			}
		},
        canonical: "https://www.dadwordit.com/service"
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
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Web Development Portfolio | Dadword IT',
            description: 'Explore the web development and design portfolio of Dadword IT. View our successful projects and case studies for clients across various industries.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Web Development Portfolio",
            "description": "A showcase of successful web development and design projects by Dadword IT.",
            "url": "https://www.dadwordit.com/our-work",
            "areaServed": "Global",
        },
        canonical: "https://www.dadwordit.com/our-work"
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
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog | Dadword IT ',
            description: 'Discover the latest web development and design tips, tutorials, and trends on the Dadword IT blog. Stay updated with expert insights from our web development agency.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Web Development Blog",
            "description": "Discover expert web development and design tips from Dadword IT.",
            "url": "https://www.dadwordit.com/blog",
            "blogPost": []
        },
        canonical: "https://www.dadwordit.com/blog"
    },
    career: {
        title: 'Career | Dadword IT',
        meta: {
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            keywords: 'About Dadword IT, web development agency, web design services',
            author: 'Dadword IT'
        },
        og: {
            title: 'Career | Dadword IT',
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Career | Dadword IT ',
            description: 'Learn about Dadword IT, a top-rated web development and design agency. Discover our mission, expertise, and services we provide to help businesses grow online.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
			"@context": "https://schema.org",
			"@type": "AboutPage",
			"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://www.dadwordit.com/about"
		},
			"name": "About Dadword IT",
			"description": "Learn about Dadword IT, a leading web development agency providing top-notch web design and development services.",
			"publisher": {
				"@type": "Organization",
				"name": "Dadword IT",
				"url": "https://www.dadwordit.com"
			}
		},
        canonical: "https://www.dadwordit.com/career"
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
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Schedule a Call | Talk to Web Development Experts | Dadword IT ',
            description: 'Schedule a call with Dadword IT, a leading web development agency. Book a consultation to discuss your web design and development needs today!',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Let's Talk | Schedule a Call with Dadword IT",
            "url": "https://www.dadwordit.com/lets-talk",
            "description": "Schedule a consultation with Dadword IT to discuss your web development and design needs.",
            "contactOption": ["TollFree", "Online"],
            "areaServed": "Global",
            "availableLanguage": ["English"]
        },
        canonical: "https://www.dadwordit.com/lets-talk"
    },
    contact_us: {
        title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts',
        meta: {
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            keywords: 'About Dadword IT, web development agency, web design services',
            author: 'Dadword IT'
        },
        og: {
            title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts',
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Contact Us | Reach Out to Dadword IT - Web Development Experts ',
            description: 'Contact Dadword IT for web design and development services. Reach out to our experts to discuss your project and get a tailored solution.',
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Dadword IT | Web Development Agency",
            "url": "https://www.dadwordit.com/get-quote",
            "description": "Reach out to Dadword IT for professional web development and design services.",
            "contactOption": ["Email", "Phone", "Online"],
            "areaServed": "Global",
            "availableLanguage": ["English"]
        },
        canonical: "https://www.dadwordit.com/contact-us"
    },
    customer_faq: {
        title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
        meta: {
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            keywords: 'About Dadword IT, web development agency, web design services',
            author: 'Dadword IT'
        },
        og: {
            title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Frequently Asked Questions | Dadword IT - Web Development Agency',
            description: "Find answers to frequently asked questions about Dadword IT's web design and development services. Contact us for more details!",
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services do you offer as an IT agency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We specialize in web design and web development services. This includes creating visually appealing and user-friendly websites, developing custom web applications, and maintaining and updating your website to ensure it stays functional and secure."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to complete a web design or development project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The timeline depends on the complexity and scope of the project. A basic website typically takes 2-4 weeks, while a more complex web application may take several months. We provide a detailed timeline after understanding your requirements."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with website maintenance after the project is completed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We offer ongoing website maintenance and support services, including updates, bug fixes, and security checks, to ensure your website remains up-to-date and performs optimally."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer custom website design or use templates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide fully customized website designs tailored to your brand and business needs. We avoid generic templates to ensure your website stands out and delivers a unique user experience."
                }
              },
              {
                "@type": "Question",
                "name": "Will my website be mobile-friendly and responsive?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all our websites are designed to be mobile-friendly and fully responsive. This ensures your site looks great and functions seamlessly on all devices, including smartphones, tablets, and desktops."
                }
              },
              {
                "@type": "Question",
                "name": " Do you provide SEO services for the websites you design?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we ensure your website is optimized for search engines with basic SEO practices, including proper meta tags, clean code, and fast-loading pages. For advanced SEO strategies, we can discuss additional services tailored to your goals."
                }
              }
            ]
        },
        canonical: "https://www.dadwordit.com/faq"
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
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Privacy Policy | Dadword IT - Web Development Agency',
            description: "Read Dadword IT's Privacy Policy to understand how we handle your data and protect your privacy while using our web development services.",
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: null,
        canonical: null
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
            image: 'https://dadwordit.com/images/logo.png',
            url: 'https://dadwordit.com',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Terms and Conditions | Dadword IT - Web Development Agency',
            description: "Review the Terms and Conditions for using Dadword IT's web design and development services. Understand the terms that govern our relationship with clients.",
            image: 'https://dadwordit.com/images/logo.png'
        },
        schema: null,
        canonical: null
    }
}

module.exports = SEO_CONFIG;