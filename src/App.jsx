import React, { useState } from 'react';
// import S3FileUpload from 'react-s3';
// import { Buffer } from "buffer";
import storage from './appwrite.config.js';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
// window.Buffer = window.Buffer || Buffer;

// const config = {
//   bucketName: 'intra-web-1',
//   region: 'ap-south-1',
//   accessKeyId: '',
//   secretAccessKey: '',
// };

const intra_zip = 'IntraWebDesign.rar';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async () => {
      if(selectedFile) {
        try {
          // const data = await S3FileUpload.uploadFile(selectedFile, config);
          // console.log(data);
          const fileId=uuidv4();
          await storage.createFile(import.meta.env.VITE_APP_APPWRITE_BUCKET,fileId , selectedFile);
          console.log('File uploaded successfully');
          toast.success("File Uploaded");
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

    const downloadZip = () => {
        console.log('Download Folder', intra_zip);
        const link = document.createElement('a');
        link.href = intra_zip;
        link.setAttribute('download', `./assets/IntraWebDesign.rar`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

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
                  <li>3. Create a folder (zip file) with your name ( max size 30 mb ) . Add your html,css and js file. </li>
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
