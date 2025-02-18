import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Admin.css'

function Admin() {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prix: '',
        stock: '' 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create form data with both file and text fields
        const submitData = new FormData();
        if (file) {
            submitData.append('file', file);
        }
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('prix', formData.prix);
        submitData.append('stock', formData.stock);
        
        try {
            const result = await axios.post('http://localhost:5000/products', submitData);
            console.log("Success: ", result.data);
            setFormData({
                title: '',
                description: '',
                prix: '',
                stock: ''
            });
            setFile(null);
            fetchProducts(); // Refresh the product list after adding
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const fetchProducts = () => {
        setLoading(true);
        axios.get('http://localhost:5000/stocks')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setImage(res.data[0].image); // Just getting the first image for now
                } else {
                    setError('No products found');
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to load products');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>  
            <h1 id="sit_title">Gestion de stock</h1>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" 
                    placeholder="Title" 
                    aria-label="Title"/>
                </div>
                
                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <input
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" 
                    placeholder="Prix" 
                    aria-label="Prix"/>
                </div>

                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <input 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" 
                    placeholder="Stock" 
                    aria-label="Stock"/>
                </div>

                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    placeholder="Description" 
                    aria-label="Description"/>
                </div>
                
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                        Product Image
                    </label>
                    <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white p-2 focus:outline-none" 
                        id="file_input" 
                        type="file" 
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                
                <button
                    type="submit"
                    className="mt-6 block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Submit Product
                </button>
            </form>
        </>
    );
}

export default Admin