import { useAuth } from "@/utils/authContext";
import { useEffect, useState } from 'react'
import LoginPage from "../login";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    setWorks(works.filter(work => work.id !== id))
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('lt')}`
      }
    });
  }

  const handleEdit = (id) => {
    const { content, title, categoryId } = works.find(work => work.id === id);
    navigate(`/dashboard/editor`, { state: { id,  content, title, categoryId} });
  }

  const getAllPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts/');

    if (res.ok) {
      const data = await res.json();
      setWorks(data.posts);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);


  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <>
      <div className="container mx-auto p-4 mt-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Writing Works Dashboard</h1>
          <button onClick={() => { navigate("/dashboard/editor") }} className="bg-blue-600 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works && works.map((work) => (
            <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{work.title}</h2>
                <p className="text-gray-600 mb-2">By {work.createdBy?.name}</p>
                <p className="text-sm text-gray-500 mb-2">{new Date(work.createdAt).toDateString()}</p>
                <div className="flex justify-between items-center">
                  {/* <span className={`px-2 py-1 text-xs font-semibold rounded-full ${work.status === 'Published' ? 'bg-green-100 text-green-800' :
                      work.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                    {work.status}
                  </span> */}
                  <div className="flex space-x-2 ml-auto">
                    <button
                      onClick={() => handleEdit(work.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;


