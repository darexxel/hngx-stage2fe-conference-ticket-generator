# Conference Ticket Generator

This project is a conference ticket generator built with React, as part of the HNGx Stage 2 Frontend Task.  It allows users to select a ticket type, enter their details, and generate a conference ticket.

## Features

* **Ticket Selection:** Users can choose from different ticket types (Free, VIP, VVIP) and select the number of tickets.
* **Attendee Details Form:**  A form collects the user's name, email, special requests, and a profile photo URL.
* **Form Validation:**  Ensures all required fields are filled in correctly, including email format validation and basic URL validation.
* **State Persistence:**  Uses `localStorage` to persist form data, so user input is not lost on page refresh.
* **Ticket Generation:**  Dynamically generates a conference ticket displaying the user's information.
* **Responsive Design:**  The application is fully responsive and works well on different screen sizes (mobile, tablet, desktop).
* **Accessibility:**  Built with accessibility in mind, using semantic HTML, `htmlFor`/`id` attributes, and keyboard navigation support.
* **Routing:** react router dom

## Technologies Used

* React
* React Router DOM
* Tailwind CSS
* localStorage (for state persistence)
* Vite (as the build tool)
* Lucide React(icons)

## Project Structure

```text

hngx-stage2fe-conference-ticket-generator/
├── node_modules/
├── public/
├── src/
│   ├── assets/    
│   ├── components/
│   │   ├── Navbar.jsx
│
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AttendeeDetails.jsx
│   │   ├── Events.jsx
│   │   ├── MyTickets.jsx
│   │   ├── TicketConfirmation.jsx
│
│   ├── App.css
│   ├── App.jsx      (Main application component)
│   ├── index.css    (Global styles)
│   └── main.jsx     (Entry point)
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md       (This file)
└── vite.config.js

```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* npm (usually comes with Node.js) or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:darexxel/hngx-stage2fe-conference-ticket-generator.git
    cd hngx-stage2fe-conference-ticket-generator
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

This will start the development server, and you can view the application in your browser (usually at `http://localhost:5173` or similar - the console output will tell you the exact URL).

### Building for Production

```bash
npm run build

```

This will create a `dist` folder with the optimized, production-ready build of your application.  You can deploy this `dist` folder to a hosting service like Netlify, Vercel, or GitHub Pages.

## Deployment

This application can be easily deployed to various static site hosting platforms.  Here are some popular options:

* **Netlify:** Drag and drop the `dist` folder to the Netlify dashboard, or connect your GitHub repository for continuous deployment.
* **Vercel:** Similar to Netlify, you can import your Git repository or upload the `dist` folder.
* **GitHub Pages:**  Configure GitHub Pages in your repository settings to deploy from a branch (e.g., `main` or `gh-pages`) or a folder (e.g., `docs` or `/`).  You'll need to configure Vite to output to the correct folder (see the `vite.config.js` section below).

**Important Note for GitHub Pages:** If you are deploying to GitHub Pages, you might need to adjust the `base` option in your `vite.config.js` file. If your repository is named `hngx-stage2fe-conference-ticket-generator`, and you're deploying to the `main` or `master` branch, you typically *don't* need to set a `base`.  If you're deploying to a `gh-pages` branch, you *usually* don't need to set it. However, if you are deploying to a subdirectory, or if you are using a custom domain *without* a CNAME file, you *will* need to set it.  For example:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hngx-stage2fe-conference-ticket-generator/', 
});

```

**Only add the `base` option if you are sure you need it.**  If you deploy and the assets (CSS, images) are not loading correctly, *then* try adding the `base` option.  Incorrectly setting `base` can break the deployment.  The best practice is to deploy *without* it first, and only add it if you encounter problems.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) -  You can add a LICENSE file to your project root with the MIT license text.
