// Global variables
let allPublications = [];
let showingSelected = true;

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  // Load publications data
  loadPublications();

  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });

  // Adjust anchors so sticky header does not cover section headings
  function adjustSectionScrollOffset() {
    const nav = document.querySelector('.top-nav');
    const offset = (nav && nav.offsetHeight) ? nav.offsetHeight + 12 : 64; // px
    document.querySelectorAll('section').forEach(s => {
      s.style.scrollMarginTop = `${offset}px`;
    });
  }

  // run once and on resize
  adjustSectionScrollOffset();
  window.addEventListener('resize', adjustSectionScrollOffset);

  // Add event listener for toggle button
  const toggleButton = document.getElementById('toggle-publications');
  if (toggleButton) {
    toggleButton.addEventListener('click', togglePublications);
  }

});

// Load publications from JSON file
function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      allPublications = data.publications;
      renderPublications(true);
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      // Create fallback publications display if JSON loading fails
      displayFallbackPublications();
    });
}

// Fallback if JSON loading fails
function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = `Error loading publications.`;
}

// Toggle between showing all or selected publications
function togglePublications() {
  showingSelected = !showingSelected;
  renderPublications(showingSelected);

  // Update button text
  const toggleButton = document.getElementById('toggle-publications');
  toggleButton.textContent = showingSelected ? 'Show All' : 'Show Selected';
  const toggleHeader = document.getElementById('toggle-header');
  toggleHeader.textContent = showingSelected ? 'Selected Publications' : 'All Publications';
}

// Render publications based on selection state
function renderPublications(selectedOnly) {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';

  const pubsToShow = selectedOnly ?
    allPublications.filter(pub => pub.selected === 1) :
    allPublications;

  pubsToShow.forEach(publication => {
    const pubElement = createPublicationElement(publication);
    publicationsContainer.appendChild(pubElement);
  });
}

// Create HTML element for a publication
function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';

  // Create thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'pub-thumbnail';
  thumbnail.onclick = () => openModal(publication.thumbnail);

  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = publication.thumbnail;
  thumbnailImg.alt = `${publication.title} thumbnail`;
  thumbnail.appendChild(thumbnailImg);

  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';

  // Add title
  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = publication.title;
  content.appendChild(title);

  // Add authors with highlight
  const authors = document.createElement('div');
  authors.className = 'pub-authors';

  // Format authors with highlighting
  let authorsHTML = '';
  publication.authors.forEach((author, index) => {
    // Highlight your name
    if (author.includes('D Garg')) {
      authorsHTML += `<span class="highlight-name">${author}</span>`;
    } else {
      authorsHTML += author;
    }
    if (index < publication.authors.length - 1) {
      authorsHTML += ', ';
    }
  });

  authors.innerHTML = authorsHTML;
  content.appendChild(authors);

  // Add venue with award if present
  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';

  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = publication.venue;
  venueContainer.appendChild(venue);

  // Add award if it exists
  if (publication.award && publication.award.length > 0) {
    const award = document.createElement('div');
    award.className = 'pub-award';
    award.textContent = publication.award;
    venueContainer.appendChild(award);
  }

  content.appendChild(venueContainer);

  // Add links if they exist
  if (publication.links) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    // Helper to create a link element
    const makeLink = (href, label) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      return a;
    };

    // Order: pdf, doi, link, code, project, video
    let firstAdded = false;
    if (publication.links.pdf) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.pdf, '[PDF]'));
      firstAdded = true;
    }
    if (publication.links.doi) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.doi, '[DOI]'));
      firstAdded = true;
    }
    if (publication.links.link) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.link, '[Link]'));
      firstAdded = true;
    }
    if (publication.links.code) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.code, '[Code]'));
      firstAdded = true;
    }
    if (publication.links.project) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.project, '[Project Page]'));
      firstAdded = true;
    }
    if (publication.links.video) {
      if (firstAdded) links.appendChild(document.createTextNode(' '));
      links.appendChild(makeLink(publication.links.video, '[Video]'));
      firstAdded = true;
    }

    content.appendChild(links);
  }

  // Assemble the publication item
  pubItem.appendChild(thumbnail);
  pubItem.appendChild(content);

  return pubItem;
}

