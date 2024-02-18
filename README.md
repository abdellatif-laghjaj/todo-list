[![Stand With Palestine](https://raw.githubusercontent.com/TheBSD/StandWithPalestine/main/banner-no-action.svg)](https://thebsd.github.io/StandWithPalestine)

#  <img src="https://github.com/takitajwar17/Simple-Todo-List-Refactored/assets/111155827/4b1c2e01-f24b-4f39-899e-c356d468e386" width="300">

## Simple Todo List App Docs

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [Getting Started](#3-getting-started)
4. [Code Structure](#4-code-structure)
5. [Dependencies](#5-dependencies)
6. [Code Refactoring](#6-code-refactoring)
7. [Deployment](#7-deployment)
8. [Usage](#8-usage)
9. [License](#9-license)

## 1. Introduction

Welcome to the documentation for the TO-DOIT App, a simple and refactored project designed to manage your tasks efficiently. This document provides an overview of the project, its code structure, refactoring details, clean code practices, design patterns, deployment information, and usage instructions.

## 2. Project Overview

The TO-DOIT App is a web-based application developed to help users manage their tasks by providing a user-friendly interface for adding, editing, and deleting tasks. The app also supports task filtering based on status (All, Pending, Completed) and incorporates a theme switcher for a personalized user experience.

## 3. Getting Started

To get started with the TO-DOIT App, follow these steps:

### Prerequisites

Make sure you have the following installed:

- A modern web browser (e.g., Chrome, Firefox, Safari)
- An internet connection (for fetching external dependencies)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:abdellatif-laghjaj/todo-list.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd todo-list
   ```

3. **Open `index.html` in a Browser:**

   Open the `index.html` file in your preferred web browser.


## 4. Code Structure

The project follows a modular and organized structure to enhance readability, maintainability, and scalability. Key components include:

- **HTML (`index.html`):** The main structure of the web page.
- **CSS (`style.css`):** Styles to define the appearance of the web page.
- **JavaScript (`main.js`):** Logic for handling user interactions, managing tasks, and implementing theme switching.
- **Fonts (`Poppins`):** Imported from Google Fonts for consistent typography.

## 5. Dependencies

- **Tailwind CSS:** Used for styling the components. It's linked through CDN in the `index.html` file.
- **Daisy UI:** A CSS library for UI components, linked through CDN.
- **Boxicons:** Icons library, linked through CDN.
- **Google Fonts (Poppins):** Font used for the app, linked in the `style.css` file.

## 6. Code Refactoring

### Code Smells Addressed:

1. **Monolithic Structure:**
   - **Code Smell:** Original code had a monolithic structure, making it harder to maintain.
   - **Refactoring:** Introduced modularization through separate classes (`TodoItemFormatter`, `TodoManager`, `UIManager`, and `ThemeSwitcher`), each with a distinct responsibility.

2. **Global Functions:**
   - **Code Smell:** Original code used global functions for event handling, reducing modularity.
   - **Refactoring:** Event handling encapsulated within the `UIManager` class, promoting better organization and separation of concerns.

3. **HTML Manipulation in Multiple Places:**
   - **Code Smell:** Original code directly manipulated HTML in scattered locations.
   - **Refactoring:** Centralized HTML manipulation within the `UIManager` class for consistency.

4. **Lack of Error Handling:**
   - **Code Smell:** Original code lacked proper error handling.
   - **Refactoring:** Introduced error handling in the `UIManager` class for improved user experience and robustness.

### SOLID Violations Addressed:

1. **Single Responsibility Principle (SRP):**
   - **Violation:** Original code violated SRP by combining UI, business logic, and theme handling.
   - **Refactoring:** Responsibilities separated into different classes (`TodoManager`, `UIManager`, `ThemeSwitcher`), adhering to SRP.

2. **Open/Closed Principle (OCP):**
   - **Violation:** Original code was less extensible, requiring modifications for new features.
   - **Refactoring:** Designed for extensibility, allowing addition of new features without modifying existing classes.

3. **Dependency Inversion Principle (DIP):**
   - **Violation:** Original code exhibited high coupling.
   - **Refactoring:** Followed DIP by depending on abstractions, enhancing flexibility and testability.

### Design Pattern Violations Addressed:

1. **Observer Pattern for Event Handling:**
   - **Violation:** Original code used inline event listeners.
   - **Refactoring:** Employed Observer pattern by encapsulating event handling within the `UIManager` class.

2. **Strategy Pattern for Task Formatting:**
   - **Violation:** Original code lacked a clear strategy for formatting tasks.
   - **Refactoring:** Introduced a `TodoItemFormatter` class, applying the Strategy pattern for consistent task formatting.

3. **Singleton Pattern for Theme Handling:**
   - **Violation:** Original code lacked a clear structure for theme handling.
   - **Refactoring:** Introduced a `ThemeSwitcher` class, applying the Singleton pattern for centralized theme management and persistence.

### Class Responsibilities:

1. **TodoItemFormatter:**
   - Responsible for formatting individual task items.
   - Implements the Strategy pattern to ensure consistent and uniform task formatting.

2. **TodoManager:**
   - Manages the overall logic related to todos.
   - Responsible for creating, editing, deleting, and toggling the status of todo items.
   - Encapsulates the todos array, ensuring centralized control over the application's state.

3. **UIManager:**
   - Manages the user interface components and interactions.
   - Handles event listeners for user actions such as adding, editing, and deleting todos.
   - Responsible for displaying todos in the HTML, handling user inputs, and showing alert messages.
   - Ensures separation of concerns between UI-related activities and application logic.

4. **ThemeSwitcher:**
   - Handles theme-related functionalities.
   - Implements the Singleton pattern to ensure a single instance responsible for theme switching.
   - Manages the application's theme by updating the HTML's data-theme attribute.

## 7. Deployment

The TO-DOIT App is deployed and accessible online. You can use the following link to access the application: [TO-DOIT](https://todotify.vercel.app/)

## 8. Usage

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


## 9. License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) and was originally developed by [@abdellatif-laghjaj](https://github.com/abdellatif-laghjaj) with the contribution of [@takitajwar17](https://github.com/takitajwar17). 
