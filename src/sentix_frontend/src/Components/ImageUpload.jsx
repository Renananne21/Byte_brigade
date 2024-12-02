// import { useState } from "react";
// import Masonry from "react-masonry-css";
// import "./App.css";
// import { sentix_backend } from "./declarations/sentix_backend";

// const App = () => {
//     const [uploads, setUploads] = useState([]); // To store uploaded images
//     const [isLoadingImage, setIsLoadingImage] = useState(false); // Upload loading state
//     const [progress, setProgress] = useState(null); // Upload progress
//     const [selectedImage, setSelectedImage] = useState(null); // Selected image for upload

//     const handleImageUpload = async (event) => {
//         event.preventDefault();
//         const file = event.target.files[0];
//         if (!file) return;

//         setIsLoadingImage(true);

//         const reader = new FileReader();
//         reader.onload = async () => {
//             try {
//                 const imageData = new Uint8Array(reader.result);
//                 const chunks = Array.from(imageData);

//                 const id = await sentix_backend.upload_image(chunks); // Call Sentix backend

//                 // Add the uploaded image to the state
//                 setUploads((prev) => [
//                     {
//                         id, // Use unique ID from backend
//                         src: URL.createObjectURL(file),
//                         fileName: file.name,
//                     },
//                     ...prev,
//                 ]);
//                 setSelectedImage(null);
//             } catch (error) {
//                 console.error("Error uploading image:", error);
//             } finally {
//                 setIsLoadingImage(false);
//             }
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     return (
//         <div className="App-wrapper">
//             <Masonry
//                 breakpointCols={{ default: 4, 600: 2, 800: 3 }}
//                 className="App-masonry"
//                 columnClassName="App-masonry-column"
//             >
//                 <label className="App-upload">
//                     📂 Upload photo
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         style={{ display: "none" }}
//                     />
//                 </label>

//                 {uploads.map((upload) => (
//                     <div
//                         key={upload.id}
//                         className="App-image"
//                         style={{ aspectRatio: "1 / 1" }}
//                     >
//                         <img
//                             src={upload.src}
//                             alt={upload.fileName}
//                             loading="lazy"
//                         />
//                     </div>
//                 ))}
//             </Masonry>

//             {isLoadingImage && (
//                 <div className="App-progress">
//                     Uploading...
//                 </div>
//             )}
//         </div>
//     );
// };

// export default App;
