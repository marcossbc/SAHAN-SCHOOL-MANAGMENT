# SAHAN School Management System

This project is a comprehensive School Management System built to digitally manage school operations. It allows administrators and teachers to easily track student data, record attendance, and generate ID cards and academic reports. This system operates entirely on the client-side, using `localStorage` for data storage, which makes it easy to set up and use without the need for a dedicated server or database.

<p align="center">
  <img src="Screenshot 2025-09-06 084436" alt="SAHAN School Management System Preview" width="600">
</p>

## Core Features

The system consists of the following key modules:

### 1. **Dashboard**
The main dashboard (`index.html`) displays a summary of essential school information:
* Total number of registered students.
* Financial data, including total fees, amount paid, and outstanding balance.
* Charts illustrating the financial status and gender distribution of students (boys and girls).

### 2. **Student Management**
The Student section (`students.html`) provides full capabilities for managing student information:
* **Add New Student:** You can add a new student by entering their name, father's name, phone number, class, and a photo.
* **View Students:** A complete list of all students is displayed in a table format.
* **Edit and Delete:** You can easily edit student information or delete a student's record.
* **Search:** Quickly search for a specific student.

### 3. **Attendance Tracking**
The Attendance section (`Student Attendance.html`) enables teachers to record daily student attendance:
* **Enter Daily Attendance:** The teacher can select a date and class, then mark each student as **Present**, **Absent**, or **Late**.
* **Save Attendance:** Once completed, the attendance record can be saved for future reference.

### 4. **Student ID Card Generation**
The Student Card section (`student-card.html`) automatically generates ID cards for all students:
* Each card includes the student's photo, ID, name, father's name, class, and expiration date.
* The cards are ready for printing.

### 5. **Report Card Generation**
The Report section (`report.html`) generates a detailed academic Report Card:
* Displays the student's information.
* Shows overall exam results, percentage, grade, and class rank.
* Includes scores for subjects like Science, Math, English, and Arabic.
* Provides teacher's comments on the student's attendance, behavior, and participation.
* Includes a button to print the report.

### 6. **User Authentication**
The system includes a login (`login.html`) and registration page:
* New users can register for an account.
* Registered users can log in to the system.
* User data (username and password) is stored in `localStorage`.
* A "Logout" button is available to exit the system.

### 7. **Theme Customization**
Each page features a button that allows the user to switch between **light mode** and **dark mode** for better usability and viewing comfort.

## Technologies Used

* **HTML:** For the structure of the web pages.
* **CSS:** For styling and visual layout.
* **JavaScript:** For the logic and interactivity of the system.
* **localStorage:** For storing all student, attendance, and user data on the client-side (in the browser).
* **Chart.js:** A JavaScript library used to create the charts on the Dashboard.

## How to Use

1.  **Login or Register:** Open the `login.html` file. If you are a new user, create a new account. Otherwise, enter your username and password.
2.  **Dashboard:** After logging in, you will be directed to the main dashboard (`index.html`), where you can view the general overview.
3.  **Manage Students:** Navigate to the "STUDENT" section to add, edit, or delete students.
4.  **Take Attendance:** Go to the "ATTENDANCE" section, select a date and class, and then mark the students' attendance.
5.  **Generate Cards and Reports:** Visit the "CARD STUDENT" or "REPORT" sections to view or print the documents.
6.  **Logout:** Click the "Logout" button to exit the system.
