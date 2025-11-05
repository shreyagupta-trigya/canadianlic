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
