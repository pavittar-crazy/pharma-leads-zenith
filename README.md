
# Pavittar Pharmaceuticals CRM

A comprehensive Customer Relationship Management system for Pavittar Pharmaceuticals, built with React, TypeScript, Supabase, and Shadcn UI.

## Project Overview

The Pavittar Pharmaceuticals CRM is a full-featured platform designed to manage leads, manufacturers, orders, documents, and more. It comes with user authentication, role-based access control, and a responsive UI.

### Key Features

- **Authentication System**: Secure login/signup with email and password
- **Role-Based Access Control**: Different permission levels for admins and regular employees
- **Lead Management**: Track and manage potential customers through the sales pipeline
- **Manufacturer Management**: Maintain relationships with pharmaceutical manufacturers
- **Order Processing**: Create and manage customer orders
- **Calendar & Scheduling**: Plan meetings and events with a full-featured calendar
- **Messaging System**: Internal communication between team members
- **Dashboard & Analytics**: Visual representation of key business metrics

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

## Database Structure

The CRM uses the following main tables in Supabase:

- **leads**: Tracks potential customers and sales opportunities
- **manufacturers**: Stores pharmaceutical manufacturer details
- **orders**: Manages customer orders and fulfillment
- **profiles**: Stores user profile information
- **user_roles**: Manages role-based permissions
- **employees**: Stores employee-specific information
- **tasks**: Tracks tasks assigned to employees
- **events**: Stores calendar events and schedules

## Authentication & Authorization

- Authentication is handled through Supabase Auth
- Row-Level Security (RLS) policies control data access
- Each user is assigned a role (admin, manager, sales, employee)
- Custom security definer functions ensure proper data access

## Project Structure

```
src/
├── components/      # UI components
│   ├── auth/        # Authentication components
│   ├── layout/      # Layout components (Navbar, Sidebar)
│   ├── ui/          # Shadcn UI components
│   └── ...          # Feature-specific components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── integrations/    # Third-party integrations
├── lib/             # Utility functions and constants
├── pages/           # Route pages
└── services/        # API service functions
```

## Backend Services

The CRM connects to Supabase for:

1. **Authentication**: User management and secure authentication flows
2. **Database**: PostgreSQL database with Row-Level Security
3. **Storage**: Document and image storage
4. **Functions**: Backend edge functions for complex operations

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up a Supabase project and update configuration
4. Run the development server with `npm run dev`

## Authentication Setup

The CRM uses email/password authentication through Supabase. To set up admin users:

1. Create users through the signup form or Supabase dashboard
2. Manually assign admin roles through Supabase SQL editor:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('USER_ID', 'admin');
   ```

## Admin Features

Admin users (Ankit, Preeti) have access to:

- Assigning tasks to employees
- Managing employee calendars and schedules
- Viewing all leads and orders across the organization
- Configuring system settings
- Managing user roles and permissions

## Development Roadmap

Planned features and improvements:

- More sophisticated reporting and analytics
- Mobile application for field sales team
- Integration with additional third-party services
- Enhanced document management system
- Automated email campaigns

## Connected Database

The CRM connects to Supabase with proper Row-Level Security policies ensuring that:

- Users can only access data they are authorized to see
- Admins have full access to all data
- Data modifications are properly logged and tracked

## License

Proprietary software for Pavittar Pharmaceuticals.

## Credits

Developed by Rishul Chanana
