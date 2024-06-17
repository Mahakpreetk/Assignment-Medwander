# Description
This project showcases a web application developed using the SQL, Express, React, and Node.js stack. The application features dynamic forms, database operations, data synchronization with an Excel sheet, and user-friendly functionalities such as form validation, local data storage, and responsive design.
[Repository Link](https://github.com/Mahakpreetk/Medwander-task/tree/master)

 ## Installation Steps
### 1) Clone the repository to your local machine:
git clone https://github.com/Mahakpreetk/Medwander-task/tree/master

### 2) Navigate to the project directory:
cd medwander

### 3) Install backend dependencies:
cd server
npm install

### 4) Install frontend dependencies:
cd ../client
npm install

## How to Run the Application:

### Start the backend server:
cd ../server
npm run dev

### Start the frontend development server:
cd ../frontend
npm start

Open your browser and navigate to http://localhost:3000 to view the application.

## Functionality Implemented:

1) Two buttons labeled "Form A" and "Form B" leading to respective forms.
2) Responsive design for mobile and desktop views.
3) Forms dynamically display "Form A" or "Form B" heading based on button clicked.
     Form validation:
       Name field is required and must contain only alphabetic characters.
       Country code selection from a predefined list.
       Phone number must be numeric and formatted as per the selected country code.
   
4) Database Operations:
   SQL database used to store form data.
   Each entry captures form type (A or B), name, country code, and phone number.
   
5) Data Synchronisation:
   Implemented functionality to sync data with an online Excel sheet.
    Added a "Refresh" button to update the Excel sheet with new data from the SQL database.
   
6) Local Data Storage:
   Utilized local storage to save user data (name, country code, phone number).
   Data is loaded from local storage to show the listing screen directly instead of the form screen on revisits.


