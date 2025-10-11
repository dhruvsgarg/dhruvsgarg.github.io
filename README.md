# Minimal Academic Website Template

A clean, minimal academic website template, designed for researchers and PhD students. The design and source code are from [Yuhui Zhang](https://cs.stanford.edu/~yuhuiz/).

![Screenshot](images/demo.jpg)

## Features

- Minimalist, academic-focused design
- Responsive layout
- Easy to customize
- SEO-friendly meta tags
- Publication showcase support

## Quick Start

0. Clone this repository and `cd` into the directory
1. Run `python -m http.server` and visit `http://localhost:8000`
2. Replace placeholders marked with `[brackets]` in `index.html`
3. Update profile photo in `images/profile.jpeg`
4. Modify `publications.json` for your papers
5. Customize sections as needed (About, Research, News, etc.)

## File Structure

```
.
├── index.html          # Main webpage
├── styles.css          # CSS styling
├── scripts.js          # JavaScript for dynamic content
├── publications.json   # Publication data
└── images/            # Image assets
    # Minimal Academic Website Template

    A clean, minimal academic website template, designed for researchers and PhD students. The design and source code are from [Yuhui Zhang](https://cs.stanford.edu/~yuhuiz/).

    ![Screenshot](images/demo.jpg)

    ## Features

    - Minimalist, academic-focused design
    - Responsive layout
    - Easy to customize
    - SEO-friendly meta tags
    - Publication showcase support

    ## Quick Start

    0. Clone this repository and `cd` into the directory
    1. Run `python -m http.server` and visit `http://localhost:8000`
    2. Replace placeholders marked with `[brackets]` in `index.html`
    3. Update profile photo in `images/profile.jpeg`
    4. Modify `publications.json` for your papers
    5. Customize sections as needed (About, Research, News, etc.)

    ## File Structure

    ```
    .
    ├── index.html          # Main webpage
    ├── styles.css          # CSS styling
    ├── scripts.js          # JavaScript for dynamic content
    ├── publications.json   # Publication data
    └── images/            # Image assets
            └── profile.jpg
    ```

    ## publications.json (how it works)

    Publications displayed on the site are loaded dynamically from `publications.json` by `scripts.js`.

    Each publication entry is an object with fields like:

    ```
    {
        "title": "Paper Title",
        "authors": ["D Garg", "A Other"],
        "venue": "Conference/Year",
        "thumbnail": "images/thumbs/tech_tower_steps.jpg",
        "selected": 1,
        "award": "Best Paper",
        "links": { "pdf": "https://...", "doi": "https://...", "video": "https://..." }
    }
    ```

    - `thumbnail` should be a relative path under `images/thumbs/` if you add images.
    - `selected: 1` marks it as part of the Selected publications view; `0` keeps it hidden unless the user clicks "Show All".

    ### Adding thumbnails

    1. Add images under `images/thumbs/` (prefer small, optimized images; WebP encouraged).
    2. Use filenames that match `thumbnail` values in `publications.json`.

    ### Mentor/advisor links and styling

    Mentor/advisor lines in `index.html` use `.mentor` and `.mentor-link` classes. Replace placeholder `href="#"` values with actual profile URLs. The CSS will render these subtly (italic and faint dotted underline).

    ## License

    MIT License

    ---

    For a live example, visit [Yuhui Zhang's website](https://cs.stanford.edu/~yuhuiz/).
