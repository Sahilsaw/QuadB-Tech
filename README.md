# QuadB Tech

An advanced, responsive To-Do application built with React, Redux, and API integration. The app includes authentication, task prioritization, persistent storage, and a weather API for task-related insights.

## Features

- **Task Management**: Add, view, and delete tasks.
- **Task Prioritization**: Set task priority (High, Medium, Low).
- **Persistent Storage**: Uses local storage to save tasks.
- **User Authentication**: Simulated login/logout with Redux.
- **API Integration**: Fetch weather data for tasks.
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox.
- **State Management**: Uses Redux Thunk for handling async actions.

## Technologies Used

- React.js (Functional Components, Hooks)
- Redux (with Redux Thunk for async state management)
- HTML, CSS (Bootstrap/Material-UI for styling)
- TypeScript (ES6+)
- Local Storage for data persistence

## Installation & Setup

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js) or yarn

### Clone the Repository
```sh
git clone https://github.com/Sahilsaw/advanced-todo-app.git
cd advanced-todo-app
```

### Install Dependencies
```sh
npm install --force
```

### Run the Application
```sh
npm run dev
```
The app will be available at `http://localhost:3000/`.

## Usage

1. **Login**: Simulated authentication (mock login/logout).
2. **Add Tasks**: Enter a task and set its priority.
3. **View Tasks**: See tasks in a prioritized list.
4. **Delete Tasks**: Remove tasks with a single click.
5. **Weather Integration**: If a task involves outdoor activity, the app fetches weather data.


## Contributing
Feel free to fork the repo, make improvements, and submit a pull request!


