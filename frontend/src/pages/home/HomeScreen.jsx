import { useAuthStore } from "../../../store/authUser"
const HomeScreen = () => {

  const {logout} = useAuthStore();
  return (
    <div>
      HomeScreen
      <button className="border border-sky-100 rounded-md bg-green-400" onClick={logout}>Logout</button>
      </div>
    
  )
};
export default HomeScreen;