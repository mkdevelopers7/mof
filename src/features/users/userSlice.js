import { useEffect } from "react";

const SUPABASE_URL =
  "https://ogpmkkjrcwllaxsepxvr.supabase.co/rest/v1/user_balance";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncG1ra2pyY3dsbGF4c2VweHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDc2NTcsImV4cCI6MjA1NTgyMzY1N30.UVmYhasu8RnYUO9jLxI5uAuLmk2qaIFW03ubMMMmbF0";

export async function fetchUsers() {
  const res = await fetch(SUPABASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
  });
  const data = await res.json();
  return data;
}

export async function addUserAPI(newUser) {
  const { name, initialBalance } = newUser;
  const finalData = { name, entries: [{ amount: Number(initialBalance) }] };
  // console.log(name, initialBalance);
  console.log(finalData);
  const res = await fetch(`${SUPABASE_URL}`, {
    method: "POST",
    body: JSON.stringify(finalData),
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
  });
}
