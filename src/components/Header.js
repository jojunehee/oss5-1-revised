import React from 'react';
import backgroundImage from '../img/banner.png';

function Header({ handleShowAddModal }) {
  return (
    <div
      className="container-fluid text-white text-center py-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        <p className="lead fw-bold" style={{ textShadow: '4px 4px 10px rgba(1, 1, 1, 1)' }}>
          쉽고 빠르게 택배를 관리하세요.
        </p>
        <button type="button" className="btn btn-danger mb-3 btn-lg" onClick={handleShowAddModal}>
          새 택배 추가
        </button>
      </div>
    </div>
  );
}

export default Header;
