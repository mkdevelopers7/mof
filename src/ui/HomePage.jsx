import Navigation from "./Navigation";
import Main from "./Main";
import { UserProvider } from "../features/users/userContext";

function HomePage() {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

export default HomePage;
