# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8da43188-908a-4e8a-b272-31327e95c3a9

## Codebase Overview

This is a Pharmaceutical CRM application built with React, TypeScript, and Vite. It uses shadcn-ui components with Tailwind CSS for styling, and Supabase for backend services.

### Key Files and Directories

- **`src/App.tsx`**: Main application component that sets up routing with React Router, authentication context, and layout components including Navbar and Sidebar.
- **`src/main.tsx`**: Entry point that renders the App component into the DOM.
- **`src/context/AuthContext.tsx`**: Manages authentication state throughout the application.
- **`src/components/auth/PrivateRoute.tsx`**: Protects routes that require authentication.
- **`src/components/layout/`**: Contains Navbar and Sidebar components for application navigation.
- **`src/pages/`**: Contains all page components including:
  - `Index.tsx`: Dashboard home page
  - `Leads.tsx`: Lead management page
  - `LeadManagement.tsx`: Detailed lead operations
  - `Manufacturers.tsx`: Manufacturer management
  - `Orders.tsx`: Order management
  - `Performance.tsx`: Performance analytics
  - `Settings.tsx`: Application settings
  - `Auth.tsx`: Authentication pages (login, register, etc.)
  - `NotFound.tsx`: 404 page

### UI Components

- **`src/components/ui/`**: Contains shadcn-ui components like calendar, collapsible, aspect-ratio, etc.

### Configuration Files

- **`tsconfig.app.json`**: TypeScript configuration for the application.
- **`components.json`**: Configuration for shadcn-ui components.
- **`eslint.config.js`**: ESLint configuration for code linting.
- **`tailwind.config.ts`**: Tailwind CSS configuration.

### Known Issues and Solutions

1. **Authentication Error**: 
   - **Issue**: Error fetching user role as seen in console logs: `"Error fetching user role: {"code":"PGRST116","details":"The result contains 0 rows"..."`
   - **Solution**: Verify that your Supabase database has a roles table and that users are properly assigned roles upon registration. Check your Supabase schema and add appropriate role assignments in your authentication flow.

2. **CSS Styling Conflicts**:
   - **Issue**: `App.css` contains global styles that may conflict with Tailwind and shadcn-ui.
   - **Solution**: Consider removing or refactoring `App.css` as it has potential conflicts with the Tailwind utility classes. Prefer using Tailwind classes or component-specific styles.

3. **Incomplete Calendar Component**:
   - **Issue**: The `calendar.tsx` file appears to be truncated, showing only part of the component.
   - **Solution**: Update the calendar component with the complete implementation, likely missing the component declaration and imports.

4. **Sidebar State Management**:
   - **Issue**: Sidebar state is managed at the App level which could cause performance issues in larger applications.
   - **Solution**: Consider using context or more localized state management for sidebar visibility.

5. **Missing API Service Layer**:
   - **Issue**: Direct API calls might be scattered throughout components.
   - **Solution**: Implement a dedicated service layer in `src/services/` to centralize API calls and handle errors consistently.

### Development Recommendations

1. Complete the error handling for authentication flows
2. Implement proper loading states throughout the application
3. Add form validation using Zod and React Hook Form
4. Set up proper TypeScript interfaces for all data models
5. Add unit and integration tests

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8da43188-908a-4e8a-b272-31327e95c3a9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8da43188-908a-4e8a-b272-31327e95c3a9) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
