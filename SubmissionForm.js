import React from "react";
import { useState, useEffect } from 'react';

function SubmissionForm( {onItemSubmit, itemToEdit, hideForm} ) {

    const [tempImage, setTempImage] = useState(null); // Temporary storage for the uploaded image
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'category', // Default category, adjust as needed
        imageUrl: '' // This will be used to store the existing image URL when editing
    });

    
    useEffect(() => {
        if (itemToEdit) {
          setFormData({
            name: itemToEdit.name,
            description: itemToEdit.description,
            category: itemToEdit.category,
            imageUrl: itemToEdit.imageUrl
          });
          // If you're using a separate state for the image, you might want to set it here as well
          setTempImage({ imageUrl: itemToEdit.imageUrl });
        }}, [itemToEdit]);

    // uploading items
    const handleImageUpload = (event) => {
        // getting file and reading
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        
    
    // read the uploaded file
    const reader = new FileReader();
    reader.onloadend = () => {
        // store the uploaded image temporarily
        // form is displayed to input name and description
        // after form is submitted, image is added as a new item
        setTempImage({
            imageUrl: reader.result,
            file: file,
        });
    };
    reader.readAsDataURL(file);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        // name and description of image
        const name = e.target.name.value;
        const description = e.target.description.value;
        // change to dropdown ******
        const category = e.target.category.value;

        // create a new item with name and description
        const newItem = {
            id: Date.now(),
            name: name,
            description: description,
            category: category,
            imageUrl: tempImage.imageUrl,
        };

        //setItems([...items, newItem]);
        onItemSubmit(newItem);
        // Clear the temporary image for next submission
        setTempImage(null);
    };

    return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with opacity
          zIndex: 9999, // Ensure the form is on top of other content
        }}>
          <div style={{
            width: '300px',
            padding: '20px',
            backgroundColor: '#ffffff',
            border: '2px solid #4B0082',
            borderRadius: '10px',
          }}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label><br />
              <input type="text" id="name" name="name" /><br />
              <label htmlFor="description">Description:</label><br />
              <input type="text" id="description" name="description" /><br />
              <label htmlFor="category">Choose a category:</label><br />
              <select name="category" id="category">
                <option value="Top">Tops</option>
                <option value="Bottom">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
              </select><br />
              <input type="file" onChange={handleImageUpload} accept="image/*" /><br />
              <div style={{ textAlign: 'center' }}>
                <button type="submit">Submit</button>
                <button type="button" onClick={hideForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      );
}




export default SubmissionForm;