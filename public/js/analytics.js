(function () {
    // Define your production and development GA tracking IDs
    var productionGA = 'G-C5GMTPKVG9';  // Replace with your production tracking ID
    var devGA = 'G-P7BTHRMZPD';         // Replace with your development tracking ID (if different)

    // Determine if we're in a production environment or development environment
    console.log("window.location.hostname", window.location.hostname)
    var isProduction = window.location.hostname === 'dadwordit.com' || window.location.hostname === 'www.dadwordit.com'; // Change to your actual production domain
    var trackingId = isProduction ? productionGA : devGA;

    // Dynamically create the GA script tag
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingId;
    script.async = true;

    // Append the script to the document
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Initialize Google Analytics once the script is loaded
    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());

        // Send pageview event
        gtag('config', trackingId);
    };
})();