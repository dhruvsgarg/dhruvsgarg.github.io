//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Lightweight helpers inspired by the Academic template
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMoreWorks() {
    const dd = document.getElementById('moreWorksDropdown');
    if (!dd) return;
    dd.classList.toggle('open');
}

function copyBibTeX() {
    const codeEl = document.getElementById('bibtex-code');
    if (!codeEl) return;
    const text = codeEl.innerText || codeEl.textContent;
    if (!navigator.clipboard) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { }
        document.body.removeChild(ta);
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-bibtex-btn .copy-text');
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = 'Copied';
            setTimeout(() => btn.textContent = orig, 1400);
        }
    });
}

// Expose helpers to global scope so inline onclick attributes work in templates
window.scrollToTop = scrollToTop;
window.toggleMoreWorks = toggleMoreWorks;
window.copyBibTeX = copyBibTeX;
