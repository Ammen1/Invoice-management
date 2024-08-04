# Invoice Manager

![Description of Image](logo.webp)

Welcome to the Invoice Manager project! This application allows users to create, view, update, and delete invoices. It also supports exporting invoices as PDF files and exporting invoice data as an Excel file.

## Features

- **CRUD Operations**: Create, read, update, and delete invoices.
- **Export Functionality**: Export individual invoices as PDF files and all invoices as an Excel balance sheet.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technology Stack

### Frontend

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Linting**: ESLint

### Backend

- **Framework**: Nest.js (Node.js)
- **API**: RESTful APIs for CRUD operations
- **Authentication**: Secure user authentication and management

### Database

- **DBMS**: PostgreSQL
- **ORM**: Prisma

## Setup Instructions

### Prerequisites

- Node.js (v14 or above) and npm installed
- PostgreSQL installed and running
- Git installed

### Frontend Setup (Next.js)

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Ammen1/Lepton-Games-Onboarding---Assessment.git
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the `frontend` directory and add the following environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the application:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup (Nest.js)

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

6. **Run the development server:**

   ```bash
   npm run start:dev
   ```

7. **Open the backend API:**

   The backend API will be running at [http://localhost:4000](http://localhost:4000).

## Database Schema

The database schema is defined using Prisma ORM. The schema includes two main models: `User` and `Invoice`.

### User Model

- **id**: The unique identifier for each user.
- **email**: The user's email, which is unique.
- **password**: The user's password (hashed).
- **firstName**: The user's first name (optional).
- **lastName**: The user's last name (optional).
- **invoices**: A list of invoices associated with the user.

### Invoice Model

- **id**: The unique identifier for each invoice.
- **invoiceNumber**: The number assigned to the invoice.
- **clientName**: The name of the client for the invoice.
- **items**: A string representing the items included in the invoice.
- **totalAmount**: The total amount for the invoice.
- **dueDate**: The due date for the invoice.
- **userId**: The ID of the user who owns the invoice.
- **user**: The user associated with this invoice.

### Prisma Schema

The relationship between the `User` and `Invoice` models is a one-to-many relationship. A single user can have multiple invoices, but each invoice is associated with exactly one user.

## Usage

### Frontend (Next.js)

The frontend provides pages for managing invoices, including creating, viewing, updating, and deleting invoices. It also supports exporting invoices as PDF and Excel files.

### Backend (Nest.js)

- RESTful API endpoints for CRUD operations on invoices:
  - `POST /invoices` - Create a new invoice
  - `GET /invoices` - Retrieve all invoices
  - `GET /invoices/:id` - Retrieve a specific invoice by ID
  - `PUT /invoices/:id` - Update an invoice by ID
  - `DELETE /invoices/:id` - Delete an invoice by ID

## Deployment

### Vercel (Frontend)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy the application:**

   ```bash
   vercel
   ```

### Heroku (Backend)

1. **Install Heroku CLI:**

   ```bash
   npm install -g heroku
   ```

2. **Log in to Heroku:**

   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**

   ```bash
   heroku create invoice-manager-backend
   ```

4. **Deploy the application:**

   ```bash
   git push heroku main
   ```

5. **Set up environment variables on Heroku:**

   ```bash
   heroku config:set DATABASE_URL=postgresql://username:password@host:port/database
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

## Contribution

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Progress

Regular commits and updates have been pushed to this repository. The user `@Ammen1` has been added as a collaborator to monitor progress.

## Contact

For any questions or clarifications, feel free to reach out to [amenguda@gmail.com](mailto:amenguda@gmail.com).

---

Thank you for your interest in the Invoice Manager project!

```
