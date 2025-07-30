import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ page, totalPages, setPage }) => {
  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      />
      {[...Array(totalPages)].map((_, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={page === idx + 1}
          onClick={() => setPage(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
