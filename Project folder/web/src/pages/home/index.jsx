import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  const [works, setWorks] = useState([]);

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

  return (
    <>
      <div className="container mx-auto p-4 mt-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">See All Writing Works</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works && works.map((work) => (
            <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{work.title}</h2>
                <p className="text-gray-600 mb-2">By {work.createdBy?.name}</p>
                <p className="text-sm text-gray-500 mb-2">{new Date(work.createdAt).toDateString()}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 ml-auto">
                    <Link to={`/read/${work.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      View
                    </Link>
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

export default Home;


