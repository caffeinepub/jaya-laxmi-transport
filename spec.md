# Jaya Laxmi Transport

## Current State
Single-page website with sections: Home, About Us, Services, Fleet (photo grid), Contact. All sections render on one page. The Fleet section shows 9 vehicle photos in a grid. The About section also shows one vehicle photo. Navigation links smooth-scroll to sections.

## Requested Changes (Diff)

### Add
- A tab-based navigation at the top level: "Home" tab (default) and "Gallery" tab.
- A Gallery tab page that shows all 9 fleet vehicle photos in a responsive photo grid.

### Modify
- Main page (Home tab): Remove the Fleet section entirely (no images shown on the main page). All other sections (Hero, About, Services, Contact) stay intact. The About section should also NOT show the vehicle photo -- replace with text/icon content or remove the image from About too.
- The navbar should show the Gallery tab link, switching to the Gallery view instead of smooth-scrolling.
- NAV_LINKS: replace "Fleet" with "Gallery" that switches tabs instead of scrolling.

### Remove
- Fleet section from the main page scroll layout.
- Vehicle photo in the About section.

## Implementation Plan
1. Add a top-level `activeTab` state: `'home' | 'gallery'`.
2. Render `<GalleryPage>` when `activeTab === 'gallery'`, else render the normal single-page scroll layout (Hero, About, Services, Contact).
3. `GalleryPage`: Full page with a clean heading "Our Vehicle Fleet" and a responsive 3-column photo grid of all 9 FLEET_IMAGES.
4. Update `NAV_LINKS`: replace Fleet entry with Gallery. In navbar, clicking Gallery sets `activeTab = 'gallery'` and scrolls to top; clicking other links sets `activeTab = 'home'` and smooth-scrolls.
5. In `AboutSection`: Remove the truck photo and floating badge. Replace left column with a stats/trust block or simply move to single-column text layout.
6. Footer nav: Gallery link also switches tab.
7. Add `data-ocid` markers: `nav.gallery.tab`, `gallery.section`, `gallery.item.1`...`gallery.item.9`.
