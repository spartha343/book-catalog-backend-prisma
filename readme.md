# Book Catalog Backend

This is the backend for a Book Catalog application built with **Express.js**, **Prisma**, and **PostgreSQL**. The backend provides functionality for creating, updating, deleting, and retrieving users, books, categories, and orders. The application is also capable of handling user authentication, including sign-up and sign-in with JWT-based tokens.

## Technology Stack

- **Node.js** with **TypeScript**
- **Express.js** for building the API
- **Prisma** as the ORM for database interactions
- **PostgreSQL** for the database
- **JWT** for authentication and authorization
- **Bcrypt** for password hashing

## API Endpoints

### Authentication

- **Sign Up (POST https://book-catalog-backend-prisma-nine.vercel.app/api/v1/auth/signup)**

  - Create a new user account.
  - Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "customer", "contactNo": "1234567890", "address": "Dhaka, Bangladesh", "profileImg": "user.jpg" }`
  - Response: Newly created user object.

- **Sign In (POST https://book-catalog-backend-prisma-nine.vercel.app/api/v1/auth/signin)**
  - User login with email and password.
  - Request body: `{ "email": "john@example.com", "password": "password123" }`
  - Response: JWT token.

### Users

- **Get All Users (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/users)**

  - Only accessible by admin.
  - Response: List of all users.

- **Get Single User (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/users/:id)**

  - Only accessible by admin.
  - Response: Single user object.

- **Update User (PATCH https://book-catalog-backend-prisma-nine.vercel.app/api/v1/users/:id)**

  - Only accessible by admin.
  - Request body: `{ "name": "Updated Name", "email": "updated@example.com", "contactNo": "0987654321", "address": "New Address" }`
  - Response: Updated user object.

- **Delete User (DELETE https://book-catalog-backend-prisma-nine.vercel.app/api/v1/users/:id)**
  - Only accessible by admin.
  - Response: Deleted user object.

### Categories

- **Create Category (POST https://book-catalog-backend-prisma-nine.vercel.app/api/v1/categories/create-category)**

  - Only accessible by admin.
  - Request body: `{ "title": "Programming" }`
  - Response: Newly created category object.

- **Get All Categories (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/categories)**

  - Response: List of all categories.

- **Get Single Category (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/categories/:id)**

  - Response: Single category object with associated books.

- **Update Category (PATCH https://book-catalog-backend-prisma-nine.vercel.app/api/v1/categories/:id)**

  - Only accessible by admin.
  - Request body: `{ "title": "Updated Title" }`
  - Response: Updated category object.

- **Delete Category (DELETE https://book-catalog-backend-prisma-nine.vercel.app/api/v1/categories/:id)**
  - Only accessible by admin.
  - Response: Deleted category object.

### Books

- **Create Book (POST https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books/create-book)**

  - Only accessible by admin.
  - Request body: `{ "title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "price": 350.75, "publicationDate": "1951-07-16", "categoryId": "category-id" }`
  - Response: Newly created book object.

- **Get All Books (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books)**

  - Response: List of books with pagination.

- **Get Books by Category (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books/:categoryId/category)**

  - Response: Books in a specific category with pagination.

- **Get Single Book (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books/:id)**

  - Response: Single book object.

- **Update Book (PATCH https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books/:id)**

  - Only accessible by admin.
  - Request body: `{ "title": "Updated Book Title", "author": "Updated Author", "price": 300 }`
  - Response: Updated book object.

- **Delete Book (DELETE https://book-catalog-backend-prisma-nine.vercel.app/api/v1/books/:id)**
  - Only accessible by admin.
  - Response: Deleted book object.

### Orders

- **Create Order (POST https://book-catalog-backend-prisma-nine.vercel.app/api/v1/orders/create-order)**

  - Request body: `{ "userId": "user-id", "orderedBooks": [{"bookId": "book-id", "quantity": 2}], "status": "pending" }`
  - Response: Newly created order object.

- **Get All Orders (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/orders)**

  - Response: List of all orders.

- **Get Order by ID (GET https://book-catalog-backend-prisma-nine.vercel.app/api/v1/orders/:id)**
  - Response: Single order object.

## Database Models

### User

- `id: UUID`
- `name: string`
- `email: string (unique)`
- `password: string`
- `role: string ('admin' or 'customer')`
- `contactNo: string`
- `address: string`
- `profileImg: string`

### Category

- `id: UUID`
- `title: string`

### Book

- `id: UUID`
- `title: string`
- `author: string`
- `price: float`
- `genre: string`
- `publicationDate: string`
- `categoryId: UUID`

### ReviewAndRating

- `id: UUID`
- `review: string`
- `rating: int (1-5)`
- `userId: UUID`
- `bookId: UUID`

### Order

- `id: UUID`
- `userId: UUID`
- `orderedBooks: JSON`
- `status: string ('pending', 'shipped', 'delivered')`
- `createdAt: DateTime`
