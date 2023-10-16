# React Frontend Development Take Home Assignment

## Objective

Your task is to build small React application that interfaces with a RESTful API designed according to the OpenAPI Specification. This component will manage tables and columns, allowing for the creation, modification, and deletion columns on any given table. The API documentation can be found [here](https://api-test.reliant.ai/docs#/). Feel free to work with this API directly for development and tests.

---

## Core Features

### 1. Table Creation

- Interface with the RESTful API to create a new table.
- The API expects a JSON payload containing the table name and any initial columns.
- Display the newly created table within the UI.

### 2. Column Addition

- Add new columns to an existing table.
- Support adding columns with arbitrary names and data types.
- Reflect these changes in the UI immediately.

### 3. Column Deletion

- Delete an existing column from a table.
- Update the UI state to reflect the deletion.

---

## Bonus Points

### 1. Undo/Redo without Data Loss

- Implement an undo and redo functionality that keeps track of all table and column changes.
- Ensure that undoing and redoing actions do not result in data loss.

### 2. Chat Streams

- Add the capability to create new chat streams.

### 3. Multiple Chat Streams

- Allow users to create multiple chat streams and attach tables to them.

### 4. Tailwind CSS

- Style your components using Tailwind CSS.

---

## Technical Requirements

- **Frontend**: Your solution must be implemented using React.
- **Libraries**: You are free to use any library or third-party component to complete this assignment.

---

## Evaluation Criteria

1. **Code Quality**: Is the code well-organized and easy to read? Does it follow best practices?
2. **Functionality**: Does the application do what was asked?
3. **Attention to Detail**: How well is error handling implemented? Does the UI/UX make sense?

---

## Submission

Please submit your complete codebase along with a README file that explains:

- How to run your project.
- Any decisions you made while building the project that you think should be brought to our attention.
- Any challenges you faced and how you overcame them.

---

## Note

Where a certain technical or usability choice is ambiguous, use your best judgment and frontend developer experience. The task will reflect real-world scenarios, and selections will be made based on the feasibility of the approach taken. We don't expect you to spend an unnesessary large amount of time on this assignment, as the component should be based on technologies and approaches you are already experienced and comfortable with. Strive for a balance between effort and a well-rounded solution. Please submit the assignment at least 4 hours before the review meeting. 
