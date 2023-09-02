import React, { useState } from 'react';
// Css file
import './Home.css';
// React package for TextOverlay draggable
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

const Home = () => {
    // API for Unsplash image search
    const API_KEY = process.env.REACT_APP_API_KEY;
    // State variables
    const [loading, setLoading] = useState();
    const [search, setSearch] = useState('');
    const [image, setImage] = useState('https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg');
    const [overlayText, setOverlayText] = useState('Add Text'); 
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [textSize, setTextSize] = useState({ width: 200, height: 'auto' });

    // Searching Photo
    async function getPhotoByName() {
        try {
            setLoading(1);
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${API_KEY}`);
            const photos = await response.json();
            setImage(photos.results[0]?.urls.full || 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg');
            setLoading();
        } catch (e) {
            setLoading();
            console.log(e);
        }
    }
// TextOverlay handle
    const handleOverlayTextChange = (e) => {
        setOverlayText(e.target.value);
    };

    const handleTextDrag = (e, ui) => {
        const { x, y } = ui;
        setTextPosition({ x, y });
    };

    const handleTextResize = (e, { size }) => {
        const { width, height } = size;
        setTextSize({ width, height });
    };

    return (
        <div align='center' style={{ margin: '1.5rem' }}>
            <div id='searchPlace'>
                <input type="text" placeholder='Search an image' onChange={(e) => setSearch(e.target.value)} className='searchImg' />
                <button onClick={() => getPhotoByName()} className='btn'>SEARCH</button> <br />
                {loading && <span style={{color:'yellow'}}>Loading...</span>}
            </div>
            <div className='image-container'>
                <img src={image} alt={search} width="800" height="500" />
                <Draggable
                    bounds="parent"
                    onDrag={handleTextDrag}
                    position={textPosition}
                >
                    <Resizable
                        width={textSize.width}
                        height={textSize.height}
                        onResize={handleTextResize}
                        handleComponent={{ right: <div className="resizable-handle" />, bottom: <div className="resizable-handle" /> }}
                    >
                        <div className='text-overlay' contentEditable={true} onChange={handleOverlayTextChange} style={{ width: `${textSize.width}px`, height: `${textSize.height}px` }}>
                            {overlayText}
                        </div>
                    </Resizable>
                </Draggable>
            </div>
        </div>
    );
};

export default Home;
