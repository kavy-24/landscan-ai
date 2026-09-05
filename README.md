# LandScan AI

STRICT RULES:

- Use React with Vite

- Use JavaScript JSX ONLY

- DO NOT use TypeScript

- DO NOT generate .ts files

- DO NOT generate .tsx files

- DO NOT generate interfaces, types, enums, generics, or TypeScript syntax

- Use functional React components

- Use Tailwind CSS

- Use React Router DOM

- Use Lucide React icons

- Export default components

- Use mock data and mock API state

- Create a complete production-quality frontend

PROJECT TITLE:

BhoomiScan AI

TAGLINE:

AI-Powered Land Record Digitization, OCR Extraction, Validation and Verification System

PROJECT DESCRIPTION:

Build a complete frontend for a government land record digitization platform.

The platform digitizes handwritten and scanned land records using OCR and AI.

Workflow:

Operator uploads scanned land records.

↓

OCR extracts text.

↓

AI (Gemini) converts text into structured fields.

↓

System validates extracted information.

↓

Verifier reviews the record.

↓

Admin monitors progress and system performance.

DESIGN REQUIREMENTS:

- Modern government-tech dashboard

- Clean SaaS style

- Professional appearance suitable for Smart India Hackathon

- Responsive design

- Rounded cards

- Soft shadows

- White cards

- Light gray background

- Blue primary color

- Elegant typography

- Consistent spacing

- Premium dashboard feel

ROLES:

==================================================

OPERATOR

==================================================

Allowed Pages:

- Dashboard

- Upload Record

- OCR Processing

- OCR Result

- My Uploads

- Search Records

==================================================

VERIFIER

==================================================

Allowed Pages:

- Dashboard

- Verification Queue

- Review Record

- Search Records

==================================================

ADMIN

==================================================

Allowed Pages:

- Dashboard

- User Management

- Analytics

- Verification Queue

- Search Records

==================================================

FOLDER STRUCTURE

==================================================

src/

├── components/

│   ├── dashboard/

│   ├── layout/

│   ├── forms/

│   ├── tables/

│   ├── cards/

│   └── ui/

│

├── pages/

│   ├── auth/

│   ├── operator/

│   ├── verifier/

│   ├── admin/

│   └── common/

│

├── layouts/

├── routes/

├── context/

├── services/

├── utils/

└── assets/

==================================================

AUTHENTICATION

==================================================

Login Page

Features:

- Email

- Password

- Role Selection

- Login Button

- Modern Authentication Card

- Government Branding

==================================================

OPERATOR MODULE

==================================================

Operator Dashboard

Show:

- Total Uploads

- Pending Verification

- Verified Records

- Rejected Records

- Recent Upload Activity

- Monthly Upload Statistics

Upload Record Page

Features:

- Drag and Drop Upload

- PDF Upload

- Image Upload

- Upload Progress

- File Preview

- Upload Status

- Upload Button

- Reset Button

OCR Processing Page

Features:

- Processing Animation

- OCR Progress Bar

- AI Extraction Progress

- Document Preview

- Estimated Completion Time

- Professional Loading Screen

OCR Result Page

Two Column Layout

LEFT PANEL:

- Original Document Preview

- OCR Extracted Raw Text

- Highlight Low Confidence Text

RIGHT PANEL:

AI Structured Data

Fields:

- Owner Name

- Father Name

- Khasra Number

- Survey Number

- Village

- Taluka

- District

- State

- Land Area

- Record Year

Validation Section:

- Overall Confidence Score

- Field Confidence Scores

- Missing Field Detection

- Duplicate Detection

- Validation Warnings

Buttons:

- Edit Data

- Re-run OCR

- Re-run AI Extraction

- Download Report

- Send For Verification

My Uploads Page

Features:

- Search

- Status Filter

- Upload History

- Status Badges

- View Details Button

- Record Count

==================================================

VERIFIER MODULE

==================================================

Verification Queue

Features:

- Search Records

- Filter By Priority

- Filter By Confidence

- Pending Records Table

- Priority Badges

- Confidence Scores

- Review Button

Review Record Page

Features:

Two Column Layout

LEFT:

- Original Document Preview

- OCR Text

RIGHT:

- Editable Structured Data

- Validation Issues

- Confidence Scores

Actions:

- Approve Record

- Reject Record

- Request Reprocessing

- Add Verification Notes

- Save Changes

Status Badge:

- Pending

- Approved

- Rejected

==================================================

COMMON MODULE

==================================================

Search Records Page

Features:

- Search By Owner

- Search By Khasra Number

- Search By Survey Number

- Search By Village

- Search By District

- Status Filter

Results Table:

- Record ID

- Owner

- Khasra Number

- Village

- Status

- View Button

Empty State UI

==================================================

ADMIN MODULE

==================================================

Admin Dashboard

Stats Cards:

- Total Records

- Verified Records

- Pending Records

- Rejected Records

- Operators

- Verifiers

- OCR Accuracy

- AI Extraction Accuracy

Digitization Progress:

- Progress Bar

- Completion Percentage

District Statistics:

- District Wise Records

- Verified Records

- Pending Records

Recent Activity Feed:

- Upload Events

- Verification Events

- OCR Events

User Management

Features:

- User Table

- Search Users

- Role Filter

- Add User Button

- Edit User Button

- Disable User Button

- Status Badge

User Roles:

- Admin

- Operator

- Verifier

Analytics Page

Features:

Dashboard Cards:

- OCR Accuracy

- AI Accuracy

- Verification Rate

- Duplicate Detection Rate

Charts:

- Monthly Upload Trend

- OCR Accuracy Trend

- Verification Trend

- District Performance

Additional Metrics:

- Average Processing Time

- Records Processed Today

- Pending Reviews

- Rejected Records

==================================================

GLOBAL COMPONENTS

==================================================

Sidebar

Role Based Navigation

Operator Menu:

- Dashboard

- Upload Record

- OCR Processing

- OCR Result

- My Uploads

- Search Records

Verifier Menu:

- Dashboard

- Verification Queue

- Review Record

- Search Records

Admin Menu:

- Dashboard

- User Management

- Analytics

- Verification Queue

- Search Records

Navbar

Features:

- Notifications

- User Profile

- User Role Badge

- Logout Button

Reusable Components:

- Stats Card

- Data Table

- Search Bar

- Status Badge

- Progress Card

- Metric Card

- Empty State Component

==================================================

ROUTING

==================================================

Create complete React Router structure.

Create:

- Protected Routes

- Role Based Routes

- Navigation Between Pages

==================================================

IMPORTANT

==================================================

Generate complete frontend.

Generate all pages.

Generate all components.

Generate all routes.

Generate all layouts.

Use React JSX only.

Use Tailwind CSS only.

No TypeScript.

No TSX.

No TypeScript syntax anywhere.

The UI should look modern, professional, polished and hackathon-winning.

The frontend should be ready for future integration with:

- OCR Engine

- Gemini AI

- Node.js Backend

- Express API

- MongoDB Database

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1333ee99-871c-41a5-9d41-b3348573601e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
