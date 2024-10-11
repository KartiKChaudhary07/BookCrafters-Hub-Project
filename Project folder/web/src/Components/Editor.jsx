import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';

const Editor = () => {
  const editor = useRef(null);
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: 'Techhnology'
  });

  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  const createNewPost = async (data) => {
    const res = await fetch('http://localhost:5000/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data}`
      },
      body: JSON.stringify(post)
    })

    return res;
  }

  const updatePost = async (token) => {
    const res = await fetch(`http://localhost:5000/api/posts/${location.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });

    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('lt');
    if(location.state) {
      const res = await updatePost(token);
      if (res.ok) {
        alert('Post updated successfully');
      }
      return
    }
    const res = await createNewPost(token);

    if (res.ok) {
      setPost({
        title: '',
        content: '',
        categoryId: ''
      });
      editor.current.value = '';
      alert('Post created successfully');
    }
  };

  useEffect(() => {
    if (location.state) {
      const { content, title, categoryId } = location.state;

      setPost({
        title,
        content,
        categoryId
      });
    }

  }, [location]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={post.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="categoryId">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={post.categoryId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option disabled>
              Select category
            </option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={post.content}
            tabIndex={1}
            onChange={(newContent) => contentFieldChanged(newContent)}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
