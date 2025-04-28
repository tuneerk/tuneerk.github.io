document.addEventListener('DOMContentLoaded', () => {

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinkTriggers = document.querySelectorAll('.nav-link-trigger'); // Links/buttons that trigger section changes
    const allNavLinks = document.querySelectorAll('.main-nav .nav-link'); // All links in nav for setting active state
    const contentSections = document.querySelectorAll('.content-section'); // All sections to be shown/hidden
    const currentYearSpan = document.getElementById('current-year');

    // --- Set Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Navigation Toggle ---
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            // Toggle hamburger/close icon (using Font Awesome classes)
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
        });

        // Close mobile menu when a trigger link inside it is clicked
        mainNav.querySelectorAll('.nav-link-trigger').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-open')) {
                    mainNav.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // --- Function to Show/Hide Sections based on Nav Click ---
    const handleNavClick = (event) => {
        // Prevent default anchor behavior ONLY if it's a real click event
        if (event) {
           event.preventDefault();
        }

        // Determine target section ID (default to #home if no event)
        const targetId = event ? event.currentTarget.getAttribute('href') : '#home';

        // Guard against null/empty targetId
        if (!targetId || targetId === '#') {
            console.warn('Navigation trigger clicked without a valid href.');
            return;
        }

        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        try {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.warn(`Target section not found for ID: ${targetId}. Showing #home.`);
                document.querySelector('#home')?.classList.add('active'); // Fallback gracefully
            }
        } catch (e) {
            console.error(`Error selecting target section with ID: ${targetId}`, e);
            document.querySelector('#home')?.classList.add('active'); // Fallback on error
        }


        // Update active state for navigation links
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the targetId
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // Scroll view to top when changing sections (good UX)
         window.scrollTo({ top: 0, behavior: 'smooth' }); // Added smooth scroll here
    };

    // Add event listeners to all trigger links/buttons
    navLinkTriggers.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // --- Initial Page Load Setup ---
    const setupInitialView = () => {
        const initialSectionId = '#home'; // Always start at home
        const initialSection = document.querySelector(initialSectionId);
        const initialNavLink = document.querySelector(`.main-nav a[href="${initialSectionId}"]`);

        // Ensure all sections hidden first, then show initial
        contentSections.forEach(section => section.classList.remove('active'));
        if (initialSection) {
            initialSection.classList.add('active');
        } else {
             console.error("Initial section '#home' not found!");
        }


        // Set initial active nav link
        allNavLinks.forEach(link => link.classList.remove('active'));
        if (initialNavLink) {
            initialNavLink.classList.add('active');
        } else {
             console.warn("Initial nav link for '#home' not found!");
        }
    };

    setupInitialView(); // Set the initial view when the DOM is ready

});