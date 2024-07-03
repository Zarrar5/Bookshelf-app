import React from 'react';
import { useToast, Tr, Td, IconButton } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';

const BASE_URL = "http://127.0.0.1:5000/";

const BookSlot = ({ book, setBooks }) => {
  const toast = useToast();

  const handleDeleteBook = async () => {
    try {
      const res = await fetch(BASE_URL + "delete_book/" + book.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      toast({
        status: "success",
        title: "Success",
        description: "Book deleted ",
        duration: 2500,
        position: "top-center",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
        duration: 3500,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <Tr>
      <Td>{book.title}</Td>
      <Td>{book.author}</Td>
      <Td>{book.genre}</Td>
      <Td>{book.notes}</Td>
      <Td>{book.rating}</Td>
      <Td>
        <EditModal book={book} setBooks={setBooks} />
        <IconButton
          variant='ghost'
          colorScheme='red'
          size={"sm"}
          aria-label='Delete book'
          icon={<BiTrash size={25} />}
          onClick={handleDeleteBook}
        />
      </Td>
    </Tr>
  );
};

export default BookSlot;
