const SUPABASE_URL = "https://ogpmkkjrcwllaxsepxvr.supabase.co/rest/v1";
export const PassKey = "0938";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncG1ra2pyY3dsbGF4c2VweHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDc2NTcsImV4cCI6MjA1NTgyMzY1N30.UVmYhasu8RnYUO9jLxI5uAuLmk2qaIFW03ubMMMmbF0";

export async function fetchUsers() {
  const res = await fetch(`${SUPABASE_URL}/user_balance`, {
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

  const res = await fetch(`${SUPABASE_URL}/user_balance`, {
    method: "POST",
    body: JSON.stringify(finalData),
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
  });
}

export async function makeDepositAPI(data) {
  const { paidBy: depositBy, depositAmount: amount, name, created_at } = data;
  const newEntry = { amount, depositBy, name, created_at };
  const res = await fetch(`${SUPABASE_URL}/user_deposits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
    body: JSON.stringify(newEntry),
  });

  if (!res.ok) throw new Error("Failed to add deposit");

  const latestDepositRes = await fetch(
    `${SUPABASE_URL}/user_deposits?order=id.desc&limit=1`,
    {
      headers: { apikey: SUPABASE_API_KEY },
    }
  );
  const latestDeposit = await latestDepositRes.json();

  //////////////

  // 1️⃣ Fetch current user
  const curUser = depositBy;
  const userResponse = await fetch(
    `${SUPABASE_URL}/user_balance?id=eq.${curUser}`,
    {
      headers: { apikey: SUPABASE_API_KEY },
    }
  );

  if (!userResponse.ok) return console.error(`Failed to fetch user ${curUser}`);

  const CurUserData = await userResponse.json();
  const user = CurUserData[0];

  // 2️⃣ Append new entry to existing array
  const updatedDeposits = [
    ...user.deposits,
    { depositId: latestDeposit[0].id, amount: +amount },
  ];

  // 3️⃣ Update user balance with new array
  const updateResponse = await fetch(
    `${SUPABASE_URL}/user_balance?id=eq.${curUser}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_API_KEY,
      },
      body: JSON.stringify({ deposits: updatedDeposits }),
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Failed to add deposit to user account ${curUser}`);
  }

  ///////////////
}

export async function fetchDepositsAPI() {
  const res = await fetch(`${SUPABASE_URL}/user_deposits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
  });
  const data = await res.json();
  return data;
}
