This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Installed Packages
npm install @tanstack/react-query @tanstack/react-table
npm install @reduxjs/toolkit react-redux
npm install axios jwt-decode
npm install react-hook-form zod @hookform/resolvers
npm install socket.io-client
npm install recharts
npm install clsx
npm install lucide-react
npm install next-themes
npm install tailwindcss postcss autoprefixer
npx shadcn@latest init


## Mock Users
"admin@demo.com": "admin",
"pm@demo.com": "projectManager",
"dev@demo.com": "developer",
Any password value is accepted for demo purposes.



## Authentication & Role Management
Authentication is implemented using a JWT-based flow.
For assessment purposes, credential validation is mocked on the frontend, simulating a backend-issued JWT containing role claims.
Upon login, a mock JWT is generated, decoded on the client, and stored in Redux Toolkit to manage authentication state across the application, and applies role-based access control across routes and UI components.




## Dashboard Page
The Dashboard provides a comprehensive overview of all projects with advanced data handling and UX features.

Implemented capabilities include:
-Paginated project listing
-Client-side sorting (name, dates, progress, budget)
-Filtering by project status
-Search by project name
-Inline editing for editable fields based on user role
-Optimistic updates for a smooth editing experience
-Skeleton loaders during data fetching

The dashboard layout is fully responsive and optimized for both desktop and mobile views.



## Project Details Page
Each project has a dedicated details page that displays full project information and associated tasks.

Key features include:
-Detailed project overview
-Task list per project
-Add, edit, and bulk update tasks
-Real-time task updates using a WebSocket-based simulation
-Role-based permissions for task creation and editing
-Skeleton loaders and optimistic UI updates for improved user experience



## Search & Advanced Filtering
The application supports advanced data filtering and search capabilities across projects and tasks:

-Search by project or task name
-Filter by status
-Filter by priority
-Filter by assigned user
-Combined filters applied seamlessly with pagination and sorting


## UI & Best Practices
The UI is built following modern frontend best practices with a strong focus on usability and maintainability:

-Fully responsive design using Tailwind CSS
-Accessible components following WCAG guidelines
-Semantic HTML and ARIA attributes where applicable
-Form validation using react-hook-form with Zod
-Skeleton loaders for loading states
-Optimistic updates for mutations using React Query
-Centralized state management with Redux Toolkit


## Charts & Analytics
The application includes data visualization to provide insights into project progress:

-Project progress charts implemented using Recharts
-Analytics visibility restricted to Admin users only
-Charts dynamically update based on project data