import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImages([...images, fileUrl]);
  }

  const handleSelect = (e, image) => {
    const alreadySelected = selected.includes(image);
    let newSelected = [...selected]
    if (alreadySelected) {
      newSelected = selected.filter(item => item !== image);
    } else {
      newSelected = [...selected, image];
    }
    setSelected(newSelected)
  }

  const handleDelete = () => {
    let newImages = [...images];
    newImages = images.filter(item => !selected.includes(item))
    setImages(newImages);
  }
  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-between border-bottom mb-3'>
        <div className='fw-bold'> {selected.length} Files Selected </div>
        <button onClick={handleDelete} className='btn text-danger fw-bold'> Delete Files </button>
      </div>
      <div className="row">
        {
          images.map((image, index) => (
            <div className='col-md-3 position-relative'>
              <div style={{ zIndex: 333 }} className="input-group-text position-absolute top-0 start-0 m-4">
                <input checked={selected.includes(image)} onChange={(e) => handleSelect(e, image)} className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
              </div>
              <div className='mx-1 mb-4 card shadow'>
                <img src={image} style={{ height: '500px', width: '500px' }} alt="" />
              </div>
            </div>
          ))
        }
        <form className='col-md-3 bg-light border'>
          <div className="custom-file d-flex align-items-center justify-content-center">
            <div>
              <input style={{ height: '240px', width: '100%' }} onChange={handleImage} type="file" className="custom-file-input" id="imageUpload" accept="image/*" />
              <label style={{ height: '240px', width: '100%' }} className="custom-file-label" htmlFor="imageUpload">
                Choose image
              </label>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;
