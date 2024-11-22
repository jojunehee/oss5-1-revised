import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AddModal({ show, handleClose, handleNewParcelChange, addParcel, newParcel }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 택배 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">운송장 번호</label>
            <input
              type="text"
              className="form-control"
              name="tracking_number"
              value={newParcel.tracking_number}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">보내는 사람</label>
            <input
              type="text"
              className="form-control"
              name="sender_name"
              value={newParcel.sender_name}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">받는 사람</label>
            <input
              type="text"
              className="form-control"
              name="recipient_name"
              value={newParcel.recipient_name}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">주소</label>
            <input
              type="text"
              className="form-control"
              name="recipient_address"
              value={newParcel.recipient_address}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">상태</label>
            <select
              className="form-select"
              name="status"
              value={newParcel.status}
              onChange={handleNewParcelChange}
            >
              <option value="배송 준비">배송 준비</option>
              <option value="배송 중">배송 중</option>
              <option value="배송 완료">배송 완료</option>
              <option value="반송">반송</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">비용</label>
            <input
              type="number"
              className="form-control"
              name="cost"
              value={newParcel.cost}
              onChange={handleNewParcelChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="danger" onClick={addParcel}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;