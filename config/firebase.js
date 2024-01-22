import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnfsNAlPTwaWQMpWGwmdD4qKXpVU0VFXM",
    authDomain: "whatsapp-b18ee.firebaseapp.com",
    projectId: "whatsapp-b18ee",
    storageBucket: "whatsapp-b18ee.appspot.com",
    messagingSenderId: "981297820331",
    appId: "1:981297820331:web:0554a68cbcf1dee5e8fdee",
    measurementId: "G-LZH6T2G40G"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const handleUploadImagetoFirebase = async (file) => {
    try {
        if (file) {
            const storageRef = ref(storage, 'images/' + file.originalname);

            // Sử dụng uploadBytes để tải lên tệp tin
            const snapshot = await uploadBytesResumable(storageRef, file.buffer);


            // Lấy URL download sau khi tải lên thành công
            const downloadURL = await getDownloadURL(snapshot.ref);


            // Trả về URL download hoặc thực hiện các xử lý khác theo nhu cầu của bạn
            return downloadURL;
        } else {
            console.error("No file selected.");
            return null;
        }
    } catch (error) {
        console.error('Error during upload:', error);
        return null;
    }
};
