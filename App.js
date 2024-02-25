import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Wardrobe from './Wardrobe';
import SubmissionForm from './SubmissionForm';
import OutfitBuilder from './OutfitBuilder';
import Outfit from './Outfit';


function App() {
  const [activeTab, setActiveTab] = useState('Wardrobe');
  const [outfitItems, setOutfitItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  // Function to delete an item
  const deleteItem = (id) => {
    setWardrobeItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleAddOutfit = (newOutfit) => {
    console.log("Before adding new outfit:", outfits);
    
    setOutfits(prevOutfits => {
      const updatedOutfits = [...prevOutfits, newOutfit];
      console.log("After adding new outfit:", updatedOutfits);
      return updatedOutfits;
    });

    setActiveTab('Outfits');
  };

  return (
    <div className="App">
      <div className="tabs">
        <button
          onClick={() => handleTabChange('Wardrobe')}
          style={{ backgroundColor: activeTab === 'Wardrobe' ? '#EDE7F6' : 'white',
          borderRadius: '20px', 
          boxShadow: 'none', 
          border: '3px solid #9278B1', 
          color: '4B0082'}}
        >
          Wardrobe
        </button>
        <button
          onClick={() => handleTabChange('Outfits')}
          style={{ backgroundColor: activeTab === 'Outfits' ? '#EDE7F6' : 'white',
          borderRadius: '20px', 
          boxShadow: 'none', 
          border: '3px solid #9278B1',
          color: '4B0082'}}
        >
          Outfits
        </button>
      </div>
  
      {activeTab === 'Wardrobe' && (
        <Wardrobe 
          deleteItem={deleteItem} 
          wardrobeItems={wardrobeItems} 
          setWardrobeItems={setWardrobeItems} 
          handleSelectedItems={setSelectedItems} 
          handleAddOutfit={handleAddOutfit} 
        />
      )}
      {activeTab === 'Outfits' && (
        <>
          <Outfit outfits={outfits} setOutfits={setOutfits} />
          <OutfitBuilder outfitItems={outfitItems} selectedItems={selectedItems} handleAddOutfit={handleAddOutfit} />
        </>
      )}
    </div>
  );
  
}

export default App;