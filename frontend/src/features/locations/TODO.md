# TODO: Refactor LocationDetailView UI

## Objective
Refactor LocationDetailView UI to improve layout and styling by adopting a tab and accordion system similar to PolicyDetailsView, and removing the sidebar.

## Tasks

- [ ] Replace button-based tabs with Tabs and TabsTrigger components.
- [ ] Add badges to tabs where applicable for counts.
- [ ] Organize tab content using accordions for complex sections similar to PolicyDetailsView accordions.
- [ ] Modularize tab contents into subcomponents if needed.
- [ ] Remove the sidebar user info card completely.
- [ ] Maintain Overview tab with LocationForm component.
- [ ] Stub or create placeholders for other tab contents like Notes, Attachments, Contacts, etc.
- [ ] Implement loading and error handling UI improvements.
- [ ] Test responsive behavior and adjust for mobile view.
- [ ] Verify overall layout and styling consistency.
- [ ] Review and cleanup any unused states or hooks.

## Notes
- Refer to frontend/src/features/Policy/PolicyDetailsView.jsx for tab and accordion usage.
- Keep the API data fetching logic as is unless better structure is identified.
- Check usage of badges in PolicyDetailsView for applying similar UX patterns.
