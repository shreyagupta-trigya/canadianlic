<<<<<<< HEAD
# TODO: Migrate Vue LeadsDetailView to React LeadsDetailsView

## Overview
Transform the React LeadsDetailsView.jsx component to match the functionality and layout of the Vue LeadsDetailView.vue component, including navbar, mobile view, sidebar, quick actions, and responsive design.

## Tasks

### 1. Add State Management
- [x] Add useState for mobileView (window.innerWidth <= 900)
- [x] Add useState for navVisible (false)
- [x] Add useState for selectedTab ("Overview")
- [x] Add useState for selectedActionTab ("")
- [x] Add useState for isUserVisible (true)
- [x] Add useState for showInfo1, showInfo2, showInfo3, showInfo4 (true/false)
- [x] Add useState for searchQuery ("")
- [x] Add useState for items (array of quick actions)
- [x] Add useState for filteredItems (computed from items and searchQuery)

### 2. Implement Navbar
- [ ] Create navbar div with conditional classes for mobile/desktop
- [ ] Add mobile navbar toggle (hamburger/close icon)
- [ ] Add desktop tabs: Overview, Conversations (with badge), Attachments, Comms (with badge), and dropdown for more tabs
- [ ] Add mobile collapsible navbar with sub-nav for Communication
- [ ] Handle tab selection and sub-tab selection

### 3. Add Sub-Navigation for Communication
- [ ] Add sub-nav div when selectedTab === 'Communication' and !mobileView
- [ ] Include WhatsApp, SMS, Email with badges
- [ ] Handle selectedActionTab changes

### 4. Implement Right Sidebar
- [ ] Add User-Offerings-section div with toggle icon
- [ ] Add User section
- [ ] Add Referrals section with accordion (showInfo3)
- [ ] Add Policies section with accordion (showInfo4)
- [ ] Handle sidebar visibility and width changes

### 5. Add Quick Actions Dropdown
- [ ] Add Quick Actions button with dropdown
- [ ] Include search input in dropdown
- [ ] Filter items based on searchQuery
- [ ] Handle item clicks

### 6. Update TabsContent Rendering
- [ ] Modify TabsContent to render based on selectedTab and selectedActionTab
- [ ] Add conditions for Overview (LeadClientForm or LeadAdvisorForm)
- [ ] Add conditions for Conversations (Notes)
- [ ] Add conditions for Attachments (Attachment)
- [ ] Add conditions for Communication sub-tabs (Whatsapp, SMS, Email)
- [ ] Add conditions for dynamic tabs (ReferralLead, ReferralClient, etc.)

### 7. Add Responsive Design and CSS
- [ ] Add CSS classes for mobile/desktop views
- [ ] Implement responsive breakpoints
- [ ] Style navbar, sidebar, dropdowns to match Vue
- [ ] Add transitions and hover effects

### 8. Handle Events and Methods
- [ ] Add handleResize for mobileView updates
- [ ] Add showNav, showUser, toggleInfo, selectTab, selectActionTab methods
- [ ] Add handleItemClick for quick actions
- [ ] Add useEffect for window resize listener

### 9. Update Imports and Components
- [ ] Ensure all component imports are correct (Whatsapp, SMS, Email, etc.)
- [ ] Add missing component imports if needed
- [ ] Verify component paths

### 10. Testing and Finalization
- [ ] Test mobile view responsiveness
- [ ] Test desktop view layout
- [ ] Test sidebar toggle
- [ ] Test quick actions dropdown
- [ ] Test tab switching and sub-tab functionality
- [ ] Ensure no console errors
=======
# Migration TODO: Restructure Functions to Layer-Centric Architecture

## Overview
Migrate controllers and routers from module-centric folders (e.g., functions/lead/) into the existing layer-centric functions/backend_function/ structure.

## Steps
- [x] Create subfolders in functions/backend_function/controller/ and routers/ for new modules
- [x] Move controller files from each module to backend_function/controller/
- [x] Move router files from each module to backend_function/routers/
- [x] Move supporting folders (Utils, Query, crmIntegration, etc.) to backend_function/
- [x] Update import paths in moved files
- [x] Update functions/backend_function/index.js to include new routers
- [ ] Test functionality after migration

## Modules to Migrate
- [x] crmIntegration
- [x] csvimport
- [x] demotheme_function
- [x] insurancePartner
- [ ] investment
- [ ] locations
- [ ] mailFunction
- [ ] Policy
- [ ] ProductFunction
- [ ] referralFunction
- [ ] tickets
- [ ] uatServerFunction
- [ ] usersFunction
- [ ] utilsFunction

## Notes
- Skip 'deals' and 'lead' as they already exist in backend_function; verify if merge needed.
- Rename files for consistency (e.g., Controller.js to moduleController.js).
- Update relative paths in imports.
>>>>>>> aa9e1dba1aaf25fa114204f1270db3ed3e44e779
