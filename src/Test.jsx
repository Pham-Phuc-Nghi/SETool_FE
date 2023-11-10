import { useState } from 'react';
import { addImage, getImage } from './helper/uploadImage'; // Import your Firebase module

function Test() {
    const [file, setFile] = useState(null);
    const [id, setId] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleUpload = async () => {
        if (file && id) {
            try {
                await addImage(file, id);
                console.log('Image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.error('Please select a file and provide an ID.');
        }
    };

    const handleGetImage = async () => {
        if (id) {
            try {
                const url = await getImage(id);
                setImageUrl(url);
            } catch (error) {
                console.error('Error getting image:', error);
            }
        } else {
            console.error('Please provide an ID to get the image.');
        }
    };

    return (
        <div>
            <h2>Test Component</h2>
            <div>
                <label>
                    Select Image:
                    <input type="file" onChange={handleFileChange} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Enter ID:
                    <input type="text" value={id} onChange={handleIdChange} />
                </label>
            </div>
            <br />
            <div>
                <button onClick={handleUpload}>Upload Image</button>
                <br />
                <button onClick={handleGetImage}>Get Image</button>
            </div>
            <br />
            {imageUrl && (
                <div>
                    <h3>Downloaded Image:</h3>
                    <img src={imageUrl} alt="Downloaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}

export default Test;