// Modal functionality for viewing original images
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal when clicking outside the image
window.onclick = function (event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}

/* --------------------- Travel Map (Leaflet) --------------------- */
// Load Leaflet dynamically and initialize the map
function initTravelMap() {
  if (!document.getElementById('travelMap')) return;

  // load script dynamically
  const leafletScript = document.createElement('script');
  leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  leafletScript.onload = () => {
    try {
      // store mapRef globally so we can call invalidateSize later
      window._travelMapRef = L.map('travelMap', { preferCanvas: true }).setView([33.7490, -84.3880], 5); // Atlanta sample

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(window._travelMapRef);

      // local reference
      const map = window._travelMapRef;

      // disable wheel zoom by default to avoid accidental page scroll capture
      if (map && map.scrollWheelZoom) map.scrollWheelZoom.disable();
      // enable wheel zoom when cursor is over the map
      map.on('mouseover', () => { try { map.scrollWheelZoom.enable(); } catch (e) { } });
      map.on('mouseout', () => { try { map.scrollWheelZoom.disable(); } catch (e) { } });

      // marker color categories mapping (blue: work/home/study, green: vacation, orange: layover)
      const CATEGORY_COLORS = { work: '#2a7ae2', home: '#2a7ae2', study: '#2a7ae2', vacation: '#4ac28a', layover: '#e28a2a' };
      const icon = (color) => L.divIcon({
        className: 'custom-marker',
        html: `<span style="background:${color}" class="dot"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      // helper to add marker by latlng or geocode by name (simple)
      function addMarker({ lat, lng, name, category = 'work' }) {
        const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.work;
        if (typeof lat === 'number' && typeof lng === 'number') {
          L.circleMarker([lat, lng], { radius: 7, color: color, fillColor: color, fillOpacity: 0.9 }).addTo(map).bindPopup(`<strong>${name}</strong>`);
        } else if (name) {
          // Use Nominatim for simple name -> latlng (rate-limited, public)
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`)
            .then(r => r.json())
            .then(results => {
              if (results && results[0]) {
                const latf = parseFloat(results[0].lat), lngf = parseFloat(results[0].lon);
                L.circleMarker([latf, lngf], { radius: 7, color: color, fillColor: color, fillOpacity: 0.9 }).addTo(map).bindPopup(`<strong>${name}</strong>`);
              }
            }).catch(() => {
              console.warn('Geocoding failed for', name);
            });
        }
      }

      // Load travel.json and render markers
      fetch('travel.json').then(r => r.json()).then(data => {
        const locs = data && data.locations ? data.locations : [];
        locs.forEach(loc => {
          addMarker({ lat: loc.lat, lng: loc.lng, name: loc.name, category: loc.category });
        });
      }).catch(e => {
        console.warn('Could not load travel.json, adding sample marker');
        addMarker({ name: 'Atlanta, GA, USA', category: 'work' });
      });

      // Configure map interaction: disable zooming entirely; allow horizontal panning (world wrap)
      map.setMaxBounds([[-90, -360], [90, 360]]);
      map.options.maxZoom = 3;
      map.options.minZoom = 1;
      try { map.zoomControl.remove(); } catch (e) { }
      try { map.dragging.enable(); } catch (e) { }
      try { map.scrollWheelZoom.disable(); } catch (e) { }

      // Invalidate size reliably
      setTimeout(() => { try { map.invalidateSize(); } catch (e) { } }, 250);
      window.addEventListener('resize', () => { try { map.invalidateSize(); } catch (e) { } });

      // expose helper globally for quick additions in console or future UI
      window.addTravelLocation = addMarker;
    } catch (e) { console.error('Leaflet init failed', e); }
  };
  document.body.appendChild(leafletScript);
}

// Initialize travel map after DOM loaded
document.addEventListener('DOMContentLoaded', initTravelMap);
