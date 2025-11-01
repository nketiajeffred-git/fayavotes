# FayaVotes - Awards & Voting Management Platform

A comprehensive, professional voting and awards management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏆 Awards Management
- Create and manage multiple award events
- Upload award logos and branding
- Set voting periods and nomination deadlines
- Configure pricing models (paid voting, social voting, bulk voting)
- Track award statistics and engagement

### 📊 Categories & Nominees
- Organize nominees by categories
- Manage nominee information and media
- Bulk nominee import/export
- Search and filter capabilities
- Publish/unpublish categories

### 🗳️ Voting System
- Multiple voting types:
  - **Paid Voting**: Per-vote payment system with multiple currencies
  - **Social Voting**: Free voting with social media integration
  - **Bulk Voting**: Package deals for multiple votes
- Real-time vote tracking
- Vote analytics and reporting
- Transaction management
- Payment gateway integration

### 📝 Nominations
- Public nomination submissions
- Nomination review and approval workflow
- Custom nomination forms
- Fee-based or free nominations
- Nomination period management

### 📈 Analytics & Reporting
- Real-time voting statistics
- Category performance metrics
- Revenue tracking
- Export capabilities for reports
- Visual dashboards

### 🎯 Multi-Organization Support
- Manage multiple organizations
- Role-based access control
- Organization-specific branding
- Separate award events per organization

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Progressive Web App capabilities
- Cross-browser compatibility

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Date Handling**: date-fns
- **UI Components**: Custom component library

## Color Scheme

- **Primary Red**: `#E31E24` - Action buttons, CTAs
- **Navy Blue**: `#1E1B4B` - Headers, navigation
- **Gold**: `#FFD700` - Awards, achievements

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

### Development Server

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Default Login

For demo purposes, any email and password will work. The app will redirect to the dashboard.

## Project Structure

\`\`\`
fayavotes/
├── app/
│   ├── dashboard/           # Main dashboard pages
│   │   ├── awards/          # Awards management
│   │   ├── events/          # Events management
│   │   └── organizations/   # Organization management
│   ├── login/               # Authentication
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Reusable UI components
│   └── logo.tsx             # Brand logo
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json
\`\`\`

## Key Pages

### Dashboard (`/dashboard`)
- Awards overview with card-based layout
- Quick access to all award management features
- Responsive grid layout

### Edit Award (`/dashboard/awards/[id]/edit`)
- Comprehensive award configuration
- Logo upload
- Voting period settings
- Nomination configuration
- Pricing setup (paid, social, bulk voting)

### Categories Management
- Create and organize award categories
- Assign nominees to categories
- Category-specific settings

### Nominees Management
- Add individual or bulk nominees
- Nominee profiles with media
- Category assignment
- Search and filter

### Nominations Portal
- Public-facing nomination form
- Custom field configuration
- Payment processing (if applicable)

### Voting Interface
- User-friendly voting experience
- Category browsing
- Vote tracking
- Payment integration

### Results & Analytics
- Real-time results display
- Vote counts and percentages
- Revenue reporting
- Export functionality

## Environment Variables

Create a `.env.local` file:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url

# Payment Gateway
NEXT_PUBLIC_PAYSTACK_KEY=your_paystack_key

# Database (if using)
DATABASE_URL=your_database_url
\`\`\`

## Features Roadmap

- [ ] Backend API integration
- [ ] Database persistence
- [ ] Payment gateway implementation
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] PDF certificate generation
- [ ] Multi-language support

## Design Inspiration

Based on the FayaVotes design templates featuring:
- Modern card-based layouts
- Gold and navy color scheme
- Professional award aesthetics
- Responsive mobile design

## Contributing

This is a custom-built application. For modifications or contributions, please contact the development team.

## License

Proprietary - All rights reserved

## Support

For support and inquiries, contact:
- Email: support@fayavotes.com
- Website: www.fayavotes.com
