
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// const db = getDatabase();

export async function addImage(file, id) {
    if (file == null) return;
    const imageRef = ref(storage, `images/${id}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
        'state_changed',
        () => { },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                console.log("Lưu Ảnh trên FireBase thành công!");
                console.log(downloadURL);
            });
        }
    );
}

export async function getImage(id) {
    //const dbRef = ref(db, 'images');
    //const img = await get(child(dbRef, id));
    const storageRef = ref(storage, `images/${id}`);
    return getDownloadURL(storageRef);
}