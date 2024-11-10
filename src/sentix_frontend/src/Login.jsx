// src/LoginComponent.jsx

import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

const webapp_id = process.env.VITE_WHOAMI_CANISTER_ID; // Use Vite's env variable syntax

// The interface of the whoami canister
const webapp_idl = ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

const LoginComponent = () => {
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const iiUrl = determineIiUrl();
    document.getElementById("iiUrl").value = iiUrl;
  }, []);

  const determineIiUrl = () => {
    if (import.meta.env.VITE_DFX_NETWORK === "local") {
      return `http://localhost:4943/?canisterId=${import.meta.env.VITE_II_CANISTER_ID}`;
    } else if (import.meta.env.VITE_DFX_NETWORK === "ic") {
      return `https://${import.meta.env.VITE_II_CANISTER_ID}.ic0.app`;
    } else {
      return `https://${import.meta.env.VITE_II_CANISTER_ID}.dfinity.network`;
    }
  };

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    const iiUrl = document.getElementById("iiUrl").value;

    await new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: iiUrl,
        onSuccess: resolve,
        onError: reject,
      });
    });

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const webapp = Actor.createActor(webapp_idl, {
      agent,
      canisterId: webapp_id,
    });

    const principal = await webapp.whoami();
    setPrincipal(principal.toText());
  };

  return (
    <div className="loginComponent">
      <h2>Login with Internet Identity</h2>
      <input id="iiUrl" type="text" readOnly />
      <button onClick={handleLogin}>Login</button>
      {principal && <p>Logged in as: {principal}</p>}
    </div>
  );
};

export default LoginComponent;
