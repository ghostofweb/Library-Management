import { useState } from "react"
import Homepage from "./pages/homepage/homepage"
import { User } from "./models/User";

function App() {
  const [displayLogin,setdisplayLogin] = useState<boolean>(true);
  const [loggedInUser,setLoggedInUser] = useState<User>();
  
  return (
  <div>
    <Homepage / >
  </div>
  )
}

export default App
