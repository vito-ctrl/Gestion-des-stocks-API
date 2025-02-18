import React, { useState, useEffect } from 'react';


const StockList = () => {
    const [file, setFile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setFile(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const deleteMessage = async (id) => {
        try {
            await fetch(`http://localhost:4000/users/${id}`, { method: 'DELETE' });
            setFile(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };
  
    if (loading) {
        return <div className="text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }
  
    {/* {loading && <p>Loading products...</p>}
    {error && <p>{error}</p>} */}
    return (
        <div className="bg-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
                        Contact Submissions
                    </h2> 
                </div>
                <div className="mt-10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">image</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">prix</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">stock</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">description</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {file.filter(user =>
                                    user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.prix.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.description.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((user) => (
                                    <tr key={user._id}>
                                        <td className="whitespace-nowrap px-6 py-4 " id='prod-img'>
                                        <img src={`http://localhost:5000/Images/${user.image}`} alt="Product" className="mt-4 w-10 h-full" />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{user.title}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{user.prix}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{user.stock}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{user.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            <button 
                                                onClick={() => deleteMessage(user._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
  };
  
  export default StockList;