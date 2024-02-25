import React, { useState } from "react";
import Item from './Item';

function OutfitBuilder({ outfitItems, handleAddOutfit }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [tags, setTags] = useState('');

    // Handle item selection
    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // Check if items is defined before accessing its length
    if (!outfitItems || outfitItems.length === 0) {
        return <p></p>;
    }

    const handleCreateOutfit = () => {
        const newOutfit = {
            id: Date.now(), // Unique identifier for the outfit
            items: selectedItems.map(itemId => outfitItems.find(item => item.id === itemId)),
    };
        
        handleAddOutfit(newOutfit); // Pass the new outfit up to be added to the state in the parent component
        setSelectedItems([]); // Reset selected items
};


    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start;'}}>
            <h2>Outfit Builder</h2>
            <div>
                <label htmlFor="tags">Tags:</label>
                <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
            {outfitItems.map((item) => (
                    <div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Selected Items:</h3>
                {selectedItems.length > 0 ? selectedItems.map(itemId => {
                    const selectedItem = outfitItems.find(item => item.id === itemId);
                    return (
                        <img key={selectedItem.id} src={selectedItem.imageUrl} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', marginRight: '10px' }} />
                    );
                 }) : <p>No items selected.</p>}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleAddOutfit}>Create Outfit</button>
            </div>
        </div>
    );
}

export default OutfitBuilder;