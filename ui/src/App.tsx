import { useState } from 'react'
import './App.css'
import ReferralItemComponent from './ReferralItemComponent';

interface ReferralItem {
  id: number;
  text: string;
  completed: boolean;
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
  const [Referrals, setReferrals] = useState<ReferralItem[]>([]);
  const [input, setInput] = useState('');

  const addReferral = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newReferral: ReferralItem = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setReferrals([...Referrals, newReferral]);
    setInput('');
  };

  const toggleReferral = (id: number) => {
    setReferrals(
      Referrals.map((Referral) =>
        Referral.id === id ? { ...Referral, completed: !Referral.completed } : Referral
      )
    );
  };

  const deleteReferral = (id: number) => {
    setReferrals(Referrals.filter((Referral) => Referral.id !== id));
  };

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
        {Referrals.map((Referral) => (
          <ReferralItemComponent
            key={Referral.id}
            Referral={Referral}
            onToggle={toggleReferral}
            onDelete={deleteReferral}
          />
        ))}
      </ul>
    </div>
  );
}

export default App
