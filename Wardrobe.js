import React from "react";
import { useState, useEffect } from 'react';
import Item from './Item';
import SubmissionForm from "./SubmissionForm";
import { useNavigate, useNavigation } from 'react-router-dom';

function Wardrobe( {wardrobeItems, setWardrobeItems, handleAddOutfit} ) {

    const [selectedItems, setSelectedItems] = useState([]);
    const [FormDisplayed, setFormDisplayed] = useState(false);
    const [editItemId, setEditItemId] = useState(null); // track editing of items
    const [menuItemId, setMenuItemId] = useState(null);
    

    // Function to hide the form
    const hideForm = () => {
    setFormDisplayed(false);
    };

    const createOutfit = () => {
        // Combine selected items into an outfit item
        const outfitItem = {
          id: Date.now(), // Unique ID for the outfit item
          items: selectedItems.map(id => wardrobeItems.find(item => item.id === id)),
        };

    handleAddOutfit(outfitItem);

    setSelectedItems([])
    };


    const handleItemSubmit = (newItem) => {
        if (editItemId !== null) {
            // Editing an existing item
            setWardrobeItems(wardrobeItems.map(item => item.id === editItemId ? { ...item, ...newItem } : item));
        } else {
            // Adding a new item
            setWardrobeItems(prevItems => [...prevItems, { ...newItem, id: Date.now() }]);
        }
    
        // Reset states after submission
        setFormDisplayed(false);
        setEditItemId(null);
        setMenuItemId(null);
    };


    const handleMenuToggle = (id) => {
        setMenuItemId(menuItemId === id ? null : id);
    }
    
    const handleEditItem = (id) => {
        setEditItemId(id);
        setFormDisplayed(true);
        // close menu
        setMenuItemId(null);
    }

    // deleting items from item array based on item ID and selection
    const handleDeleteItem = (id) => {
        setWardrobeItems(wardrobeItems.filter(item => item.id !== id));

        if (editItemId === id) {
            setFormDisplayed(false);
            setEditItemId(null);
        }

        setMenuItemId(null); 
    }
    
    const handleItemSelected = (id) => {
        const index = selectedItems.indexOf(id);
        if (index === -1) {
            setSelectedItems([...selectedItems, id]);
        } else {
            const updatedSelection = [...selectedItems];
            updatedSelection.splice(index, 1);
            setSelectedItems(updatedSelection);
        }
    };
    

    const testArray = ['hi', 'hello', 'bye'];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right' , marginRight: '20px', marginTop: '20px'} }>
                <button onClick={() => setFormDisplayed(true)} type="button"
                style={{ fontFamily: "'Pacifico', cursive" , borderRadius: '20px',
                boxShadow: 'none', 
                backgroundColor: '#EDE7F6',
                margin: '5px',
                color: '#FFFFF',
                borderColor: '2px solid 9278B1',}}>
                    Add New Item
                </button>
            </div>
            {FormDisplayed && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <SubmissionForm onItemSubmit={handleItemSubmit} hideForm={hideForm} />
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            </div>

    {selectedItems.length >= 2 && (
                <div style={{ position: 'fixed', bottom: '580px', right: '523px', zIndex: '999'}}>
                    <button 
                        onClick={() => createOutfit(selectedItems)} 
                        type="button" 
                        style={{
                            visibility: selectedItems.length >= 2 ? 'visible' : 'hidden', // Control visibility
                            height: 'auto',
                            padding: '5px 15px',
                            fontFamily: 'Pacifico, cursive',
                            backgroundColor: '#4B0082',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '12',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                >
                        Create Outfit
                </button>
            </div>
            )}

    {wardrobeItems.map((item) => (
        <div key={item.id} style={{ border: '2px solid #4B0082', 
                                    borderRadius: '15px',
                                    padding: '8px', 
                                    maxWidth: '150px', 
                                    height: '210px',
                                    position: 'relative', 
                                    marginBottom: '20px', 
                                    display: 'inline-flex', 
                                    flexDirection: 'column',
                                    alignItems: 'flex-start;', 
                                    justifyContent: 'flex-start', 
                                    marginLeft: '10px',  
                                    marginTop: '100px',
                                    marginBottom: '20px',
                                    marginRight: '20px',
                                    boxSizing: 'border-box'}}>
            <input type="checkbox" style={{ position: 'absolute', top: '5px', left: '5px'}} 
                    onChange={() => handleItemSelected(item.id)}
                    checked={selectedItems.includes(item.id)}/>
                {item.imageUrl && (
                    <div style={{ marginRight: '10px' }}> 
                        <img src={item.imageUrl} alt={item.description} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', marginLeft: '20px'}} />
                        <img src={require('/Users/krystalqiao/Desktop/hbp-project/src/Images/Untitled_Artwork 10.png')} style={{ position: 'absolute', top: '-100px', left: '0px', zIndex: '1', width: '150px', height: 'auto' }} />
                    </div>
                )}
            <div style={{ textAlign: 'left', flex: 1, }}>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', cursive" }}>Name: </p>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', normal" }}>{item.name}</p>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', cursive" }}>Description: </p>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', normal" }}>{item.description}</p>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', cursive" }}>Category: </p>
                <p style={{ margin: '0', fontSize: 'small', fontFamily: "'Pacifico', normal" }}>{item.category}</p>
                </div>
            <div style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }} onClick={() => handleMenuToggle(item.id)}>
                &#x22EE;
            </div>
            {menuItemId === item.id && (
                <div style={{ position: 'absolute', top: '20px', right: '5px', background: 'white', border: '1px solid black', zIndex: 1 }}>
                    <div style={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleEditItem(item.id)}>Edit</div>
                    <div style={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleDeleteItem(item.id)}>Delete</div>
                </div>
            )}
        </div>
    ))}
    
      </div>
    );
}

export default Wardrobe;