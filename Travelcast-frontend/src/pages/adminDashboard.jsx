import { useState, useEffect } from "react";
import { getAllUserApi, deleteUserById } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { getUserRole } from "../protected/Auth";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole()

    if(!role) {
      navigate("/login");
      return;
    }
    if(role === "user"){
      navigate("/userdashboard");
      return;
    }
    if(role === "admin"){ 
      navigate("/admindashboard")
    }

    const getAllUser = async () => {
      try {
        const response = await getAllUserApi();
        if (response?.data?.success) {
          setData(response.data.users);
        } else {
          toast.error(response.data.message || "Failed to fetch users");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getAllUser();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await deleteUserById(id);
      if (response?.data?.success) {
        setData((prev) => prev.filter((user) => user.id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#F0F7FF]">
        <p className="text-xl font-semibold text-gray-600">Loading Dashboard...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] font-sans">
      <aside className="w-64 bg-[#CCEEFF] flex flex-col justify-between p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A] mb-10 px-2">Travelcast</h1>
          <nav>
            <button className="flex items-center gap-4 bg-white text-[#1E3A8A] w-full p-3 rounded-xl shadow-sm font-bold transition-all">
              <FaHome className="text-xl" /> Home
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#FF2D55] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h2>
        </header>

        <section className="mb-10">
          <div className="bg-[#00C851] text-white w-72 p-6 rounded-3xl flex justify-between items-center shadow-lg transform hover:scale-105 transition-transform cursor-default">
            <div>
              <h3 className="text-4xl font-bold">{data.length}</h3>
              <p className="text-sm font-medium opacity-90 uppercase tracking-wider">Total Users</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <FaUsers size={40} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-700 mb-8 px-2">Manage Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-widest border-b">
                  <th className="pb-4 px-4 font-semibold">Username</th>
                  <th className="pb-4 px-4 font-semibold">Email</th>
                  <th className="pb-4 px-4 font-semibold text-center">Role</th>
                  <th className="pb-4 px-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-800">{user.username}</td>
                    <td className="py-4 px-4 text-gray-500">{user.email}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-gray-600 font-medium">{user.role || "User"}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-[#FF2D55] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-red-600 shadow-sm transition-all"
                        
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;


