import React from "react";
import { useLocation } from 'react-router-dom';

function ItemDetailPage() {
    // Extracting item from the location object
    const { state } = useLocation();
    const item = state ? state.item : null;

    // Checking if item exists before rendering
    if (!item) {
        return <div>No item found</div>;
    }

    return (
        <div>
            <img src={item.imageUrl} alt={item.description} />
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
        </div>
    );
}

export default ItemDetailPage;