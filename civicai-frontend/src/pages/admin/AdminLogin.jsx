import {useState} from 'react';;;
import {useNavigate} from 'react-router-dom';

const AdminLogin = () => {
  const [adminKey,setAdminKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if(!adminKey.trim()){
      setError("Please enter the Admin Key");
      return;
    }
    localStorage.setItem("ADMIN_KEY",adminKey);
    setError("");
    navigate('/admin/dashboard');
  }
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-black text-center">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600 text-center">Enter Admin Key to access dashboard</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Admin Secret Key
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-gray-600 font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
          </form>
          <p className="mt-4 text-xs text-gray-500 text-center">
          This page is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  )
};

export default AdminLogin;