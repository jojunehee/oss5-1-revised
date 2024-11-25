import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditModal({ show, handleClose, handleInputChange, saveChanges, currentParcel }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>수정하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">운송장 번호</label>
            <input
              type="text"
              className="form-control"
              name="tracking_number"
              value={currentParcel?.tracking_number || ''} // Optional chaining 및 기본값 추가
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">보내는 사람</label>
            <input
              type="text"
              className="form-control"
              name="sender_name"
              value={currentParcel?.sender_name || ''} // Optional chaining 및 기본값 추가
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">받는 사람</label>
            <input
              type="text"
              className="form-control"
              name="recipient_name"
              value={currentParcel?.recipient_name || ''} // 기본값 추가
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">주소</label>
            <input
              type="text"
              className="form-control"
              name="recipient_address"
              value={currentParcel?.recipient_address || ''} // 기본값 추가
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">상태</label>
            <select
              className="form-select"
              name="status"
              value={currentParcel?.status || ''} // 기본값 추가
              onChange={handleInputChange}
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
              value={currentParcel?.cost || ''} // 기본값 추가
              onChange={handleInputChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
