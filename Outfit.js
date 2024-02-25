import React, { useState } from "react";

function Outfit({ outfits, setOutfits }) {
    const [activeMenuOutfitId, setActiveMenuOutfitId] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showDeleteTagOptions, setShowDeleteTagOptions] = useState(false);
    const [sortTag, setSortTag] = useState('');


    const handleMenuClick = (outfitId) => {
        // Toggle the menu for the clicked outfit
        setActiveMenuOutfitId(activeMenuOutfitId === outfitId ? null : outfitId);
        setShowTagOptions(false);  // Reset tag options visibility
        setShowDeleteTagOptions(false);
    };

    const handleAddTagClick = () => {
        setShowTagOptions(!showTagOptions);  
        setShowDeleteTagOptions(false);
    };

    const handleDeleteTagClick = () => {
        setShowDeleteTagOptions(!showDeleteTagOptions);  
        setShowTagOptions(false);
    };


    const getAllUniqueTags = () => {
        return ["Casual", "Business Casual", "Business Formal", "Formal"];
    };

    const filterOutfitsByTag = (tag) => {
        if (!tag) return outfits; // Return all outfits if no tag is selected
        return outfits.filter(outfit => outfit.tags && outfit.tags.includes(tag));
    };

    // const sortOutfitsByTag = (tag) => {
    //     if (!tag) return outfits;
    //     return outfits.slice().sort((a, b) => {
    //         const aHasTag = a.tags?.includes(tag);
    //         const bHasTag = b.tags?.includes(tag);
    //         return aHasTag === bHasTag ? 0 : aHasTag ? -1 : 1;
    //     });
    // };

    const addTagToOutfit = (outfitId, tag) => {
        const updatedOutfits = outfits.map(outfit => {
            if (outfit.id === outfitId) {
                const newTags = outfit.tags ? [...outfit.tags, tag] : [tag];
                return { ...outfit, tags: newTags };
            }
            return outfit;
        });

        setOutfits(updatedOutfits);
        // Close the menus
        setActiveMenuOutfitId(null);
        setShowTagOptions(false);
    };
    
    const deleteTag = (outfitId, tagToDelete) => {
        const updatedOutfits = outfits.map(outfit => {
            if (outfit.id === outfitId) {
                const filteredTags = outfit.tags.filter(tag => tag !== tagToDelete);
                return { ...outfit, tags: filteredTags };
            }
            return outfit;
        });
        setOutfits(updatedOutfits);
    };

    const handleCancel = () => {
        // Close the menus without adding a tag
        setShowTagOptions(false);
    };

    return (
        <div className="outfits-container">
            <div className="sort-menu">
                <label htmlFor="sort-by">Filter by:</label>
                <select id="sort-by" onChange={(e) => setSortTag(e.target.value)}>
                    <option value="">Select a tag</option>
                    {["Casual", "Business Casual", "Business Formal", "Formal"].map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
    
            {filterOutfitsByTag(sortTag).map((outfit, index) => (
                <div key={outfit.id} className="outfit">
                    <p className="outfit-label">Outfit {index + 1}</p>
                    <div className="outfit-content">
                        {outfit.items.map(item => (
                            <img key={item.id} src={item.imageUrl} alt="" className="outfit-image" />
                        ))}
                        <div className="menu" onClick={() => handleMenuClick(outfit.id)}>⋮</div>
                        {outfit.tags && (
                            <div className="outfit-tags">
                                <p>Tags:</p>
                                {outfit.tags.map((tag, idx) => (
                                    <p key={idx} className="outfit-tag">{tag}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    {activeMenuOutfitId === outfit.id && (
                        <div className="dropdown" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                            <button onClick={handleAddTagClick} 
                                style={{
                                    fontFamily: "'Pacifico', cursive",
                                    borderRadius: '20px',
                                    boxShadow: 'none',
                                    backgroundColor: '#EDE7F6',
                                    margin: '5px',
                                    color: '#4B0082',
                                    borderColor: '2px solid #9278B1',
                                }}>
                                Add Tag
                            </button>
                            <button onClick={handleDeleteTagClick} 
                                style={{
                                    fontFamily: "'Pacifico', cursive",
                                    borderRadius: '20px',
                                    boxShadow: 'none',
                                    backgroundColor: '#EDE7F6',
                                    margin: '5px',
                                    color: '#4B0082',
                                    borderColor: '2px solid #9278B1',
                                }}>
                                Delete Tag
                            </button>
                            {showTagOptions && (
                                <div className="tag-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    {getAllUniqueTags().map(tag => (
                                        <button key={tag} onClick={() => addTagToOutfit(outfit.id, tag)}
                                            style={{
                                                fontFamily: "'Pacifico', cursive",
                                                borderRadius: '20px',
                                                boxShadow: 'none',
                                                backgroundColor: '#EDE7F6',
                                                margin: '1px',
                                                color: '#4B0082',
                                                fontSize: '9px',
                                                borderColor: '2px solid #9278B1',
                                            }}>
                                            {tag}
                                        </button>
                                    ))}
                                    <button onClick={handleCancel}
                                        style={{
                                            fontFamily: "'Pacifico', cursive",
                                            borderRadius: '20px',
                                            boxShadow: 'none',
                                            backgroundColor: '#EDE7F6',
                                            margin: '5px',
                                            color: '#4B0082',
                                            fontSize: '11px',
                                            borderColor: '2px solid #9278B1',
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                            {showDeleteTagOptions && (
                                <div className="tag-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    {outfit.tags.map((tag) => (
                                        <button key={tag} onClick={() => deleteTag(outfit.id, tag)}
                                            style={{
                                                fontFamily: "'Pacifico', cursive",
                                                borderRadius: '20px',
                                                boxShadow: 'none',
                                                backgroundColor: '#EDE7F6',
                                                margin: '1px',
                                                color: '#4B0082',
                                                fontSize: '7px',
                                                borderColor: '2px solid #9278B1',
                                            }}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
    
    
}

export default Outfit;
