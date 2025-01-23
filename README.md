# CS50 - Social App

[Video Demo](https://www.youtube.com/watch?v=ZFzE1FHU64E)

## Description
CS50 - Social App is a specialized social application designed exclusively for students enrolled in the CS50 course. The platform serves as an interactive discussion board where students can engage in meaningful conversations about various course-related topics, share insights, ask questions, and collaborate on problem sets or projects. The main goal of this application is to foster a community-driven learning environment, enabling students to connect, support each other, and enhance their understanding of the course material through peer discussions.

## Technological Stack Overview
The development of the CS50 - Social App involves a sophisticated technological stack that ensures both a seamless user experience on the front end and robust, secure functionality on the back end. Below is a detailed breakdown of the technologies used:

### Front-End: React.js
For the front-end development, I utilized React.js, a powerful JavaScript library known for its efficiency in building user interfaces, particularly single-page applications (SPAs). The choice of React.js allows for a dynamic and responsive user experience, which is crucial for a discussion-based platform.

- **React Router v6.4** is used for managing navigation between different components and views. The implementation of action and loader functions enhances routing, enabling efficient handling of asynchronous data fetching, form submissions, and side effects.
- **Styled Components** is employed for styling, providing modular, reusable UI components and improving the design consistency.

### Back-End: Java and Spring Boot
The back-end infrastructure is built using Java with Spring Boot, an excellent choice for developing enterprise-grade applications.

- **Maven** is used for project management and dependency management.
- **Spring Security** ensures secure REST API authentication via JWT (JSON Web Tokens), providing stateless authentication and reducing server-side session management complexity.
- **Bcrypt** is used for securely hashing passwords, protecting against brute-force attacks.
- The back-end also includes comprehensive error handling to provide meaningful feedback and logs for troubleshooting.

### Database: MySQL and Spring Data JPA
The application uses a **MySQL** database, managed with **Spring Data JPA**, which simplifies data access and management.

- **JPA (Java Persistence API)** enables seamless interaction with the database using Java entities, abstracting complex SQL queries and ensuring maintainability.
- The database stores information on users, discussions, and topics, facilitating easy management of relational data.

## Application Features
The CS50 - Social App is designed with a range of features that cater to the needs of its users, providing both functional and aesthetic benefits:

### 1. **Client and Server-Side User Input Validation**
   - Ensures that all user inputs are validated on both client and server sides, preventing invalid or malicious data.

### 2. **Dynamic Search and Sorting**
   - Users can perform dynamic searches within discussion topics.
   - Topics are sorted by update date/time to highlight the most recent discussions.

### 3. **Infinite Scroll and Pagination**
   - Supports infinite scroll for browsing posts seamlessly or traditional pagination for a structured browsing experience.

### 4. **Active Users Tab**
   - Displays a list of currently active users, encouraging real-time interactions.

### 5. **Image Preview and Upload**
   - Users can upload images to their profiles with a preview before submission.

### 6. **User Profile Management**
   - Users can update their profile, change their profile picture, and track their activity (number of posts, topic upda## Installation and Setuptes).

### 7. **Advanced CSS Transitions and Animations**
   - Smooth transitions and animations enhance the user interface, making the application more polished and responsive.

### 8. **Authentication and Security Features**
   - **Email Verification**: Ensures that users verify their email before being able to access full functionality.
   - **JWT Authentication**: For secure user sessions and stateless authentication.
   - **Password Recovery**: Allows users to reset their passwords via a secure token sent to their email.
   - **Account Locking & Banning**: Implements automatic account locking after a certain number of failed login attempts and enables admin to ban users.

