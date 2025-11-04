# Canadian LIC (Life Insurance Company) Project Documentation

## Project Overview

**Canadian LIC** is a comprehensive CRM and management system for a life insurance company. It provides a dashboard interface for advisors, administrators, and staff to handle client interactions, policy management, referrals, and business analytics.

### Key Features
- **Dashboard Analytics**: Real-time stats on money, users, clients, and sales with interactive charts.
- **User Management**: Role-based access control, user creation, authentication, and permissions.
- **Lead & Deal Management**: Convert leads to deals, track progress, and manage insurance products.
- **Policy Management**: Handle life insurance, critical illness, RRSP/TFSA, and investment policies.
- **Referral System**: Manage referrals, approvals, and commissions.
- **Contact & Partner Management**: CRM for clients, advisors, and insurance partners.
- **Reporting & Analytics**: Charts for sales by country, categories, and performance metrics.
- **Utilities**: SMS, WhatsApp integration, file uploads, and CSV imports.

## Technology Stack

### Frontend
- **Framework**: Vue.js 3.4.21
- **UI Library**: Argon Dashboard 2 (Bootstrap 5 based)
- **Routing**: Vue Router 4.0.14
- **State Management**: Vuex 4.0.2
- **Styling**: SCSS, Bootstrap 5.3.3, Custom CSS
- **Charts**: Chart.js 3.6.0
- **Icons**: Lucide Vue, Nucleo Icons
- **Other Libraries**: Axios for API calls, Vee-Validate for forms, Vue-Infinite-Loading, etc.

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Zoho Catalyst Datastore (with ZCQL queries)
- **Authentication**: JWT, bcrypt for password hashing
- **Email**: Catalyst Email service
- **File Handling**: Catalyst File store for attachments
- **Deployment**: Zoho Catalyst Functions

### Development Tools
- **Build Tool**: Vue CLI 4.5.0
- **Linting**: ESLint with Prettier
- **Package Manager**: npm
- **Version Control**: Git

## Project Structure

### Frontend (`canadianlic/client/app/`)
```
src/
├── assets/           # Static assets (CSS, images, fonts)
├── components/       # Reusable Vue components (Argon UI elements)
├── composable/       # Vue composables
├── constants/        # App constants
├── directives/       # Custom Vue directives
├── examples/         # Example components (Cards, Charts, Navbars)
├── router/           # Vue Router configuration
├── services/         # API service functions
├── store/            # Vuex store modules
├── views/            # Page components (Dashboard, Users, Leads, etc.)
├── App.vue           # Root component
├── main.js           # App entry point
└── argon-dashboard.js # Dashboard plugin
```

### Backend (`canadianlic/functions/`)
Multiple Catalyst functions, each handling specific domains:
- `usersFunction/`: User authentication, roles, and management
- `canadianlicApi/`: Main API router with sub-routers for deals, leads, policies, etc.
- `lead/`, `deals/`, `Policy/`, etc.: Domain-specific functions
- `mailFunction/`: Email services
- `attachments/`: File upload handling

## Key Components & Features

### Dashboard
- **Stats Cards**: Display key metrics (Today's Money, Users, Clients, Sales)
- **Charts**: Gradient line chart for sales overview, bar charts for categories
- **Tables**: Sales by country, recent activities
- **Carousel**: Promotional slides

### User Management
- **Authentication**: Sign-in/Sign-up with OTP verification
- **Roles & Permissions**: Custom roles with module-based permissions
- **Profile Management**: User details, settings, and updates

### CRM Features
- **Contacts**: Client information, details view
- **Leads**: Lead forms, conversion to deals, advisor assignment
- **Deals**: Various insurance types (Life/Critical, RRSP, Super Visa)
- **Policies**: Policy creation, details, investments
- **Referrals**: Referral management, approvals
- **Advisors**: Advisor profiles, credentials, canvases

### Integrations
- **SMS/WhatsApp**: Communication utilities
- **Email**: Invitation and notification emails
- **CSV Import**: Bulk data import
- **File Uploads**: Document attachments

## API Endpoints (Sample)

### Users
- `POST /usersFunction/app/createuser` - Create new user
- `GET /usersFunction/app/getallusers` - Get all users
- `POST /usersFunction/app/updateuser/:id` - Update user

### Leads
- `GET /canadianlicApi/lead/api/v2/getAllLeads` - Get leads
- `POST /canadianlicApi/lead/api/v2/createLead` - Create lead

### Deals
- `GET /canadianlicApi/deal/api/v2/getAllDeals` - Get deals
- `POST /canadianlicApi/deal/api/v2/createDeal` - Create deal

## Database Schema (Key Tables)
- `userData`: User information
- `userSignupData`: Authentication data
- `appUsersRole`: User roles and permissions
- `leads`, `deals`, `policies`, `referrals`: Business entities
- `contacts`, `advisors`, `partners`: CRM data

## Deployment & Setup

### Frontend
1. Navigate to `canadianlic/client/app/`
2. Run `npm install`
3. Run `npm run serve` for development
4. Run `npm run build` for production

### Backend
Each function is deployed separately on Zoho Catalyst:
1. Navigate to function directory (e.g., `canadianlic/functions/usersFunction/`)
2. Run `npm install`
3. Deploy via Catalyst CLI or web console

## Security & Best Practices
- **Authentication**: JWT tokens, password hashing with bcrypt
- **Authorization**: Role-based access control
- **Input Validation**: Vee-Validate for forms
- **CORS**: Enabled for cross-origin requests
- **Error Handling**: Try-catch blocks, proper HTTP status codes

## Future Enhancements
- Mobile app development
- Advanced analytics and reporting
- Integration with external insurance APIs
- AI-powered lead scoring
- Multi-language support

This documentation provides a high-level overview. For detailed implementation, refer to the source code and individual function documentation.
