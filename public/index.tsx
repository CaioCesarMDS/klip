import { createRoot } from "react-dom/client";

function App() {
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
