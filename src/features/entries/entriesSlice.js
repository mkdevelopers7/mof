const SUPABASE_URL = "https://ogpmkkjrcwllaxsepxvr.supabase.co/rest/v1";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncG1ra2pyY3dsbGF4c2VweHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDc2NTcsImV4cCI6MjA1NTgyMzY1N30.UVmYhasu8RnYUO9jLxI5uAuLmk2qaIFW03ubMMMmbF0";

export async function getEntriesAPI() {
  const res = await fetch(`${SUPABASE_URL}/entries`, {
    headers: { apikey: SUPABASE_API_KEY },
  });
  if (!res.ok) throw new Error("Failed to fetch Entries Record");
  return res.json();
}

export async function addNewEntryAPI(newEntry) {
  const res = await fetch(`${SUPABASE_URL}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_API_KEY,
    },
    body: JSON.stringify(newEntry),
  });

  if (!res.ok) throw new Error("Failed to add entry");

  const latestEntryRes = await fetch(
    `${SUPABASE_URL}/entries?order=id.desc&limit=1`,
    {
      headers: { apikey: SUPABASE_API_KEY },
    }
  );
  const latestEntry = await latestEntryRes.json();

  const { totalAmount, paidBy, usersCharged } = newEntry;
  const shareAmount = totalAmount / usersCharged.length;
  console.log(25, (totalAmount / usersCharged.length).toFixed(0));

  // const paidByMehran = paidBy === 7;

  await Promise.all(
    usersCharged.map(async (userId) => {
      // if (paidByMehran && userId === 7) return;
      let userShare = shareAmount;
      if (paidBy === userId)
        userShare = -(userShare * (usersCharged.length - 1));
      // 1️⃣ Fetch current user balance
      const userResponse = await fetch(
        `${SUPABASE_URL}/user_balance?id=eq.${userId}`,
        {
          headers: { apikey: SUPABASE_API_KEY },
        }
      );

      if (!userResponse.ok)
        return console.error(`Failed to fetch user ${userId}`);

      const userData = await userResponse.json();
      const user = userData[0];

      // 2️⃣ Append new entry to existing array
      const updatedEntries = [
        ...user.entries,
        { entryId: latestEntry[0].id, amount: userShare },
      ];

      // 3️⃣ Update user balance with new array
      const updateResponse = await fetch(
        `${SUPABASE_URL}/user_balance?id=eq.${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_API_KEY,
          },
          body: JSON.stringify({ entries: updatedEntries }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Failed to update user ${userId}`);
      }
    })
  );

  ///////////////////

  return true;
}

///////////////
// console.log(latestEntry[0].id);

// await Promise.all(
//   usersCharged.map(async (userId) => {
//     const updateResponse = await fetch(
//       `${SUPABASE_URL}/user_balance?id=eq.${userId}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           apikey: SUPABASE_API_KEY,
//         },
//         body: JSON.stringify({
//           entries: {
//             array_append: [
//               "entries",
//               { entryId: latestEntry[0].id, amount: shareAmount },
//             ],
//           },
//         }),
//       }
//     );

//     if (!updateResponse.ok) {
//       console.error(`Failed to update user ${userId}`);
//     }
//     if (updateResponse.ok) {
//       console.log(`Updated user ${userId}`);
//     }
//   })
// );

/////////////////
