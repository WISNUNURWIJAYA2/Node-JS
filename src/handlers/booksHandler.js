const { nanoid } = require('nanoid');
const books = require('../models/BOOKS');

// Handler untuk menambah buku
const addBookHandler = (request, h) => {
  // Validasi payload ada
  if (!request.payload) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Validasi input
  if (!name || typeof name !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (typeof year !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. year harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof author !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. author harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof summary !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. summary harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof publisher !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. publisher harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof pageCount !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. pageCount harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof readPage !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof reading !== 'boolean') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. reading harus bertipe boolean',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Handler untuk mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  // Filter berdasarkan name (case insensitive)
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter berdasarkan status reading
  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === !!Number(reading)
    );
  }

  // Filter berdasarkan status finished
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === !!Number(finished)
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// Handler untuk mendapatkan buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler untuk mengupdate buku
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  // Validasi payload ada
  if (!request.payload) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Validasi input
  if (!name || typeof name !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (typeof year !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. year harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof author !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. author harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof summary !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. summary harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof publisher !== 'string') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. publisher harus bertipe string',
    });
    response.code(400);
    return response;
  }

  if (typeof pageCount !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. pageCount harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof readPage !== 'number') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage harus bertipe number',
    });
    response.code(400);
    return response;
  }

  if (typeof reading !== 'boolean') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. reading harus bertipe boolean',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler untuk menghapus buku
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};