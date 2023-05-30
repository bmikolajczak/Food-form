import reactLogo from "./assets/react.svg";
import "./App.css";

import { DishesForm } from "./features/form";

function App() {
  return (
    <article>
      <header>
        <nav>
          <ul>
            <li>
              <h1 className="page-title">Food Form</h1>
            </li>
          </ul>
          <ul>
            {/* <li>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
            </li> */}
            <li>
              <img src={reactLogo} className="logo react" alt="React logo" />
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <DishesForm />
      </div>
    </article>
  );
}

export default App;
