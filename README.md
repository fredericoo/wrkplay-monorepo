# wrkplay Fullstack App

This repository contains the source code for the wrkplat 2.0 apps.

## Apps

### Backend

Powered by tRPC and Express.js. Authentication, authorisation, database queries and mutations are all handled here.

### App

User-facing app for iOS, Android and Web. Built with React and Capacitor. Uses tRPC client to communicate with the backend in a type-safe way.

## Packages

### UI

Shared UI components for the app and manager. Built with Panda CSS.

## Getting Started

---

### 0. Clone repository

---

### 1. Install NVM (Node Version Manager) and set Node version

This will enable you to set your node version to the one we are using for this project.

- **Mac**: Install NVM from [the official repository](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Windows** Install nvm from [coreybutler](https://github.com/coreybutler/nvm-windows) and restart VSCode.
- Open a terminal window and `cd` into the root of this project.
- Install the project’s node version
  ```bash
  nvm install
  ```
- Set your computer’s node version to the project’s node version
  ```bash
  nvm use
  ```

---

### 2. Install dependencies

- Install dependencies for the project
  ```bash
  pnpm install
  ```

---

### 3. Setup local environment

- Install Docker from [here](https://docs.docker.com/get-docker/).
- Run `setup-local` in the root of the project:
  ```bash
  pnpm setup-local
  ```
  This will create initial `.env` files, spin up a local database in docker and run migrations.

---

### 4. Run the app locally

- Start the app in dev mode
  ```bash
  pnpm dev
  ```
- (Optional) Run the iOS simulator via Capacitor
  > **Warning** This will only work on macOS
  - Open the project in XCode:
    ```bash
    pnpm cap open ios
    ```
  - Select a simulator from the dropdown menu in the top left corner
  - Build and run the app with <kbd>Cmd + R</kbd> or the play button in the top left corner

---

### 5. Contribute

- Open a Pull Request with your changes
- When it gets merged, the app will be automatically deployed to fly.io
