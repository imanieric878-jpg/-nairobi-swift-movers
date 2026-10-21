/**
 * NairobiSwift Movers - Centralized Business Configuration
 * Central configuration for company contact information, endpoints, and profiles.
 */
const BusinessConfig = {
    companyName: "NairobiSwift Movers",
    legalName: "NairobiSwift Movers Kenya",
    tagline: "Professional Relocation & Moving Services in Nairobi",
    shortDescription: "Professional movers in Nairobi, Kenya offering house moving, office relocation, packing services, and expert furniture handling across Nairobi.",
    
    // Contact Information
    phone: "+254 704 372 636",
    phoneRaw: "0704372636",
    phoneLink: "tel:+254704372636",
    whatsapp: "+254 704 372 636",
    whatsappNumber: "254704372636",
    whatsappLink: "https://wa.me/254704372636",
    email: "nairobiswift1@gmail.com",
    emailLink: "mailto:nairobiswift1@gmail.com",
    
    // Form submission endpoint
    formspreeEndpoint: "https://formspree.io/f/mqpevyga",
    
    // Business Location & Hours
    address: "RNG Plaza, Ronald Ngala St, Nairobi, Kenya",
    streetAddress: "RNG Plaza, Ronald Ngala St",
    city: "Nairobi",
    county: "Nairobi County",
    country: "Kenya",
    mapLink: "https://maps.app.goo.gl/jRh2jHkPLS8YxiqTA",
    workingHours: "Mon - Sat 8:00 AM - 6:00 PM",
    
    // Primary Service Areas
    primaryServiceAreas: [
        "Nairobi", "Westlands", "Kilimani", "Kileleshwa", "Karen", 
        "Lavington", "Runda", "Muthaiga", "Parklands", "Lang'ata", 
        "South B", "South C", "Nairobi CBD", "Gigiri", "Ruaka", 
        "Kasarani", "Ruiru", "Syokimau", "Donholm", "Kitengela"
    ],
    
    // Social Profiles
    socials: {
        tiktok: "https://www.tiktok.com/@nairobiswiftmovers",
        instagram: "https://www.instagram.com/nairobiswiftmovers",
        facebook: "https://www.facebook.com/nairobiswiftmovers",
        twitter: "https://twitter.com/nairobiswift",
        youtube: "https://www.youtube.com/@nairobiswiftmovers"
    },
    
    // Currency & Pricing
    currency: "KES",
    priceRange: "KES"
};

// Auto-sync dynamic elements on page load if present
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Apply company name
        document.querySelectorAll('.company-name-text').forEach(el => el.textContent = BusinessConfig.companyName);
        
        // Apply contact links
        document.querySelectorAll('.business-phone-text').forEach(el => el.textContent = BusinessConfig.phone);
        document.querySelectorAll('.business-phone-link').forEach(el => el.setAttribute('href', BusinessConfig.phoneLink));
        
        document.querySelectorAll('.business-email-text').forEach(el => el.textContent = BusinessConfig.email);
        document.querySelectorAll('.business-email-link').forEach(el => el.setAttribute('href', BusinessConfig.emailLink));
        
        document.querySelectorAll('.business-address-text').forEach(el => el.textContent = BusinessConfig.address);
        document.querySelectorAll('.business-hours-text').forEach(el => el.textContent = BusinessConfig.workingHours);
        
        document.querySelectorAll('.business-whatsapp-link').forEach(el => el.setAttribute('href', BusinessConfig.whatsappLink));
        document.querySelectorAll('.business-map-link').forEach(el => el.setAttribute('href', BusinessConfig.mapLink));
        
        // Connect footer newsletter / stay connected form to Formspree
        const newsletterForm = document.getElementById('newslettersForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput ? emailInput.value.trim() : '';
                if (!email) return;

                const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Subscribing...';
                }

                fetch(BusinessConfig.formspreeEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        formType: 'Newsletter Subscription (Stay Connected)',
                        email: email,
                        dateSubmitted: new Date().toISOString()
                    })
                }).then(function() {
                    window.location.href = 'thank-you.html';
                }).catch(function(err) {
                    console.error('Newsletter dispatch error:', err);
                    window.location.href = 'thank-you.html';
                });
            });
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BusinessConfig;
}
