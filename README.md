It sounds like you might be experiencing issues with how your `README.md` file appears on GitHub. Here are a few common issues and solutions to ensure your `README.md` looks as intended:

### 1. **Check Markdown Formatting**
Make sure that your Markdown syntax is correct. For example, ensure there are no stray backticks, and that headers, lists, and code blocks are properly formatted.

### 2. **Verify Image Path**
Ensure that the image path in the Markdown file is correct and the image is included in your repository. If the image file (`logo.webp`) is in the same directory as your `README.md`, the path `![Description of Image](logo.webp)` should work. If the image is in a subdirectory, adjust the path accordingly.

### 3. **Commit and Push the Correct File**
Ensure that you've committed and pushed the `README.md` file and any associated image files properly. Here’s a quick guide to make sure everything is in order:

1. **Stage the Changes**
   ```bash
   git add README.md logo.webp
   ```

2. **Commit the Changes**
   ```bash
   git commit -m "Update README.md with project details and add image"
   ```

3. **Push to GitHub**
   ```bash
   git push origin main
   ```

### 4. **View on GitHub**
Go to your repository on GitHub and check the rendered `README.md` file. Sometimes changes might take a few moments to reflect.

### 5. **Preview Locally**
If you’re unsure how the Markdown will look on GitHub, you can use a Markdown preview tool in your code editor (like VSCode) or use a local Markdown renderer to visualize it before pushing.

### 6. **Check for GitHub Specific Syntax**
GitHub might have specific requirements or limitations. Make sure to adhere to GitHub’s [Markdown specifications](https://guides.github.com/features/mastering-markdown/) and adjust accordingly.

### Example README.md Formatting

Here's a cleaned-up version of your `README.md` for clarity:

```markdown
![Description of Image](logo.webp)

# Invoice Manager

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

- **Framework**: Node.js (Nest.js is preferred but optional)
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

### Installation

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

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the application:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

1. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

2. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

## Usage

### Frontend

Currently, no specific usage instructions for the frontend.

### Backend

- RESTful API endpoints for CRUD operations on invoices:
  - `POST /api/v1/invoices` - Create a new invoice
  - `GET /api/v1/invoices` - Retrieve all invoices
  - `GET /api/v1/invoices/:id` - Retrieve a specific invoice by ID
  - `PUT /api/v1/invoices/:id` - Update an invoice by ID
  - `DELETE /api/v1/invoices/:id` - Delete an invoice by ID

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

