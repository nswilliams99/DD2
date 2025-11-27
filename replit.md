# Dumpster Diverz Next.js Website

## Project Overview
This is a Next.js website for Dumpster Diverz, a waste management and dumpster rental service. The project was migrated from a Vite/React application to Next.js for better SEO and server-side rendering capabilities.

## Tech Stack
- **Framework**: Next.js 14.2.15
- **Language**: TypeScript
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Backend**: Supabase (database and storage)
- **Image Optimization**: Next.js Image component with custom OptimizedImage wrapper

## Project Structure
- `src/app/` - Next.js app router pages
- `src/components/` - React components organized by feature
- `src/data/` - Static data for services, FAQs, etc.
- `src/hooks/` - Custom React hooks
- `src/integrations/supabase/` - Supabase client configuration
- `src/lib/` - Utility functions
- `public/` - Static assets

## Development

### Running Locally
The dev server is configured to run on port 5000 with host 0.0.0.0 for Replit compatibility:
```bash
npm run dev
```

### Building
```bash
npm run build
```

### Production
```bash
npm run start
```

## Deployment
This project is configured for Replit's autoscale deployment:
- Build command: `npm run build`
- Start command: `npm run start`
- Port: 5000

## Environment Setup
The project uses Supabase for backend services. The Supabase credentials are currently hardcoded in `src/integrations/supabase/client.ts`.

## Recent Changes
- **2025-11-27**: Initial Replit setup
  - Configured Next.js to run on port 5000 with 0.0.0.0 host
  - Added cache control headers to prevent caching issues
  - Fixed fetchPriority prop in OptimizedImage component
  - Updated .gitignore for Next.js specific files
  - Configured deployment settings for Replit

## Notes
- The server is configured to disable caching to ensure changes are visible in the Replit iframe
- Port 5000 is required for Replit's webview functionality
- The project includes Supabase functions in the `supabase/` directory for backend operations
