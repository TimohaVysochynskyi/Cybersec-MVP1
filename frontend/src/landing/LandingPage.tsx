import { Link } from "react-router-dom";
import css from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={css.container}>
      <h1>Welcome to Cybersec MVP</h1>
      <p>Your cybersecurity training platform</p>
      <Link to="/simulation">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start Simulation
        </button>
      </Link>
    </div>
  );
}
