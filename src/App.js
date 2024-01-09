import './App.css';
import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from 'react-bootstrap/Button';

function App() {
  const [brushRadius, setBrushRadius] = useState(3);
  const [brushColor, setBrushColor] = useState('black');
  const [selectedColor, setSelectedColor] = useState('black');
  const canvasRef = useRef();
  // Asumiendo que tienes un estado para la URL de datos de la imagen
  const [imageDataUrl, setImageDataUrl] = useState(null);

  // Función para obtener la URL de datos de la imagen del canvas
  const getCanvasImage = () => {
    const dataUrl = canvasRef.current.getDataURL();
    setImageDataUrl(dataUrl);
  };

  const handleSave = () => {
    getCanvasImage();
    if (canvasRef.current) {
      const data = canvasRef.current.getSaveData();
      console.log(data);

    }
  };

  const handleBrushSizeChange = (event) => {
    setBrushRadius(event.target.value);
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    setBrushColor(newColor);
  };

  const handleClearCanvas = () => {
    canvasRef.current.clear();
  };

  const undo = () => {
    canvasRef.current.undo();
  }

  return (
    <div className="App">
      <h1>React Canvas Draw</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '100vh', margin: '20px' }}>
        <div>
          {imageDataUrl && <img src={imageDataUrl} alt="Canvas" />}
        </div>
        <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
          <Button variant="primary" onClick={handleClearCanvas} style={{ marginTop: '10px', width: '40px', height: '40px' }}>
            <i className="bi bi-eraser-fill"></i>
          </Button>
          <Button variant="primary" onClick={undo} style={{ marginTop: '10px', width: '40px', height: '40px' }}>
            <i className="bi bi-arrow-counterclockwise"></i>
          </Button>
          <label htmlFor="brushSize">
            <i className="bi bi-brush"></i> Brush Size:
          </label>
          <input
            id="brushSize"
            type="range"
            min="1"
            max="5"
            value={brushRadius}
            onChange={handleBrushSizeChange}
            style={{ marginLeft: '5px', marginBottom: '10px' }}
          />
          <label htmlFor="colorPicker">
            <i className="bi bi-eyedropper"></i> Brush Color:
          </label>
          <input
            id="colorPicker"
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            style={{ marginLeft: '5px', marginBottom: '10px' }}
          />
          <Button variant="primary" onClick={handleSave} style={{ marginTop: '10px' }}>
            Save
          </Button>
          <br />
        </div>
        <div>
          <CanvasDraw
            ref={canvasRef}
            brushRadius={brushRadius}
            brushColor={brushColor}
            catenaryColor="black"
            hideGrid={true}
            hideInterface={true}
            lazyRadius={0}
            style={{ border: '1px solid #000' }}
          />
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;
