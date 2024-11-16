import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import backgroundImage from "./img/banner.png";

function App() {
  //필요한 상태 변수, 함수 선언부------------------------------------------------------------
  const [parcels, setParcels] = useState([]);
  // 택배 정보를 저장하는 상태 변수. 서버에서 데이터 전체를 다! 다! 가져와서 저장.
  const [currentParcel, setCurrentParcel] = useState(null);
  // 수정 중인 택배 데이터를 임시로 저장하는 상태 변수.
  const [showModal, setShowModal] = useState(false);
  // "수정 모달"이 열려 있는지 여부를 구별하는 상태 변수. true면 열림.

  const [showAddModal, setShowAddModal] = useState(false);
  // "추가 모달"이 열려 있는지 여부를 관리하는 상태 변수. true면 열림.
  // 초기값은 false이며, 추가 버튼을 클릭하면 true로 변경되어 모달이 열림.
  
  const [newParcel, setNewParcel] = useState({
    tracking_number: '',  // 새로 추가할 운송장 번호
    sender_name: '',      // 새로 추가할 보내는 사람 이름
    recipient_name: '',   // 새로 추가할 받는 사람 이름
    recipient_address: '',// 새로 추가할 받는 사람 주소
    status: '',           // 새로 추가할 상태 (배송 준비, 배송 중 등)
    cost: ''              // 새로 추가할 배송 비용
  });
  // "추가 모달"에서 입력받은 데이터를 저장하는 상태 변수

  // 데이터 가져오기. 두고두고 쓸 것.
  const fetchParcels = async () => {
    const response = await axios.get('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels');
    setParcels(response.data);
  };
  // 맨 처음에 데이터 가져오기.(최초 한번만 동작)
  useEffect(() => {
    fetchParcels();
  }, []);

  // 모달 열기/닫기
  const handleShowModal = (parcel) => {
    setCurrentParcel({ ...parcel });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // 입력 값 업데이트. 모달 내부에서 매 입력에 반응
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentParcel({ ...currentParcel, [name]: value });
  };

  // 수정 서버에 저장
  const saveChanges = async () => {
    await axios.put(
      `https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${currentParcel.id}`,
      currentParcel
    );
    fetchParcels();
    setShowModal(false);//모달 닫기
  };

  // 새 데이터 추가 입력 값 관리
  const handleNewParcelChange = (e) => {
    const { name, value } = e.target;
    setNewParcel({ ...newParcel, [name]: value });
  };

  // 새 데이터 추가
  const addParcel = async () => {
    await axios.post('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels', newParcel);
    fetchParcels();
    setNewParcel({
      tracking_number: '',
      sender_name: '',
      recipient_name: '',
      recipient_address: '',
      status: '',
      cost: ''
    });
    
    setShowAddModal(false);
  };

  // 데이터 삭제
  const deleteParcel = async (id) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      await axios.delete(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`);
      fetchParcels();
    }
  };
  //------------------------------------------------------------필요한 상태 변수, 함수 선언부
  return (
    <div className="container">
      <div
        className="container-fluid text-white text-center py-5"
        style={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
          height: "40vh",
          display: "flex", // Flexbox 사용
          flexDirection: "column", // 수직 방향 정렬
          alignItems: "center", // 가로 중앙 정렬
          justifyContent: "center" // 세로 중앙 정렬
        }}
      >
        <div className="container">
          <h1
            className="display-4 fw-bold mb-4"
            style={{
              textShadow: '4px 4px 10px rgba(1, 1, 1, 1)'
            }}
          >
            택배 관리 시스템
          </h1>

          <p className="lead fw-bold" style={{
            textShadow: '4px 4px 10px rgba(1, 1, 1, 1)'
          }}>쉽고 빠르게 택배를 관리하세요.</p>
          <button type="button" className="btn btn-danger mb-3 btn-lg" onClick={handleShowAddModal}>
            새 택배 추가
          </button>
        </div>
      </div>


      {/*와 JSX에서 주석 여러 줄 쓰려면 기본 주석에 중괄호로 감싸야 함;; JSX뭔가 편한데 자꾸 내 상식을 파괴하네...*/}
      {/* 택배 추가 버튼 */}


      {/* 목록 */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>운송장 번호</th>
            <th>보내는 사람</th>
            <th>받는 사람</th>
            <th>주소</th>
            <th>상태</th>
            <th>비용</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.id}>
              <td>{parcel.tracking_number}</td>
              <td>{parcel.sender_name}</td>
              <td>{parcel.recipient_name}</td>
              <td>{parcel.recipient_address}</td>
              <td>{parcel.status}</td>
              <td>{Number(parcel.cost).toLocaleString()}원</td>
              <td>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleShowModal(parcel)}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteParcel(parcel.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* 수정 모달 */}
      {currentParcel && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>기존 택배 정보 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <div className="mb-3">
                <label className="form-label">운송장 번호</label>
                <input
                  type="text"
                  className="form-control"
                  name="tracking_number"
                  value={currentParcel.tracking_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">보내는 사람</label>
                <input
                  type="text"
                  className="form-control"
                  name="sender_name"
                  value={currentParcel.sender_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">받는 사람</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient_name"
                  value={currentParcel.recipient_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">주소</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient_address"
                  value={currentParcel.recipient_address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">상태</label>
                <select
                  className="form-select"
                  name="status"
                  value={currentParcel.status}
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
                  value={currentParcel.cost}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              취소
            </Button>
            <Button variant="danger" onClick={saveChanges}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* 추가 모달 */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
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
          <Button variant="secondary" onClick={handleCloseAddModal}>
            취소
          </Button>
          <Button variant="danger" onClick={addParcel}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
