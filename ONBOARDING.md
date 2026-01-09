# Chat Application - Engineering Onboarding Guide

Welcome to the Chat application! This comprehensive guide will help you get up and running with our AI-powered chat application built with Next.js, React, and PostgreSQL.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Architecture Overview](#architecture-overview)
6. [Development Workflow](#development-workflow)
7. [Adding New Features](#adding-new-features)
8. [Common Tasks](#common-tasks)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Resources](#resources)

## Project Overview

This is a modern, full-stack chat application with real-time AI integration. Key features include:
- AI-powered conversations using OpenAI's GPT-5-nano
- User authentication with session management
- Thread-based conversation organization
- Conversation branching capabilities
- Responsive design with light/dark mode support
- Server-side rendering with Next.js 16

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (via Neon), Drizzle ORM
- **Runtime**: Bun
- **AI**: OpenAI SDK (@ai-sdk/openai)
- **UI Components**: shadcn/ui with Radix UI
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Bun** (latest version)
   ```bash
   # Install Bun on macOS/Linux
   curl -fsSL https://bun.sh/install | bash

   # Or install via npm
   npm install -g bun
   ```

2. **PostgreSQL** (for local development)
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Or use Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=mypassword postgres`

3. **Git** (for version control)

4. **Code Editor** (VS Code recommended with TypeScript and Tailwind CSS extensions)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/cooper-gadd/chat.git
cd chat
```

### 2. Install Dependencies
```bash
bun install
```
This will install all required packages using Bun's package manager.

### 3. Environment Configuration

Copy the example environment file and configure your variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Database connection string
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres

# OpenAI API key for AI chat functionality
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Getting credentials:**
- **Database URL**: Use local PostgreSQL or sign up for free at [Neon](https://neon.tech)
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)

### 4. Database Setup

Generate and run database migrations:
```bash
# Generate migration files from schema
bun run db:generate

# Apply migrations to database
bun run db:migrate

# Alternative: Push schema directly (for development)
bun run db:push
```

To explore the database visually:
```bash
bun run db:studio
```
This opens Drizzle Studio at `https://local.drizzle.studio`

### 5. Run the Development Server
```bash
bun run dev
```

The application will be available at:
- **Application**: http://localhost:3000
- **Database Studio**: https://local.drizzle.studio (when running `db:studio`)

### 6. Create Your First Account

1. Navigate to http://localhost:3000
2. Click "Register" to create a new account
3. Fill in your details and submit
4. You'll be automatically logged in and can start chatting!

## Project Structure

```
chat/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Protected routes (requires login)
│   │   ├── layout.tsx       # Auth layout with sidebar
│   │   ├── page.tsx         # Home page (thread list)
│   │   └── [id]/            # Dynamic thread pages
│   │       ├── page.tsx     # Server component
│   │       └── page.client.tsx # Client component with chat UI
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── api/                 # API endpoints
│   │   └── chat/route.ts    # Chat streaming endpoint
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx       # Reusable UI components
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   └── ... (25+ components)
│   ├── forms/               # Form components
│   │   ├── login.tsx        # Login form with validation
│   │   └── register.tsx     # Registration form
│   ├── app-sidebar.tsx      # Main navigation sidebar
│   ├── header.tsx           # Thread breadcrumb header
│   ├── messages.tsx         # Message display component
│   ├── memoized-markdown.tsx # Optimized markdown rendering
│   └── theme-provider.tsx   # Dark/light mode provider
│
├── actions/                 # Server Actions (server-side functions)
│   ├── create-thread.ts     # Create new chat thread
│   ├── branch-off.ts        # Branch conversation
│   ├── delete-thread.ts     # Delete thread
│   ├── login.ts             # Login logic
│   ├── register.ts          # Registration logic
│   ├── logout.ts            # Logout logic
│   └── get-current-user.ts  # Auth guard
│
├── db/                      # Database layer
│   ├── schema.ts            # Drizzle schema definitions
│   └── index.ts             # Database connection
│
├── context/                 # React Context providers
│   └── pending-message.tsx  # Context for initial messages
│
├── lib/                     # Utility functions
│   └── utils.ts             # Helper functions (cn, extractText)
│
├── hooks/                   # Custom React hooks
│   └── use-mobile.ts        # Responsive design hook
│
├── schemas/                 # Zod validation schemas
│   ├── login.ts             # Login form validation
│   └── register.ts          # Registration form validation
│
├── drizzle/                 # Database migrations (auto-generated)
│   └── meta/                # Migration metadata
│
├── public/                  # Static assets
│   └── *.svg                # SVG icons and images
│
└── Configuration files:
    ├── package.json         # Dependencies & scripts
    ├── tsconfig.json        # TypeScript configuration
    ├── next.config.ts       # Next.js configuration
    ├── drizzle.config.ts    # Drizzle ORM configuration
    ├── components.json      # shadcn/ui configuration
    ├── postcss.config.mjs   # PostCSS configuration
    ├── eslint.config.mjs    # ESLint configuration
    └── vercel.json          # Vercel deployment config
```

## Architecture Overview

### Frontend Architecture
- **Server-Side Rendering (SSR)**: Pages are rendered on the server for better SEO and performance
- **Client Components**: Interactive parts use React client components
- **State Management**: React Context API for app-wide state
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS utility classes + shadcn/ui components

### Backend Architecture
- **API Routes**: Next.js serverless functions handle API requests
- **Server Actions**: Direct server-side functions called from components
- **Database ORM**: Drizzle ORM for type-safe database queries
- **Authentication**: Session-based auth with cookies (2-day expiry)

### Database Schema

The application uses 4 main tables (all prefixed with `chat_`):

```sql
-- Users table
chat_user:
  - id (UUID)
  - username (unique)
  - password (hashed)
  - created_at

-- Sessions table
chat_session:
  - id (UUID)
  - user_id (foreign key)
  - token (unique)
  - created_at

-- Threads table
chat_thread:
  - id (UUID)
  - user_id (foreign key)
  - parent_thread_id (self-reference for branching)
  - title
  - created_at

-- Messages table
chat_message:
  - id (UUID)
  - thread_id (foreign key)
  - role (user/assistant/system)
  - content
  - created_at
```

### Data Flow
1. User sends message → POST to `/api/chat`
2. API streams AI response back to client
3. Messages saved to database on completion
4. UI updates in real-time with streaming content

## Development Workflow

### Running Commands
All commands use Bun as the package manager:

```bash
# Development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Lint code
bun run lint

# Database commands
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
bun run db:push      # Push schema to database
bun run db:studio    # Open database GUI
```

### Code Style Guidelines
1. **TypeScript**: Use strict types, avoid `any`
2. **Components**: Use functional components with hooks
3. **Styling**: Prefer Tailwind classes over custom CSS
4. **Imports**: Use `@/` alias for absolute imports
5. **Server vs Client**: Mark client components with `"use client"`

### Git Workflow
1. Create feature branch from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make changes and commit
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
3. Push and create pull request
   ```bash
   git push origin feature/your-feature-name
   ```

## Adding New Features

### 1. Adding a New Page

Create a new route in the `app` directory:

```tsx
// app/your-page/page.tsx
import { getCurrentUser } from "@/actions/get-current-user";

export default async function YourPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Your New Page</h1>
      {/* Your content here */}
    </div>
  );
}
```

### 2. Adding a New Component

Create a component in `components/`:

```tsx
// components/your-component.tsx
"use client"; // Only if client-side interactivity needed

import { Button } from "@/components/ui/button";

interface YourComponentProps {
  title: string;
  onAction?: () => void;
}

export function YourComponent({ title, onAction }: YourComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={onAction}>Click me</Button>
    </div>
  );
}
```

### 3. Adding a Server Action

Create a new action in `actions/`:

```typescript
// actions/your-action.ts
"use server";

import { db } from "@/db";
import { getCurrentUser } from "./get-current-user";

export async function yourAction(data: any) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Perform database operations
  const result = await db.insert(/* ... */);

  return { success: true, data: result };
}
```

### 4. Adding an API Endpoint

Create a new route handler:

```typescript
// app/api/your-endpoint/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/get-current-user";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Your logic here
  return NextResponse.json({ data: "response" });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Handle POST request
  return NextResponse.json({ success: true });
}
```

### 5. Adding Database Tables

Modify the schema in `db/schema.ts`:

```typescript
// db/schema.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const yourTable = pgTable("chat_your_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

Then generate and apply migrations:
```bash
bun run db:generate
bun run db:migrate
```

### 6. Adding UI Components

Install new shadcn/ui components:

```bash
# Use the shadcn CLI (if available) or copy from shadcn/ui docs
bunx shadcn-ui@latest add dialog
```

Or create custom components following the pattern:
```tsx
// components/ui/your-ui-component.tsx
import { cn } from "@/lib/utils";

interface YourUIComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function YourUIComponent({ className, children }: YourUIComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

## Common Tasks

### Managing User Authentication

Check if user is logged in:
```typescript
import { getCurrentUser } from "@/actions/get-current-user";

const user = await getCurrentUser();
if (!user) {
  // Redirect to login
}
```

### Working with the Database

Query data:
```typescript
import { db } from "@/db";
import { thread, message } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// Get user's threads
const threads = await db
  .select()
  .from(thread)
  .where(eq(thread.userId, userId))
  .orderBy(desc(thread.createdAt));

// Get messages for a thread
const messages = await db
  .select()
  .from(message)
  .where(eq(message.threadId, threadId))
  .orderBy(message.createdAt);
```

### Handling Forms

Use React Hook Form with Zod validation:
```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export function YourForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

### Streaming AI Responses

Use the chat API:
```typescript
import { useChat } from "ai/react";

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: "/api/chat",
  body: { threadId },
});
```

## Testing

Currently, the project doesn't have a testing framework set up. To add testing:

### Setting Up Jest/Vitest
```bash
# Install testing dependencies
bun add -d vitest @testing-library/react @testing-library/jest-dom

# Create vitest.config.ts
```

### Writing Tests
```typescript
// components/__tests__/your-component.test.tsx
import { render, screen } from "@testing-library/react";
import { YourComponent } from "../your-component";

describe("YourComponent", () => {
  it("renders correctly", () => {
    render(<YourComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## Deployment

### Deploying to Vercel

1. **Connect GitHub Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**
   - Add `DATABASE_URL`
   - Add `OPENAI_API_KEY`
   - These are set in Vercel's project settings

3. **Deploy**
   ```bash
   # Automatic deployment on push to master
   git push origin master

   # Or manual deployment
   bunx vercel
   ```

### Production Database

For production, use a managed PostgreSQL service:
- **Neon** (Recommended): Serverless PostgreSQL
- **Supabase**: PostgreSQL with additional features
- **Railway**: Simple PostgreSQL hosting

Update `DATABASE_URL` in Vercel with your production database connection string.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` format
   - Ensure database exists

2. **Bun Installation Issues**
   ```bash
   # Clear Bun cache
   bun pm cache rm

   # Reinstall dependencies
   rm -rf node_modules bun.lockb
   bun install
   ```

3. **TypeScript Errors**
   ```bash
   # Regenerate types
   bun run build

   # Check TypeScript
   bunx tsc --noEmit
   ```

4. **Database Migration Errors**
   ```bash
   # Reset database (CAUTION: Deletes all data)
   bun run db:push

   # Or manually fix in Drizzle Studio
   bun run db:studio
   ```

5. **API Key Issues**
   - Verify OpenAI API key is valid
   - Check API key has sufficient credits
   - Ensure `.env` is not committed to git

### Debug Mode

Enable debug logging:
```typescript
// Add to your code
console.log("Debug:", { variable });

// Or use Next.js debug
export const config = {
  runtime: 'edge',
  unstable_allowDynamic: ['/node_modules/**'],
};
```

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Bun Documentation](https://bun.sh/docs)

### Project Links
- **Repository**: https://github.com/cooper-gadd/chat
- **Issue Tracker**: https://github.com/cooper-gadd/chat/issues
- **Main Branch**: `master`

### Learning Resources
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [Drizzle ORM Quickstart](https://orm.drizzle.team/docs/quick-start)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)

### Getting Help
1. Check this documentation first
2. Search existing GitHub issues
3. Ask in the team Slack channel
4. Create a new GitHub issue with:
   - Clear problem description
   - Steps to reproduce
   - Error messages/screenshots
   - Environment details

## Next Steps

Now that you're set up:

1. ✅ Run the application locally
2. ✅ Create a test account
3. ✅ Explore the codebase structure
4. 📝 Try creating a new thread and chatting
5. 🔧 Make a small change (e.g., update UI text)
6. 🚀 Create your first pull request

Welcome to the team! We're excited to have you contributing to this project. If you have any questions or suggestions for improving this guide, please let us know.

---

*Last updated: January 2025*
*Maintained by: Engineering Team*