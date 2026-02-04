import { useEffect, useState } from "react";
import "./App.css";
import ReferralLinkListItemComponent from "./components/referral-link/ReferralItemComponent";
import type ReferralLink from "./components/referral-link/ReferralLink";

interface ErrorMessage {
  code: number;
  message: string;
}

/**
 * Огляд від ШІ
 *
 * Building a To-Do list with React and Vite involves using modern web development
 * practices like component-based architecture and state management,
 * leveraging Vite for a fast developer experience.
 *
 * Here is a high-level guide to building a basic React Referral list using Vite,
 * functional components, and hooks (useState
 */
function App() {
  const [referrals, setReferrals] = useState<ReferralLink[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const addReferral = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newReferral: ReferralLink = {
      id: Date.now(),
      title: input,
      description: "aeou",
      referralUrl: "eou",
    };

    setIsLoading(true);

    const postData = async () => {
      return await fetch("http://localhost:8000/referral-link", {
        method: "POST", // Specify the method
        headers: {
          "Content-Type": "application/json", // Declare the content type
        },
        body: JSON.stringify(newReferral), // Convert the data to a JSON string
      })
        .then((response) => {
          // Check if the request was successful (HTTP status 200-299)
          if (!response.ok) {
            throw new Error(
              "Network response was not ok: " + response.statusText,
            );
          }
          return response.json(); // Parse the JSON response body
        })
        .then((data) => {
          console.log("Success:", data); // Handle the successful response data
          setReferrals([...referrals, newReferral]);
        })
        .catch((error) => {
          console.error("Error:", error); // Handle errors (network issues or HTTP errors)
        })
        .finally(() => setIsLoading(false));
    };

    postData();

    setInput("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/referral-link/list?page=1",
        ); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        setReferrals(res.items);
        setError(null);
      } catch (err) {
        setError(err as ErrorMessage);
        setReferrals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteReferral = (id: number) => {
    setReferrals(referrals.filter((Referral) => Referral.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>Simple Item List</h1>
      <form onSubmit={addReferral}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {referrals.map((Referral) => (
          <ReferralLinkListItemComponent
            key={Referral.id}
            Referral={Referral}
            onDelete={deleteReferral}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
