### Next.js e-commerce project

This e-commerce project is Next.js application with MongoDB and Firebase DB, TailwindCSS and Stripe for payment.

### Prerequisites

You would need the following tools installed before running the project locally:

- Node 20
- VSCode (or any preferred IDE)

### Running the project

1. Clone the repository:
   
   ```
   https://github.com/ignatIgnatov/next-js-e-commerce.git
   ```
2. Navigate to the project directory:

   ```
   cd (path to your project's folder)
   ```
4. Install the dependencies:
   
   ```
   npm install
   ```
5. Create your account in https://dashboard.stripe.com to take your Secret Key and Publishable Key
6. In .env.local file add the following:

   ```
   DATABASE_URL={YOUR_MONGODB_DATABASE_URL}
   
   FIREBASE_API_KEY={YOUR_FIREBASE_API_KEY}
   FIREBASE_MESSAGING_SENDER_ID={YOUR_FIREBASE_MESSAGING_SENDER_IDL}
   FIREBASE_APP_ID={YOUR_FIREBASE_APP_ID}
   FIREBASE_STORAGE_URL={YOUR_FIREBASE_STORAGE_URL}

   NEXT_STRIPE_SK={YOUR_STRIPE_SECRET_KEY}
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY={YOUR_STRIPE_PUBLISHABLE_KEY}

   ```
7. Start the project:

   ```
   npm run dev
   ```
8. Access the application:

   - Go to http://localhost:3000