import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function AddModal({ showAddModal, handleCloseAddModal, newParcel, handleNewParcelChange, addParcel }) {
  return (
    <Modal show={showAddModal} onHide={handleCloseAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>새 택배 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {['tracking_number', 'sender_name', 'recipient_name', 'recipient_address', 'cost'].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field}</label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={newParcel[field] || ''}
                onChange={handleNewParcelChange}
              />
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddModal}>취소</Button>
        <Button variant="danger" onClick={addParcel}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
}