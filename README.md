📌 Blog Application Overview
This is a MERN Stack Blog Application where users can register, log in, create, edit, delete, like, search, and comment on blogs. The app includes pagination for efficient blog loading and allows users to view and add comments on individual blogs.

🚀 Features & Functionality
🔐 Authentication (Register & Login)
Secure JWT-based authentication.
On successful login, users are redirected to the Home Page.
🏠 Home Page (With Pagination)
Displays all public blogs with pagination for better performance.
Users can like blogs.
Each blog has a "View More" button, which navigates to the Blog Details Page.
Pagination allows users to navigate through pages efficiently.
🔎 Search Functionality
A search bar in the Navbar allows users to search for blogs by title or keywords.
Results update dynamically based on search queries.
📄 Blog Details Page (View Full Blog & Comments Section)
Displays the full details of a blog, including title, content, author, likes, and comments.
Users can add new comments.
All existing comments are displayed with the user's name and profile picture.
Comments update in real-time.
📊 Dashboard (Blog Management)
Users can manage their blogs.
Options include editing and deleting their blogs.
👤 User Profile (In Progress)
Users can edit their profile (update name, profile picture, etc.).
Users can view their own published blogs.
📝 Post Page (Create a Blog)
Users can create and upload blogs.
Blogs contain title, description (min 50 words), image, and tags.
📑 Blog Page (User's Blogs)
Displays all blogs posted by the logged-in user.
Clicking on a blog card opens a modal where the user can edit the blog.
📌 Tech Stack Used
Frontend (React + Redux)
React.js for UI components.
Redux Toolkit for state management.
React Router for navigation.
Material-UI (MUI) for styling.
Axios for API requests.
Backend (Node.js + Express.js)
Express.js for handling API routes.
JWT for authentication.
Mongoose for database interactions.
Database (MongoDB)
MongoDB stores users, blogs, likes, and comments.
