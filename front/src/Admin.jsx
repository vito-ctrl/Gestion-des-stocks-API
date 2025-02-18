import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Admin.css'

function Admin() {
    const [file, setFile] = useState();
    const [image, setImage] = useState(null); // Initialize to null for better condition checking
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const upload = (e) => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:5000/upload', formData)
            .then(res => {
                fetchImage();
            })
            .catch(err => console.log(err));
    };
    
    const fetchImage = () => {
        setLoading(true);
        axios.get('http://localhost:5000/getImage')
            .then(res => {
                if (res.data && res.data.length > 0 && res.data[0].image) {
                    setImage(res.data[0].image);
                } else {
                    setError('No image found');
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to load image');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <>
            <div className="addPic">
                
                <button type="button" onClick={upload}>Upload</button>
            </div>


            
<div className="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" onChange={e => setFile(e.target.files[0])}/>
    </label>
</div> 

            
           
<form className="w-full max-w-sm" id="text-hada">
  <div className="flex items-center justify-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Title" aria-label="Full name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>
  
  <div className="flex items-center justify-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Title" aria-label="Full name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>

  <div className="flex items-center justify-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Title" aria-label="Full name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>

  <div className="flex items-center justify-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Title" aria-label="Full name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>
</form>





            {loading && <p>Loading image...</p>}
            {error && <p>{error}</p>}
            {/* {image && <img src={`http://localhost:5000/Images/${image}`} alt="Uploaded content" id="imaage"/>} */}
        </>
    );
}

export default Admin