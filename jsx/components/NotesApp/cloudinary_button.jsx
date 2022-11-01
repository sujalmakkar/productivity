import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "hzxyensd5"; // replace with your own cloud name
    const uploadPreset = "ml_default"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
        <div className='note-tool'>
        <input type="file" id="upload_widget" name="file" className="image-input" accept="image/png, image/jpg, image/jpeg , image/gif" onChange={uploadImage} />
        <label htmlFor="file" onChange={uploadImage}>
        <img src="https://img.icons8.com/material-rounded/96/000000/add-image.png"/>
        </label>
    </div>
    );
  }
}

export default CloudinaryUploadWidget;
