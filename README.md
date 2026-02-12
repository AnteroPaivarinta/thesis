# Officials Management App

A fullstack application for managing sports event officials. This system allows users to register as officials for events, and provides administrative tools for managing those registrations.

## Purpose

The goal of this project is to streamline the process of recruiting and managing officials (e.g. referees, volunteers, support staff) for sports events. The application enables user self-registration, stores data securely in a database, and supports administrative oversight with data export functionality.

## Features

### User Functionality
- Fill out a registration form to apply as an official
- Form data is saved to a backend database
- Receive a confirmation email after submitting the form

### Admin Functionality
- Log in using email and password
- Receive a verification code via email for login
- View a list of all registered users
- Edit and delete user entries
- Download registration data as an Excel (.xlsx) file
   ![Logo](registration_DIAGRAM.png)
## Technologies Used

- **Frontend:** React / Next.js / TypeScript
- **Backend:** Node.js / Express / REST API
- **Database:** PostgreSQL / MongoDB (based on your tech choice)
- **Email service:** (e.g. Nodemailer, SendGrid, etc.)
- **Authentication:** Email + Password + Email-based verification code

## Use Cases

1. **User Registration**
   - A person interested in becoming an official visits the app
   - Fills out the registration form and submits it
   - Receives a confirmation email

2. **Admin Login**
   - Admin enters email and password
   - Receives a verification code via email
   - Enters the code to access the admin dashboard

3. **Admin Dashboard**
   - View all registered users
   - Update or delete user records
   - Export all user data to Excel for reporting

## Future Improvements

- Multilingual support
- Role-based access control
- Event-specific registration

---

> This application helps simplify the logistics of sports event organization by making it easy to recruit and manage officials.
