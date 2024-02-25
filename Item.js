import React from "react";

function Item({ item, onSelect, isSelected }) {

    const handleClick = () => {
        onSelect(item.id);
    };

    const itemStyle = {
        border: isSelected ? '2px solid blue' : '1px solid gray', 
        cursor: 'pointer', // item is clickable
        padding: '10px', 
        margin: '10px', 
        borderRadius: '50px', // rounded corners
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
    };

    return (
        <div style={itemStyle} onClick={handleClick}>
            {item.imageUrl && <img src={item.imageUrl} alt={item.description} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} />}
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
        </div>
    );
}

export default Item;