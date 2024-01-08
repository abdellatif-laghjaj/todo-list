# Simple Todo List App Documentation

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [Getting Started](#3-getting-started)
4. [Code Structure](#4-code-structure)
5. [Code Refactoring](#5-code-refactoring)
6. [Deployment](#6-deployment)
7. [Usage](#7-usage)
8. [License](#8-license)

## 1. Introduction

Welcome to the documentation for the Todo List App, a simple and refactored project designed to manage your tasks efficiently. This document provides an overview of the project, its code structure, refactoring details, clean code practices, design patterns, deployment information, and usage instructions.

## 2. Project Overview

The Todo List App is a web-based application developed to help users manage their tasks by providing a user-friendly interface for adding, editing, and deleting tasks. The app also supports task filtering based on status (All, Pending, Completed) and incorporates a theme switcher for a personalized user experience.

## 3. Getting Started

To get started with the Todo List App, follow these steps:

### Prerequisites

Make sure you have the following installed:

- A modern web browser (e.g., Chrome, Firefox, Safari)
- An internet connection (for fetching external dependencies)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/takitajwar17/Simple-Todo-List-Refactored.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Simple-Todo-List-Refactored
   ```

3. **Open `index.html` in a Browser:**

   Open the `index.html` file in your preferred web browser.


## 4. Code Structure

The project follows a modular and organized structure to enhance readability, maintainability, and scalability. Key components include:

- **HTML (`index.html`):** The main structure of the web page.
- **CSS (`style.css`):** Styles to define the appearance of the web page.
- **JavaScript (`main.js`):** Logic for handling user interactions, managing tasks, and implementing theme switching.
- **Fonts (`Poppins`):** Imported from Google Fonts for consistent typography.

## 5. Code Refactoring

### Code Smells Addressed:

1. **Inline Styles in HTML:** Moved styles from HTML to the `style.css` file.
2. **Hard-Coded Styles in CSS:** Introduced CSS variables for consistent theming.
3. **Large Container Class:** Split styles in the `.container` class for better organization.
4. **Inline JavaScript:** Moved inline JavaScript event handlers to the `main.js` file.
5. **Mixing Presentation and Logic:** Refactored JavaScript for better separation of concerns.

### SOLID Violations Addressed:

1. **Single Responsibility Principle (SRP) Violation:** Separated the responsibilities of creating tasks and modifying the `todos` array.
2. **Open/Closed Principle (OCP) Violation:** Improved extensibility by introducing a TodoItem class.

### Design Smells Addressed:

1. **Global State Usage:** Encapsulated the state within the `TodoManager` class.
2. **Inline Event Handlers:** Centralized event handling in the `TodoListApp` class.
3. **Lack of Validation:** Introduced validation for user inputs.

### Clean Code Practices:

- **Descriptive Naming:** Used descriptive names for variables and functions.
- **Consistent Formatting:** Maintained consistent code formatting.
- **Modularization:** Organized code into modular functions and classes.
- **Comments:** Added comments to explain complex logic or non-trivial code blocks.

### Implemented Design Patterns:

1. **Singleton Pattern:** Applied for the `ThemeSwitcher` class to ensure a single instance for theme switching functionality.

#### Previous UML:

[Insert Previous UML Diagram Here]

#### New UML:

[Insert New UML Diagram Here]

**Comparison:**
- The new UML reflects a better separation of concerns with distinct classes (`TodoManager`, `TodoItem`, `ThemeSwitcher`, `TodoListApp`).
- Improved representation of relationships between classes.
- Introduction of clear extension points for future development.
- Enhanced visualization of application flow.

## 6. Deployment

The Todo List App is deployed and accessible online. You can use the following link to access the application: [Todo List App](https://takitajwar17.github.io/Simple-Todo-List-Refactored/)

## 7. Usage

1. **Adding a Task:**
   - Enter the task in the input field.
   - Optionally, set a due date using the date input.
   - Press Enter or click the "+" button to add the task.

2. **Editing a Task:**
   - Click the "Edit" button on a task.
   - Modify the task details.
   - Click the "Check" button to save changes.

3. **Completing a Task:**
   - Click the "Check" button on a task to toggle its completion status.

4. **Deleting a Task:**
   - Click the "Trash" button on a task to delete it.

5. **Filtering Tasks:**
   - Use the "Filter" dropdown to filter tasks by status (All, Pending, Completed).

6. **Clearing All Tasks:**
   - Click the "Delete All" button to clear all tasks.

7. **Theme Switching:**
   - Use the palette icon in the top-right corner to open the theme switcher.
   - Select a theme from the available options.


## 8. License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) and was originally developed by [@abdellatif-laghjaj](https://github.com/abdellatif-laghjaj) and refactored by [@takitajwar17](https://github.com/takitajwar17). 
