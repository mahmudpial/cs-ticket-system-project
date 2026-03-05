# React Core Concepts

---

## 1. What is JSX, and Why is it Used?

JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JavaScript code.

```jsx
const element = <h1>Hello, {name}!</h1>;
```

Under the hood, JSX is transpiled by Babel into regular `React.createElement()` calls:

```js
const element = React.createElement("h1", null, `Hello, ${name}!`);
```

Why use JSX?

- **Readability** — UI structure looks like HTML, making it intuitive to read and write.
- **Colocation** — Keeps markup and logic together in one place (the component).
- **Power of JS** — You can embed any JavaScript expression inside `{}` curly braces.
- **Compile-time errors** — Mistakes in markup are caught early during transpilation.

JSX is optional in React, but it is the universally adopted convention because it dramatically improves the developer experience.

---

## 2. What is the Difference Between State and Props?

| **Definition** | Data passed into a component from its parent | Data managed inside the component itself |
| **Mutability** | Immutable — a component cannot change its own props | Mutable — updated via `setState` or `useState` |
| **Ownership** | Owned by the parent component | Owned by the component itself|
| **Purpose** | Configure or customize a component | Track dynamic, changing data |
| **Triggers re-render?** | Yes, when parent re-renders with new props | Yes, when state is updated |

```jsx
// Props example — parent passes data down
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// State example — component manages its own data
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
```

**Simple rule:** If data comes from outside → it's a **prop**. If data lives and changes inside → it's **state**.

---

## 3. What is the `useState` Hook, and How Does it Work?

`useState` is a built-in React Hook that lets functional components hold and update their own state.

```js
const [stateVariable, setterFunction] = useState(initialValue);
```

- **`stateVariable`** — the current state value.
- **`setterFunction`** — a function to update the state and trigger a re-render.
- **`initialValue`** — the value state starts with (only used on the first render).

### Example

```jsx
import { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn((prev) => !prev)}>
      The light is {isOn ? "ON" : "OFF"}
    </button>
  );
}
```

### How it works (step by step)

1. On the **first render**, React initializes the state with `initialValue`.
2. When the setter is called (e.g., `setIsOn(true)`), React **schedules a re-render**.
3. On the **next render**, `useState` returns the new updated value.
4. React **updates the DOM** to reflect the new state.

**Important:**
State updates may be asynchronous and are batched by React for performance. Always use the functional form `setState(prev => ...)` when
the new state depends on the old one.

---

## 4. How Can You Share State Between Components in React?

There are several patterns depending on the scale of sharing needed.

### A. Lifting State Up

Move shared state to the closest common ancestor and pass it down via props.

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Display count={count} />
      <Controls onIncrement={() => setCount((c) => c + 1)} />
    </>
  );
}

function Display({ count }) {
  return <p>Count: {count}</p>;
}

function Controls({ onIncrement }) {
  return <button onClick={onIncrement}>Increment</button>;
}
```

### B. React Context API (for deeply nested components)

Avoids **prop drilling** by broadcasting state to any component in the tree.

```jsx
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <DeepChildComponent />
    </ThemeContext.Provider>
  );
}

function DeepChildComponent() {
  const { theme } = useContext(ThemeContext);
  return <div className={theme}>Hello!</div>;
}
```

### C. External State Management

---

## 5. How is Event Handling Done in React?

React uses synthetic events — a cross-browser wrapper around the browser's native events — with a camelCase naming convention.

### Basic Syntax

```jsx
// HTML (native)
<button onclick="handleClick()">Click me</button>

// React (JSX)
<button onClick={handleClick}>Click me</button>
```

### Defining Event Handlers

```jsx
function Form() {
  function handleClick() {
    alert("Button clicked!");
  }

  function handleChange(event) {
    console.log(event.target.value); // access the input value
  }

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <input onChange={handleChange} />
    </>
  );
}
```

### Passing Arguments to Handlers

Use an arrow function wrapper to pass arguments:

```jsx
function List() {
  function handleDelete(id) {
    console.log(`Deleting item ${id}`);
  }

  return <button onClick={() => handleDelete(42)}>Delete</button>;
}
```

### Preventing Default Behavior

```jsx
function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading
    console.log("Form submitted!");
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### Common React Events

| `onClick` | Mouse click |
| `onChange` | Input value change |
| `onSubmit` | Form submission |
| `onKeyDown` / `onKeyUp` | Keyboard key press |
| `onMouseEnter` / `onMouseLeave` | Mouse hover |
| `onFocus` / `onBlur` | Focus gained / lost |

---

## Summary

| **JSX** | HTML-like syntax in JS for readable, expressive UI code |
| **Props vs State** | Props = external config (immutable); State = internal data (mutable) |
| **useState** | Hook to add reactive, local state to functional components |
| **Sharing State** | Lift up, use Context API, or a global state library |
| **Event Handling** | camelCase events, synthetic event system, `event.preventDefault()` for defaults |
