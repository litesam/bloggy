---
title: "Electron with React! Helps you in creating desktop applications quicker"
date: "February, 9 2020"
---

## What is Electron?

Electron is a Framework that lets you to build **Cross platform applications** only with your existing web development knowledge. It is so simple that you can create an desktop application with just a couple of minutes for both **Mac, Linux, Windows**.

## So you heard here!

Now after seeing this, you start to explore about **Electron** on Internet, and you see that it uses **Chromium** as a base for creating Cross platform applications, and you start to think that this is going to be slow, but it is not for more information on the applications that are created by **Electron** visit [Apps in Electronjs site](https://www.electronjs.org/apps).

## Let's jump right into it!

As mentioned in the title we will be using [React](https://www.reactjs.org) the only JavaScript library that is built for anything. So for adding React to the application we will not be going to setup Webpack configuration, For the time being let's use Create-React-App. So open your Terminal or Command Prompt and type: 

```shell
create-react-app electron_todos
cd electron_todos
npm install electron wait-on concurrrently
```

I'm not going to explain about each and every sorcery thing is happening to your Terminal after executing all those 3 commands, except my friend `Hari` no one knows what's with that 3 commands above so as to teach you guys about those 3 commands you can hire me as a mentor for `$30` per month.

Now the Directory structure of your create-react-app will be looking like this:
```
node_modules
public +
    favicon.ico
    index.html
    manifest.json
src +
    App.js
    App.test.js
    ...
.gitignore
package-lock.json
package.json
README.md
yarn.lock
```

Create a New file on `public` directory called as `electron.js`, so the directory structure for this would be looking like `public/electron.js` and this program here:

```javascript
const electron = require('electron'); // JavaScript CommonJS imports
const { app, BrowserWindow } = electron;  // Objects destructuring from electron

let mainWindow; //  Variable that'll be holding our Window object

//  This below code will be watching for listeners on "ready" state
//  To which you'll be passing an Callback, which will be executed on "read"
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true } // Helps us in accessing Node APIs in our Client side
  });
  mainWindow.loadURL('https://localhost:3000'); // Because CRA defaults to port 3000
});
```

For seeing your window on the screen you have to do some small changes on `package.json` for running the whole configurations, add this script to your `scripts` in package.json:

```json
"scripts": {
  "electron-start": "concurrently \"npm run start\" \"wait-on http://localhost:3000 && electron .\""
}
```

Now you'll be seeing this:

![Voila](https://i.imgur.com/Cf8WjDL.png "Voila")

If you made it through here, you are fantastic but I said that we'll be creating a simple Todo application so let's do that, open your `src/App.js` and start writing this:

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [todos, addTodos] = useState([]);
  const [todo, setTodo] = useState('');

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodos([...todos, todo]);
    setTodo('');
  }

  return (
    <div>
      <ul>
        {!todos.length ? null : todos.map((todo) => <li>{todo}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          onChange={handleChange}
          value={todo}
        />
        <button type="button">Add Todo</button>
      </form>
    </div>
  );
}
```

That is your simple **Electron** application with React. Some might argue that Electron is slow, but you can totally jam your Electron configuration to squeeze extreme performance with less jankiness that Electron will give, but that is a post for next time.