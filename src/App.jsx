import React, { useState } from 'react';
// import S3FileUpload from 'react-s3';
// import { Buffer } from "buffer";
import storage from './appwrite.config.js';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {  Permission, Role } from "appwrite";
import axios from 'axios'
import Loader from './Loader.jsx';

// window.Buffer = window.Buffer || Buffer;

// const config = {
//   bucketName: 'intra-web-1',
//   region: 'ap-south-1',
//   accessKeyId: '',
//   secretAccessKey: '',
// };

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading,isLoading] = useState(false);

    const handleUpload = async () => {
      if(selectedFile) {
        try {
          // const data = await S3FileUpload.uploadFile(selectedFile, config);
          // console.log(data);
          isLoading(true);
          const fileId=uuidv4();
          await storage.createFile(import.meta.env.VITE_APP_APPWRITE_BUCKET,fileId , selectedFile,[
            Permission.read(Role.any()),  
          ]);
          console.log('File uploaded successfully');
          toast.success("File Uploaded");
          isLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Error in Upload")
        }
      } else {
        console.error("No file selected for upload.");
      }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const downloadZip = async() => {
        try {
          
          const result = await storage.getFileDownload('65e938003d799d68fbec', '65e98acf75f97a8b3529');
          const response = await axios.get(result.href, {
            responseType: 'arraybuffer',
          });
      
          const blob = new Blob([response.data], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download ='intra-web.rar'; 
          a.click();
          window.URL.revokeObjectURL(url); 
        } catch (error) {
          console.error('File download error:', error);
        }
      };
    
    if(loading) {
      return <Loader />
    }
    return (
        <div className='md:px-[5rem] px-[1rem] py-[5rem] border-2 border-black h-screen bg-slate-800 text-white  flex flex-col gap-10'>
            <div className='text-center'>
                <h1 className='text-5xl font-ops'><span className='text-red-700'>Intra</span> WebDev 2024</h1>
            </div>
            <div className=' flex flex-col gap-5 '>
                <p className='text-3xl text-white font-mono'>Rules and File Structure:</p>
                <ul className='text-lg'>
                  <li>1. You have been given a folder ( <button onClick={downloadZip} className='text-red-700'>Download Folder</button>) 
 containing frames<span>(containing the designed image)</span>, assets <span>(the pictures) </span>and config <span>(colors and effects)</span> folder.</li>
                  <li>2. Judging will be done on the basis of completion of each segments like the Navbar, Effects, Use of javascript and responsiveness of the website</li>
                  <li>3. Create a folder (zip file) with your name ( max size 15 mb ) . Add your html,css and js file. </li>
                  <li>4. Rename your folder with your rac id and name as "racId_name"</li>
                  <li>5. Upload the zip file here.</li>
                </ul>
            </div>
            <div className='text-center'>
                <input type='file' onChange={handleFileChange} className='bg-none my-2'/>
                <button onClick={handleUpload} className='px-5 py-2 font-mono text-white rounded-md bg-red-500 my-2'>Upload File</button>
            </div>
        </div>
    );
};

export default App;
