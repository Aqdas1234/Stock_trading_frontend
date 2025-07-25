import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../api/AxiosInstance';


const BuySellModal = ({ show, handleClose, stockSymbol, transactionType }) => {
  const [quantity, setQuantity] = useState(1);
  const [responseMsg, setResponseMsg] = useState('');

  const handleConfirm = async () => {
  try {
    const res = await axiosInstance.post('/transactions/', {
      stock_symbol: stockSymbol,
      transaction_type: transactionType,
      quantity: quantity,
    });

    setResponseMsg(`Success: ${res.data.message || 'Transaction successful.'}`);
    setTimeout(() => {
      setResponseMsg('');
      handleClose();
    }, 1000);
  } catch (err) {
    const errorData = err.response?.data;
    let errorMessage = 'Something went wrong';

    if (errorData?.non_field_errors) {
      errorMessage = errorData.non_field_errors.join(', ');
    } else if (errorData?.message) {
      errorMessage = errorData.message;
    }

    setResponseMsg('Error: ' + errorMessage);
  }
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{transactionType} Stock - {stockSymbol.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        {responseMsg && <p className="mt-3">{responseMsg}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant={transactionType === 'BUY' ? 'success' : 'danger'} onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuySellModal;
