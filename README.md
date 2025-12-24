# Major Project - Listings Management App

## Overview
This is a Node.js web application built with Express.js for managing property listings. It provides full CRUD (Create, Read, Update, Delete) functionality for listings, allowing users to view, add, edit, and delete property listings.

## Features Implemented
- **View All Listings**: Display a list of all available listings on the index page.
- **Add New Listing**: Form to create new listings with title, description, image, price, location, and country.
- **View Individual Listing**: Detailed view of a specific listing by ID.
- **Edit Listing**: Update existing listings through an edit form.
- **Delete Listing**: Remove listings from the database.
- **Database Initialization**: Script to populate the database with sample data.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: EJS (Embedded JavaScript) with ejs-mate for layout support
- **Middleware**: method-override for PUT/DELETE requests, dotenv for environment variables
- **Styling**: Bootstrap 5 for responsive design, Font Awesome for icons, custom CSS

## Project Structure
```
Majorproject/
├── app.js                 # Main application file with routes
├── package.json           # Dependencies and scripts
├── models/
│   └── listing.js         # Mongoose schema for listings
├── views/
│   └── listings/
│       ├── index.ejs      # List all listings
│       ├── form.ejs       # Form to add new listing
│       ├── edit.ejs       # Form to edit existing listing
│       └── show.ejs       # Display individual listing details
├── init/
│   ├── index.js           # Database initialization script
│   └── data.js            # Sample data for listings
├── public/                # Static files (CSS, images, etc.) - not implemented yet
└── .env                   # Environment variables (MongoDB URL)
```

## Setup Instructions
1. **Clone the repository** (if applicable) or ensure you're in the project directory.

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection URL:
     ```
     MONGO_URL=mongodb://localhost:27017/your-database-name
     ```

4. **Initialize the database** (optional, for sample data):
   ```
   node init/index.js
   ```

5. **Start the server**:
   ```
   node app.js
   ```

6. **Access the application**:
   - Open your browser and go to `http://localhost:8080/listings`

## Usage
- **Home/Index**: Visit `/listings` to see all listings.
- **Add New**: Click "add new list" on the index page to create a new listing.
- **View Details**: Click on any listing title to view its details.
- **Edit**: From the listing details page, access the edit functionality.
- **Delete**: Remove listings as needed.

## Routes
- `GET /listings` - Index of all listings
- `GET /listings/new` - Form for new listing
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing
- `GET /listings/:id/edit` - Edit form for listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

## Current Status
- Basic CRUD operations are fully implemented and functional.
- Database connection and schema are set up.
- Sample data initialization script is available.
- EJS templates provide basic UI for all operations.
- No authentication or advanced features implemented yet.
- Styling is minimal; focused on functionality over design.

## Future Enhancements
- Add user authentication and authorization
- Implement image upload functionality
- Add search and filtering capabilities
- Improve UI/UX with CSS frameworks
- Add validation and error handling
- Implement pagination for large datasets
- Add reviews/ratings system

## Dependencies
- express: ^5.2.1
- mongoose: ^9.0.2
- ejs: ^3.1.10
- ejs-mate: ^4.0.0
- method-override: ^3.0.0
- dotenv: ^17.2.3

## Notes
- The application runs on port 8080 by default.
- MongoDB connection is required for full functionality.
- Static files (CSS, JS) can be added to a `public` directory and served via Express static middleware.
