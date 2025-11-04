# TODO: Make Select Fields Full Width in LeadDrawer.jsx

- [x] Add className="w-full" to the SelectTrigger for operation selection
- [x] Add className="w-full" to the SelectTrigger for value selection (for array/picklist fields)
- [x] Add className="w-full" to the Input fields for "between" date ranges
- [x] Add className="w-full" to the single Input fields for other types
- [x] Change datetime-local to date for date inputs to fix functionality
- [x] Remove direction="right" from Drawer to fix clickability issues
- [x] Restore value and onChange for "between" date inputs
- [x] Replace HTML date inputs with Shadcn Calendar components for better UX

# TODO: Refactor LeadInformation.jsx to use centralized picklist options

- [x] Remove local definitions of insuranceLeadStatusOptions, leadStatusStageOption, genderOption, etc. from LeadInformation.jsx
- [x] Update imports to include all required options from ../utils/picklist.js
- [x] Update picklist.js to export insuranceLeadStatusOptions and leadStatusStageOption as objects with value, label, and color properties
- [x] Update LeadInformation.jsx to use the new object structure for status options with color indicators
- [x] Remove redundant empty lines and clean up code formatting
