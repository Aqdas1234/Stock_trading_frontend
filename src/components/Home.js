import React, { useState } from 'react';
import UseStocks from './UseStocks';
import StockChart from './StockChart';
import BuySellModal from './BuySellModal';
import { Button, Card, Container, Row, Col, } from 'react-bootstrap';
import '../assets/style.css';
import CustomPagination from './CustomPagination';
import stockImage from '../assets/stockimg.jpeg';

const Home = () => {
  const [page, setPage] = useState(1);
  const { stocks, loading, error, count } = UseStocks(page);
  const [selectedStock, setSelectedStock] = useState(null);
  const [filter, setFilter] = useState('day');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleDetails = (stock) => setSelectedStock(stock);
  const handleBuySell = (type) => {
    setActionType(type);
    setShowModal(true);
  };


  const totalPages = Math.ceil(count / 15);


  return (
    
    <div className="d-flex flex-column min-vh-100">
            <Container className="flex-grow-1 mb-4">
            
            <section id="blogs" className="mt-5">
                <div class="container py-5">
          <div class="row align-items-center">
            
      <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="fw-bold" style={{ fontSize: '4rem', lineHeight: '1.2' , color:'#003366'}}>
            Your Trading <br />
            Platform for <br />
            Every Day
          </h1>
          <p className="lead mt-3" style={{ fontSize: '1.5rem',color :'#003366' }}>
            Invest, trade, and grow with ease.
          </p>
        </div>
            <div class="col-md-6 position-relative text-center">
              <img src={stockImage} alt="User"  className="img-fluid "
               style={{
                  height: '350px',
                  width: '600px',
                  borderRadius: '12px', 
                  objectFit: 'cover'
                }}
                />
                        
            </div>
          </div>
        </div>
        </section>

        {/* Stocks Section */}
        <section id="stocks">
          <h2 className="mt-5 mb-5 fw-bold" style={{color:'#003366', fontSize:'2.5rem'}}>Available Stocks</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error.message}</p>}

          {selectedStock ? (
              <>
  
  <Row className="align-items-start">
    <Col md={4}>
      <Card
        onClick={() => handleDetails(selectedStock)}
        style={{
          background: '#b7d8faff',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          height: '250px',
          marginTop: '100px',
        }}
      >
        <div
          style={{
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={selectedStock.icon}
            alt={selectedStock.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        <div style={{ height: '20%', textAlign: 'center', padding: '5px 10px' }}>
          <div className="text-muted fw-bold">{selectedStock.name}</div>
          <div className="text-success fw-bold">Price: ${selectedStock.current_price}</div>
        </div>
      </Card>

      {/* Buttons below card */}
      <div className="mt-3 d-flex gap-2">
        <Button variant="success" onClick={() => handleBuySell("BUY")}>Buy</Button>
        <Button variant="danger" onClick={() => handleBuySell("SELL")}>Sell</Button>
        <Button variant="secondary" onClick={() => setSelectedStock(null)}>Back</Button>
      </div>
    </Col>

    <Col md={8}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>
          {selectedStock.name} ({selectedStock.symbol.toUpperCase()}) - Price History
        </h4>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-select w-auto"
        >
          <option value="hour">Last Hour</option>
          <option value="day">Today</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <StockChart stock={selectedStock} filter={filter} />
    </Col>
  </Row>

  {/* Other stock cards below */}
  <h3 className="mt-5 mb-3" style={{ color: '#003366' }}>Explore More Stocks</h3>
  <Row className="g-4">
    {stocks.filter(stock => stock.id !== selectedStock.id).map(stock => (
      <Col key={stock.id} md={3}>
        <Card
          onClick={() => handleDetails(stock)}
          style={{
            background: '#b7d8faff',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            height: '250px',
          }}
        >
          <div
            style={{
              height: '80%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={stock.icon}
              alt={stock.name}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ height: '20%', textAlign: 'center', padding: '5px 10px' }}>
            <div className="text-muted fw-bold">{stock.name}</div>
            <div className="text-success fw-bold">Price: ${stock.current_price}</div>
          </div>
        </Card>
      </Col>
    ))}
  </Row>
  <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
</>

          ) : (
            <>
              <Row className="g-4">
                {stocks.map((stock, index) => (
                  <Col 
                    key={stock.id} 
                    md={4} 
                   
                  >
                    <Card 
                      onClick={() => handleDetails(stock)} 
                      style={{ 
                       background:'#b7d8faff',
                        cursor: 'pointer',
                        height: '250px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={stock.icon} 
                          alt={stock.name} 
                          style={{ 
                            maxHeight: '100%', 
                            maxWidth: '100%', 
                            objectFit: 'contain' 
                          }} 
                        />
                      </div>
                      <div style={{ height: '10%', textAlign: 'center', padding: '5px 10px' }}>
                        <div className="text-muted fw-bold">{stock.name}</div>
                        <div className="text-success fw-bold"> Price: ${stock.current_price}</div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
                <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
            </>
          )}
        </section>
      </Container>

      {showModal && selectedStock && (
        <BuySellModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          stockSymbol={selectedStock.symbol}
          transactionType={actionType}
        />
      )}
    </div>
  );
};

export default Home;
