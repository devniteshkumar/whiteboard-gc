# Whiteboard App

A modern, interactive whiteboard application built with Next.js, React, and Konva.js. This digital whiteboard provides a clean interface for drawing, sketching, and creating visual content with various tools and shapes.

## Features

- **Authentication**: Google sign-in for secure access
- **Drawing Tools**: Pen tool for freehand drawing
- **Shape Tools**: Rectangle, circle, diamond, arrow, and line tools
- **Selection Tools**: Cursor tool for selecting canvas elements
- **Responsive Design**: Works seamlessly across different screen sizes

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Canvas Engine**: Konva.js with React-Konva
- **Authentication**: NextAuth.js with Google OAuth
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whiteboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   
   Create a `.env.local` file in the root directory and add your Google OAuth credentials:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the whiteboard application.

## Project Structure

```
whiteboard/
├── app/                    # Next.js app directory
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts # NextAuth API route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── login/
│   │   └── page.tsx       # Login page
│   └── page.tsx           # Main whiteboard page
├── components/            # React components
│   ├── Canvas.tsx         # Main canvas component
│   ├── providers.tsx      # Context providers
│   └── Toolbar.tsx        # Drawing tools toolbar
├── public/                # Static assets
│   └── icons/             # SVG icons for tools
├── store/                 # State management
│   └── useToolStore.ts    # Tool state store
├── auth.ts                # NextAuth configuration
├── next-env.d.ts          # Next.js type definitions
├── package.json           # Dependencies and scripts
├── proxy.ts               # Proxy configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
└── eslint.config.mjs      # ESLint configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Usage

1. **Sign In**: Visit the application and sign in with your Google account
2. **Select Tools**: Click on any tool in the toolbar to activate it
3. **Draw**: Use the pen tool to draw freehand on the canvas
4. **Add Shapes**: Select shape tools (square, circle, diamond, arrow, line) and click and drag on the canvas to add them
5. **Navigate**: Use the cursor tool to interact with the canvas