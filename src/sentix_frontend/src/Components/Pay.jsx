import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent"; // Actor to call canister functions
import { sentix_backend } from "declarations/sentix_backend"; // Auto-generated canister interface

const Pay = ({ onSuccess }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principalId, setPrincipalId] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        setPrincipalId(identity.getPrincipal().toText());
        setIsAuthenticated(true);
        Actor.agentOf(sentix_backend).replaceIdentity(identity);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://nfid.one/authenticate",
      onSuccess: () => {
        const identity = authClient.getIdentity();
        setPrincipalId(identity.getPrincipal().toText());
        setIsAuthenticated(true);
        Actor.agentOf(sentix_backend).replaceIdentity(identity);
      },
    });
  };

  const handleGreet = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status messages
    const name = e.target["name"].value;

    try {
      const response = await sentix_backend.get_principal(name);
      setGreeting(response);
      setStatus("Greeting retrieved successfully!");
      if (onSuccess) onSuccess(principalId); // Pass principalId to the parent if needed
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <h2>Login Required</h2>
        <button onClick={handleLogin}>Login with NFID</button>
      </div>
    );
  }

  return (
    <div className="pay-container">
      <h2>Welcome</h2>
      <p>Your Principal ID: {principalId}</p>
      <form onSubmit={handleGreet}>
        <div className="input-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit">Get Greeting</button>
      </form>
      {greeting && <p className="greeting-message">{greeting}</p>}
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Pay;
