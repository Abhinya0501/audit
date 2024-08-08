import React, { useState } from 'react';
import buyersData from './data.json'; 
import './App.css'; 

const App = () => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [pcsReceived, setPcsReceived] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [sampleAccept, setSampleAccept] = useState('');
  const [passCount, setPassCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const handleBuyerChange = (e) => {
    const buyer = buyersData.buyers.find(b => b.id === parseInt(e.target.value));
    setSelectedBuyer(buyer);
    setSelectedStyle(null);
    setPcsReceived('');
    setSampleSize('');
    setSampleAccept('');
    setPassCount(0);
    setFailCount(0);
  };

  const handleStyleChange = (e) => {
    const style = selectedBuyer.styles.find(s => s.id === parseInt(e.target.value));
    setSelectedStyle(style);
    setPcsReceived('');
    setSampleSize('');
    setSampleAccept('');
    setPassCount(0);
    setFailCount(0);
  };

  const handlePcsReceivedChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > selectedStyle.issuedQuantity) {
      setPcsReceived(selectedStyle.issuedQuantity);
    } else {
      setPcsReceived(value);
    }
    setSampleSize(Math.ceil(value * 0.15));
    setSampleAccept(Math.ceil(value * 0.05));
  };

  const handlePassClick = () => {
    if (!pcsReceived || !sampleSize || !sampleAccept) {
      alert('Please fill all fields first.');
      return;
    }
    if (passCount + failCount < sampleAccept) {
      setPassCount(passCount + 1);
    }
  };

  const handleFailClick = () => {
    if (!pcsReceived || !sampleSize || !sampleAccept) {
      alert('Please fill all fields first.');
      return;
    }
    if (passCount + failCount < sampleAccept) {
      setFailCount(failCount + 1);
    }
  };

  const handleFinalPassClick = () => {
    if (!selectedBuyer || !selectedStyle || !pcsReceived || !sampleSize || !sampleAccept) {
      alert('Please fill all fields first.');
      return;
    }
    console.log('Final Pass:', {
      buyer: selectedBuyer.name,
      style: selectedStyle.name,
      issuedQuantity: selectedStyle.issuedQuantity,
      pcsReceived,
      sampleSize,
      sampleAccept,
      passCount,
      failCount,
      finalDecision: 'Pass'
    });
  };

  const handleFinalFailClick = () => {
    if (!selectedBuyer || !selectedStyle || !pcsReceived || !sampleSize || !sampleAccept) {
      alert('Please fill all fields first.');
      return;
    }
    console.log('Final Fail:', {
      buyer: selectedBuyer.name,
      style: selectedStyle.name,
      issuedQuantity: selectedStyle.issuedQuantity,
      pcsReceived,
      sampleSize,
      sampleAccept,
      passCount,
      failCount,
      finalDecision: 'Fail'
    });
  };

  const allFieldsFilled = pcsReceived && sampleSize && sampleAccept;
  const finalButtonsActive = passCount + failCount >= sampleAccept;

  return (
    <div className="app-container">
      <h1>Audit Application</h1>
      <div className="form-group">
        <label>Buyer:</label>
        <select onChange={handleBuyerChange}>
          <option value="">Select Buyer</option>
          {buyersData.buyers.map(buyer => (
            <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Style:</label>
        <select onChange={handleStyleChange} disabled={!selectedBuyer}>
          <option value="">Select Style</option>
          {selectedBuyer && selectedBuyer.styles.map(style => (
            <option key={style.id} value={style.id}>{style.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Issued Quantity:</label>
        <input type="number" value={selectedStyle ? selectedStyle.issuedQuantity : ''} readOnly />
      </div>
      <div className="form-group">
        <label>Pcs Received:</label>
        <input type="number" value={pcsReceived} onChange={handlePcsReceivedChange} disabled={!selectedStyle} />
      </div>
      <div className="form-group">
        <label>Sample Size:</label>
        <input type="number" value={sampleSize} readOnly />
      </div>
      <div className="form-group">
        <label>Sample Accept:</label>
        <input type="number" value={sampleAccept} readOnly />
      </div>
      <div className="button-group">
        <button onClick={handlePassClick} disabled={!allFieldsFilled} className={ 'active' }>
          Pass ({passCount})
        </button>
        <button onClick={handleFailClick} disabled={!allFieldsFilled} className={'active' }>
          Fail ({failCount})
        </button>
      </div>
      <div className="button-group">
        <button 
          onClick={handleFinalPassClick} 
          disabled={!finalButtonsActive || (failCount > passCount && passCount === 0)}
          className={finalButtonsActive ? 'active' : 'inactive'}
        >
          Final Pass
        </button>
        <button 
          onClick={handleFinalFailClick} 
          disabled={!finalButtonsActive || (passCount > failCount && failCount === 0)}
          className={finalButtonsActive ? 'active' : 'inactive'}
        >
          Final Fail
        </button>
      </div>
    </div>
  );
};

export default App;
