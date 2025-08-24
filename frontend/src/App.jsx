import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const[url, setUrl ] = useState()



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return setMessage('Please select a file to upload');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST', 
        body: formData,
      });

      const data = await res.json();
      setUrl(data.url)
      setMessage(`✅ Upload successful`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload error occurred');
    }
  };
   
  // console.log(file);
  return (
    <div className='bg-black text-center text-white min-h-screen p-10'>
      <h1 className='text-2xl mb-4'>File Upload (Multer & Cloudinary)</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} className="mb-4" />
        <br />
        <input type="submit" value="Upload" className="bg-white text-black px-4 py-2 cursor-pointer" />
      </form>

      {message && <p className="mt-4">{message}</p>}


      {url && file && (
        file.type.startsWith('image/') ? (
          <img src={url} alt="uploaded image" className="mt-4 mx-auto max-w-md" />
        ) : file.type.startsWith('video/') ? (
          <video controls className="mt-4 mx-auto max-w-md">
            <source src={url} type={file.type} />
          </video>
        ) : (
          <p className="mt-4 text-red-400">Unsupported file type</p>
        )
      )}

    </div>
  );
}

export default App;
