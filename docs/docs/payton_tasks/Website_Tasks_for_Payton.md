# Website Task List for Payton

## Phase 1: Complete Image Migration (Priority: HIGH - 1-2 weeks)

### Missing Images to Upload
Upload these images to Supabase Storage in the specified folders:

**Residential Locations (Need 3 images each):**
- `pages/residential-berthoud/` - hero.webp, local-truck.webp, service-area-map.webp
- `pages/residential-longmont/` - hero.webp, local-truck.webp, service-area-map.webp  
- `pages/residential-loveland/` - hero.webp, local-truck.webp, service-area-map.webp

**Additional Service Images:**
- `pages/residential/` - Add 2-3 more service images to match other pages
- Any missing commercial or roll-off images as needed

### Image Implementation in Code
- Update all React components to use the new image management system
- Replace hardcoded image URLs with the centralized image helper functions
- Test image loading on all pages to ensure no broken images

## Phase 2: Database Content Verification (Priority: MEDIUM - 1 week)

### Content Audit Tasks
- Check that all FAQ tables have sufficient content:
  - General FAQs (faqs table)
  - Residential FAQs by location (residential_faqs table)  
  - Commercial FAQs (commercial_faqs table)
  - Roll-off FAQs (rolloff_faqs table)
- Verify location-specific content is populated in:
  - residential_towns table
  - rolloff_towns table
- Ensure service specifications are complete in:
  - commercial_sizes table
  - rolloff_sizes table

### Missing Content Creation
- Add any missing FAQ content for service areas
- Complete location-specific descriptions for all towns
- Verify all service specifications have complete data

## Phase 3: Website Testing & Quality Assurance (Priority: HIGH - 1 week)

### Functionality Testing
- Test all FAQ sections load properly from database
- Verify location pages display correct content
- Check quote forms submit successfully
- Test image loading on all pages
- Verify mobile responsiveness on all pages

### Performance Testing
- Check page load speeds (should be under 2 seconds)
- Test database query performance
- Verify images load efficiently
- Check for any broken links or 404 errors

### SEO Verification
- Confirm all pages have proper titles and descriptions
- Verify canonical URLs are working
- Check structured data implementation
- Test social media sharing (Open Graph images)

## Phase 4: Content Management Interface (Priority: LOW - Future)

### Admin Panel Development
- Create simple forms for updating FAQ content
- Build interface for managing location-specific content
- Add testimonial management system
- Implement quote request tracking interface

## Phase 5: Monitoring & Analytics Setup (Priority: MEDIUM - 1 week)

### Analytics Implementation
- Verify Google Analytics is tracking properly
- Set up conversion tracking for quote forms
- Monitor database performance
- Check error logging and reporting

### Performance Monitoring
- Set up alerts for slow page loads
- Monitor database query performance
- Track image loading times
- Monitor quote form completion rates

## Detailed Task Checklist

### Week 1: Image Completion
- [ ] Upload Berthoud residential images (3 files)
- [ ] Upload Longmont residential images (3 files)
- [ ] Upload Loveland residential images (3 files)
- [ ] Add residential service page images (2-3 files)
- [ ] Update image references in React components
- [ ] Test all pages for image loading

### Week 2: Database & Testing
- [ ] Audit all FAQ content for completeness
- [ ] Add missing location-specific content
- [ ] Test FAQ loading on all pages
- [ ] Test quote forms functionality
- [ ] Verify mobile responsiveness
- [ ] Check page load speeds

### Week 3: SEO & Performance
- [ ] Verify all SEO elements working
- [ ] Test social media sharing
- [ ] Monitor database performance
- [ ] Set up conversion tracking
- [ ] Document any issues found

## Success Criteria

**Image Migration Complete:**
- All location pages have hero images
- No broken image links site-wide
- Images load in under 1 second

**Database Content Complete:**
- All FAQ sections have at least 5-10 questions
- All location pages have unique content
- All service specifications are populated

**Performance Targets:**
- Page load times under 2 seconds
- No 404 errors
- Quote forms have 90%+ success rate
- Mobile score 90+ on Google PageSpeed

## Resources & Access Needed

- Supabase dashboard access for image uploads
- Database access for content verification
- Google Analytics access for monitoring
- Staging/testing environment access

## Questions to Clarify

1. Do you have specific images for the missing location pages?
2. What content should be added to FAQ sections?
3. Should I focus on any specific pages first?
4. Do you want an admin interface for content management?
5. What analytics/tracking is most important to you?
