import Navigation from "./Navigation";
import Main from "./Main";
import { UserProvider } from "../features/users/userContext";

function HomePage() {
  return (
    <UserProvider>
      <Navigation />
      <Main />
    </UserProvider>
  );
}

export default HomePage;
