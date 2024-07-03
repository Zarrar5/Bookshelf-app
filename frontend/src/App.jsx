import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react'; // Import necessary Chakra UI components
import NavBar from './NavBar';  // Import NavBar component
import BookGrid from './BookGrid';

const BASE_URL = "http://127.0.0.1:5000/";

const App = () => {
  const [books, setBooks] = useState([]);

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
  }, []);

  return (
    <ChakraProvider>
      <Box maxW={"1300px"} my={5} mx={"auto"} textAlign={"center"}>
        <Text
          fontSize={{ base: "3xl", md: "50px" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          mb={"8"}>
          <Text
          fontWeight={"bold"}
           bgGradient={'linear(to-r, #964B00, #FF0080, yellow.400)'}
           bgClip={"text"}>

          Bookshelf
        </Text>
        </Text>
        <NavBar setBooks={setBooks}/>
        <BookGrid books={books} setBooks={setBooks} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
