import { useEffect, useState } from 'react';

interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  const totalPages = Math.ceil(totalBooks / pageSize);

  useEffect(() => {
    fetch(`http://localhost:5169/api/books?pageNum=${pageNum}&pageSize=${pageSize}&sortOrder=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data.books);
        setTotalBooks(data.totalBooks);
      })
      .catch(err => console.error('Error fetching books:', err));
  }, [pageNum, pageSize, sortOrder]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Online Bookstore</h1>
      <div className="d-flex gap-3 mb-3">
        <div>
          <label className="me-2">Sort by Title:</label>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              setPageNum(1);
            }}
          >
            {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>
        <div>
          <label className="me-2">Results per page:</label>
          <select
            className="form-select form-select-sm d-inline-block w-auto"
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPageNum(1); }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={16}>All</option>
          </select>
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPageNum(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookList;
