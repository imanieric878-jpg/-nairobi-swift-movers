(function() {
    // ── Nav UX: block parent-link clicks & add hover grace period ────────────────
    var megaItems = document.querySelectorAll('.main-menu .has-mega-menu');

    megaItems.forEach(function(li) {
        var link   = li.querySelector(':scope > a.nav-link');
        var menu   = li.querySelector('.mega-menu-wrapper');
        var timer  = null;
        var DELAY  = 300; // ms grace period before dropdown hides

        // 1. Block click navigation — dropdown parents are not pages
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            // Also remove pointer cursor hint that it's a link
            link.style.cursor = 'default';
        }

        // 2. Hover with grace-period using JS class instead of pure CSS :hover
        function openMenu() {
            clearTimeout(timer);
            // Close any other open menus first
            megaItems.forEach(function(other) {
                if (other !== li) other.classList.remove('menu-open');
            });
            li.classList.add('menu-open');
        }

        function closeMenuDelayed() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                li.classList.remove('menu-open');
            }, DELAY);
        }

        // Trigger open/close on the li (covers both trigger & dropdown panel)
        li.addEventListener('mouseenter', openMenu);
        li.addEventListener('mouseleave', closeMenuDelayed);

        // If user re-enters the dropdown before timer fires, cancel close
        if (menu) {
            menu.addEventListener('mouseenter', openMenu);
            menu.addEventListener('mouseleave', closeMenuDelayed);
        }
    });
})();
