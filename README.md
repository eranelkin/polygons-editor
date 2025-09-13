# No Traffic Polygon Editor

This is a full-stack web application that allows users to draw, view, and delete polygons on a map.

## Features

- Draw polygons on a canvas.
- List of all drawn polygons.
- Delete polygons.
- Hover over a polygon in the list to animate it on the canvas.
- Real-time updates between the client and server.

## Project Structure

The project is divided into two main parts:

- `client/`: A React application that provides the user interface.
- `server/`: A Node.js/Express server that handles the backend logic and database operations.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:eranelkin/polygons-editor.git
    cd polygons-editor
    ```

2.  **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install client dependencies:**
    ```bash
    cd ../client
    yarn install
    # or
    npm install --force
    ```

## Running the Application

### Backend (Server)

1.  Navigate to the `server` directory:

    ```bash
    cd server
    ```

2.  Start the server:
    ```bash
    npm start
    ```
    The server will start on the port 4001 (configurable via `.env`).

### Frontend (Client)

1.  Navigate to the `client` directory:

    ```bash
    cd client
    ```

2.  Start the client:
    ```bash
    npm start
    ```
    The client will start on port 4002 and open in your default browser.
