import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import Profile from './components/Profile';

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Login />
      <Logout />
      <Profile />
    </div>
  );
}
