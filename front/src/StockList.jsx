import React, { useState, useEffect } from 'react';


const StockList = ({ onUpdateClick }) => {
    const [file, setFile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        title: '',
        description: '',
        prix: '',
        stock: ''
    });

  
    useEffect(() => {
      fetchUsers();
    }, []);

    const [nari, setnari] = useState({})

    const validateForm = () => {
        const newnari = {};
        if (!updateFormData.title.trim()) newnari.title = 'title is required'
        if (updateFormData.prix < 0) newnari.prix = 'prix most be positif'
        if (!updateFormData.description) newnari.description = 'description is required'
        if (updateFormData.stock.match(/^[a-zA-Z]+$/)) newnari.stock = 'stock have to be a number'
        setnari(newnari);
        return Object.keys(newnari).length === 0;
    }
  
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
            await fetch(`http://localhost:5000/stocks/${id}`, { method: 'DELETE' });
            setFile(file.filter(user => user._id !== id));
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

    const handleUpdateClick = (user) => {
        setEditingItem(user._id);
        setUpdateFormData({
            title: user.title,
            description: user.description,
            prix: user.prix,
            stock: user.stock
        });
    };

    const handleUpdateChange = (e) => {
        setUpdateFormData({
            ...updateFormData,
            [e.target.name]: e.target.value
        });
    };

    const updateMessage = async (id) => {
        if(validateForm()){
            try {
                    const response = await fetch(`http://localhost:5000/stocks/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateFormData)
                    });

                if (!response.ok) {
                    throw new Error('Failed to update');
                }
                // Refresh the data
                fetchUsers();
                setEditingItem(null);
            } catch (error) {
                console.error("Error updating message:", error);
            }
        }
        
    };


    return (
    
    <div className="bg-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
                        Products Submissions
                    </h2> 
                </div>
                <div className="mt-10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">image</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">title</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">prix</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">stock</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">description</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">delete</th>
                                    <th className="px-1 py-3 text-left text-sm font-semibold text-gray-300">update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {file.filter(user =>
                                    user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.prix.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.description.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((user) => (
                                    <tr key={user._id}>
                                        <td className="whitespace-nowrap px-1 py-4 " id='prod-img'>
                                            <img src={`http://localhost:5000/Images/${user.image}`} alt="Product" className="mt-4 w-10 h-full" />
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-300">
                                            {editingItem === user._id ? (
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={updateFormData.title}
                                                    onChange={handleUpdateChange}
                                                    className="flex items-center bg-black text-white border-b border-teal-500 px-2 py-1 rounded"
                                                />
                                            ) : user.title}
                                            {nari.title && <p className="text-red-500 text-sm mt-1">{nari.title}</p>}
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-300">
                                            {editingItem === user._id ? (
                                                <input
                                                    type="text"
                                                    name="prix"
                                                    value={updateFormData.prix}
                                                    onChange={handleUpdateChange}
                                                    className="flex items-center bg-black text-white border-b border-teal-500 px-2 py-1 rounded"
                                                />
                                            ) : user.prix}
                                            {nari.prix && <p className="text-red-500 text-sm mt-1">{nari.prix}</p>}
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-300">
                                            {editingItem === user._id ? (
                                                <input
                                                    type="text"
                                                    name="stock"
                                                    value={updateFormData.stock}
                                                    onChange={handleUpdateChange}
                                                    className="flex items-center bg-black text-white border-b border-teal-500 px-2 py-1 rounded"
                                                />
                                            ) : user.stock}
                                            {nari.stock && <p className="text-red-500 text-sm mt-1">{nari.stock}</p>}
                                        </td>
                                        <td className="px-1 py-4 text-sm text-gray-300">
                                            {editingItem === user._id ? (
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={updateFormData.description}
                                                    onChange={handleUpdateChange}
                                                    className="flex items-center bg-black text-white border-b border-teal-500 px-2 py-1 rounded"
                                                />
                                            ) : user.description}
                                            {nari.description && <p className="text-red-500 text-sm mt-1">{nari.description}</p>}
                                        </td>
                                        <td className="px-1 py-4 text-sm text-gray-300">
                                            <button 
                                                onClick={() => deleteMessage(user._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded">
                                                Delete
                                            </button>
                                        </td>
                                        <td className="px-2 py-4 text-sm text-gray-300">
                                            {editingItem === user._id ? (
                                                <button
                                                    onClick={() => updateMessage(user._id)}
                                                    className="bg-green-500 text-white px-1 py-1 rounded">
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUpdateClick(user)}
                                                    className="bg-teal-500 text-white px-1 py-1 rounded">
                                                    update
                                                </button>
                                            )}
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