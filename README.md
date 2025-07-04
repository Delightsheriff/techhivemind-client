# TechHiveMind

A central place for all tech products, representing a hub where customers can find various tech gadgets.

## Running Locally

To run TechHiveMind locally, follow these steps:

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Setup

1.  **Clone the repository:**
    Replace `<repository-url>` with the actual URL of this repository.
    ```bash
    git clone <repository-url>
    cd techhivemind-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file:
    ```bash
    cp .env.local.example .env.local
    ```
    Update the `.env.local` file with your specific configurations. You'll need to provide:
    *   `NEXT_PUBLIC_API_URL`: The URL of your backend API.
    *   `NEXTAUTH_SECRET`: A secret key for NextAuth.js. You can generate one using `openssl rand -hex 32`.
    *   `NEXTAUTH_URL`: The canonical URL of your Next.js application (e.g., `http://localhost:3000`).

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running on [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev` or `yarn dev`
    *   Runs the app in development mode with Turbopack.
    *   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    *   The page will reload if you make edits.

*   `npm run build` or `yarn build`
    *   Builds the app for production to the `.next` folder.
    *   It correctly bundles React in production mode and optimizes the build for the best performance.

*   `npm run start` or `yarn start`
    *   Starts the production server.
    *   This command should be run after building the application with `npm run build`.

*   `npm run lint` or `yarn lint`
    *   Runs ESLint to analyze the code for potential errors and style issues.

## Key Technologies

This project is built with the following key technologies:

*   **Next.js:** A React framework for building server-side rendered and static web applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **NextAuth.js:** An authentication library for Next.js applications.
*   **Zustand:** A small, fast, and scalable state management solution for React.
*   **Zod:** A TypeScript-first schema declaration and validation library.
*   **Radix UI:** A collection of unstyled, accessible UI components.
*   **Lucide React:** A library of simply beautiful open-source icons.

## Project Structure

The project follows a standard Next.js project structure:

*   `public/`: Contains static assets like images and fonts.
*   `src/`: Contains the main source code for the application.
    *   `app/`: Core of the Next.js application, using the App Router.
        *   `layout.tsx`: Defines the root layout for the application.
        *   `page.tsx`: The main landing page of the application.
        *   `[category]/page.tsx`: Dynamic route for category pages.
        *   `product/[id]/page.tsx`: Dynamic route for individual product pages.
        *   `api/`: API routes, including NextAuth.js authentication routes.
    *   `components/`: Reusable React components used throughout the application.
        *   `ui/`: UI components, often built with Radix UI and styled with Tailwind CSS.
    *   `lib/`: Utility functions, server actions, authentication logic, and type definitions.
        *   `actions/`: Server-side actions for various functionalities (e.g., cart, checkout, product management).
        *   `auth.ts`: NextAuth.js configuration.
        *   `utils.ts`: General utility functions.
        *   `validations/`: Zod schemas for data validation.
    *   `store/`: Zustand stores for global state management (e.g., cart, wishlist).
    *   `types/`: TypeScript type definitions.
*   `middleware.ts`: Next.js middleware for handling requests.
*   `next.config.ts`: Configuration file for Next.js.
*   `tailwind.config.ts`: Configuration file for Tailwind CSS.
*   `tsconfig.json`: Configuration file for TypeScript.
*   `package.json`: Lists project dependencies and scripts.

## API Interaction

The TechHiveMind client application interacts with a separate backend API for data fetching, user authentication, and other business logic. The base URL for this API should be configured in the `.env.local` file using the `NEXT_PUBLIC_API_URL` variable.

Server-side actions in `src/lib/actions/` are primarily responsible for making requests to this backend API.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:

1.  Open an issue to discuss the changes.
2.  Fork the repository and create a pull request with your changes.

Please ensure your code follows the project's linting rules (`npm run lint`).
