# About Frontend Applifting blog exercise

Simple blog application with basic authentication and basic CRUD operations with articles.
<br />

**And because this is blogging app, I will write there some article about this project and me too.**
<br />

## 🧑 About me

I am a **frontend developer** with quite a lot of experience with building **responsive** 📱-💻 and beautiful **user interfaces**.
Currently the most experience i have is with **TypeScript & React** ⚛️, but i worked with other technologies too.
I usually don't speak very much about myself, so this is probably the end of my long essay. 🤷‍♂️

<br />

## ⚛️ About project

Author: me (Aleš Válek)
Worked time: ~3-4 days
This project is built with a few more libraries than React, that are written down below.
But what I would like to point out is that this application also uses **React Suspense** for loading big external libraries like Markdown editor for faster loading and there is also handling for **loading** and **error** states.
All reusable components can be seen in **Storybook**.

---

💡 _Fun fact: This is my first time actually writing tests_. ✅
<br />

## 📘 Libraries / technologies used

### API

- [Axios](https://github.com/axios/axios)

### State management

- [React Query](https://github.com/TanStack/query)
- React Contexts

### Styling

- SCSS & SCSS Modules

### Routing

- [React Router DOM](https://github.com/remix-run/react-router)

### Tests

- Unit / integration testing

  - [Jest](https://github.com/facebook/jest)

- E2E testing

  - [Cypress](https://github.com/cypress-io/cypress)

### Markdown

- Editor
  - [React Md Editor](https://github.com/uiwjs/react-md-editor)
- Render
  - [Markdown to JSX](https://github.com/probablyup/markdown-to-jsx)

### Hooks

- [useLocalStorage](https://github.com/nas5w/use-local-storage)
- [useOnClickOutside](https://github.com/Andarist/use-onclickoutside)

### Components

- [React Responsive Pagination](https://github.com/jonelantha/react-responsive-pagination)

<br />

## ❔ Why those articles are not sorted by publication time?

I also wanted to use pagination functionality with provided API and sorting is present at admin / my articles page.

<br />

## ❔ Why there is no option to write comments to articles?

There were attempts to make it work with provided API, but all `/comments` endpoints are returning error status 500.
