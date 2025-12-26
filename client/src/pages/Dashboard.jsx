import { useAuth } from "../context/auth/useAuth";

const Dashboard = () => {
  const {logout} = useAuth();
  return (
    <div>
      Dashboard
      <button onClick={logout} className="cursor-pointer border">Logout</button>
    </div>
  )
}

export default Dashboard;
