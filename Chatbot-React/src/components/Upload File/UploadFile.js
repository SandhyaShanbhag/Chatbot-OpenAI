import React from 'react'
import './UploadFile.css'

function handleFileUpload(event) {
  const file = event.target.files[0]; // Get the first file from the selected files

  // Create a new instance of FileReader
  const reader = new FileReader();

  reader.onload = function (e) {
    const fileContents = e.target.result; // Get the file contents

    // Perform your logic to save the file to the directory
    // This could involve making an API call to your server or using a library like `fs` (for server-side rendering)

    // For example, if you're using an API, you can send the fileContents as the request payload
    saveFileToDirectory(fileContents)
      .then(() => {
        // File saved successfully
        console.log('File saved to directory.');
      })
      .catch((error) => {
        // Handle error if the file couldn't be saved
        console.error('Error saving file to directory:', error);
      });
  };

  // Read the file as text or binary data
  // You can change this based on your requirements
  reader.readAsText(file); // Read the file as text
  // reader.readAsArrayBuffer(file); // Read the file as binary data
}

function saveFileToDirectory(fileContents) {
  // Perform an API call to save the file
  // Example using `fetch`:
  console.log(fileContents);
  return fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: fileContents,
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the response from the server if needed
      // For example, you can return a success message or the saved file path
      return data;
    });
}


function UploadFile() {
  return (

    <div class="mb-6 pt-4">
        <div class="formbold-mb-5 formbold-file-input">
          <input type="file" name="file" id="file" onChange={handleFileUpload}/>
          <label for="file">
            <div>
              <span class="formbold-drop-file"> Drop files here </span>
              <span class="formbold-or"> Or </span>
              <span class="formbold-browse"> Browse </span>
            </div>
          </label>
        </div>
    </div>
    
//     <div class="row d-flex justify-content-center mt-100">
    
//     <div class="col-md-8">
        
//         <div class="card">
// <div class="card-block">
// <form action="#" class="dropzone dz-clickable">
// <label class="custom-file-upload">
// <input type="file"/>
// Select File
// </label>
// {/* <div class="dz-default dz-message"><span>Drop files here to upload</span></div> */}
// </form>
// <div class="text-center m-t-20">
// {/* <button class="btn btn-primary">Upload Now</button> */}

// </div>
// </div>
// </div>
//     </div>
    
    
// </div>
  )
}

export default UploadFile