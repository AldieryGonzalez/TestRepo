# Old Project example

This is an old project that was built with react and a build tool called Vite. Don't worry too much about the technologies but if you were curious, this uses firebase as a fully featured backend, although it can be very expensive past the free tier.

## Using the App

Verify that the initial app works. Run

```
npm install
npm start
```

and open the URL displayed.

## Where to direct your attention

The `src` folder will hold all of the webapp logic. `src/components` has smaller reusable components, while `src/pages` contains components as well, but meant to work at a full page level. While these are not enforced in this application, Frameworks like NextJs do enforce a folder structure.

1. Start at `src/pages/FoundPage.jsx` as this is the first page you open in the local environment when running `npm start`
2. CTRL-Click around the codebase in your favorite editor, and you should be able to find all implementations in the codebase for non html components.
3. If you are looking at further study here are some cooler components and files
    1. SearchSort (Component) : interacting with inputs directly
    2. Modal (Component): Functionality that will come up a lot
    3. src/utilities/firebase.js: a look into how to interact on the client side with prebuilt APIS and custom hooks

## Folder Structure

```
TESTREPO
├── node_modules // Where packages are held
├── public
│   ├── favicon.svg // Website Logo
│   └── robots.txt // For web Scrapers
└── src
    ├── components
    │   ├── AuthButton.jsx
    │   ├── Modal.jsx
    │   ├── PostCard.jsx
    │   ├── ProfileCard.jsx
    │   └── SearchSort.jsx
    ├── pages
    │   ├── FoundPage.jsx
    │   ├── LostPage.jsx
    │   ├── PostPage.jsx
    │   └── ProfilePage.jsx
    ├── App.css // Global CSS
    ├── App.jsx // Global Component
    ├── index.css // Very Global
    ├── index.jsx // Where react connects to the html
    └── logo.svg
├── .gitignore
├── index.html // The HTML Template
├── package.json // Where packages are maintained
├── README.md
├── vite.config.js
```
