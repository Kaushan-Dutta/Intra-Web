import { Client, Storage } from "appwrite";

const client = new Client();

const storage = new Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(import.meta.env.VITE_APP_APPWRITE_PROJECT) 
;
export default storage;

