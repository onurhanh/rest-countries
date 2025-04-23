# 🌍 Rest Countries Application

> A modern and responsive React application where you can search, filter, and view detailed information about countries around the world.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)

## 🔍 Project Overview

**Rest Countries App** is a React application that dynamically displays country data using the **[Rest Countries API](https://restcountries.com/)**.  
Users can search for countries by name, filter them by region, and view detailed information about each selected country.

![image](https://github.com/user-attachments/assets/d797e4f5-f10a-4b38-94fd-06dd40b5c515)

## 🚀 Features

### 🔎 Country Search and Filtering
- Search for countries in real-time by name.
- Filter countries by continent or region using a dropdown menu.

![image](https://github.com/user-attachments/assets/3110be63-531a-4f78-9540-33aa87441f21)

### 📄 Country Detail Page
- Displays country information such as name, population, region, capital, languages, currency, top-level domain, and bordering countries.
- The country name appears with an **entry animation** on the detail page.

![image](https://github.com/user-attachments/assets/8459b856-779a-4f56-9e5a-a7cdfd90d2ce)

### 🌙 Dark Mode Support
- Users can toggle between light and dark themes.
- The selected theme is stored in `localStorage` for persistence across sessions.

![image](https://github.com/user-attachments/assets/70988e86-ec44-4222-8177-d1f41333940f)

### 📱 Responsive Design
- Mobile-first layout that adapts smoothly to all screen sizes.

### 🔗 Navigation with HashRouter
- Page transitions are handled using hash-based URL routing (`#`),  
  allowing deep linking and bookmarking support.

### 🧠 Global Theme Management (with Context API)
- Theme control and component state sharing are managed using `useContext`.
- Eliminates the need for prop drilling between components.

## 🌐 Live Demo

🔗 https://rest-countries-lilac-ten.vercel.app/
## 📂 Project Structure

```bash
📦 public
 ┗ 📂 img

📦 src
 ┣ 📂 assets
 ┃ ┗ 📂 css
 ┃   ┣ 📄 darkMode.css           # Dark mode styles
 ┃   ┣ 📄 main.css               # Main stylesheet
 ┃   ┗ 📄 reset.css              # CSS reset to normalize browser styles
 ┣ 📂 components
 ┃ ┣ 📄 CountryContent.jsx      # Main component displaying country cards
 ┃ ┣ 📄 CountryDetails.jsx      # Component for country detail page
 ┃ ┗ 📄 Header.jsx              # App header and filtering section
 ┣ 📄 App.jsx                   # Root component of the app
 ┣ 📄 main.jsx                  # React DOM entry point
┗ 📄 index.html                 # HTML template
