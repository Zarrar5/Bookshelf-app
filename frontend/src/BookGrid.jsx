import React, { useEffect } from 'react';
import { Grid, Table, Thead, Tbody, Tr, Th, Flex } from '@chakra-ui/react';
import BookSlot from './BookSlot';

const BASE_URL = "http://127.0.0.1:5000/";

const BookGrid = ({ books, setBooks }) => {
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(BASE_URL + "books");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getBooks();
  }, [setBooks]);

  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Genre</Th>
            <Th>Notes</Th>
            <Th>Rating</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <BookSlot key={book.id} book={book} setBooks={setBooks} />
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default BookGrid;
