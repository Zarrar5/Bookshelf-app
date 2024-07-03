import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalOverlay,  useDisclosure,  ModalFooter,  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { BiAddToQueue } from "react-icons/bi";

const BASE_URL = "http://127.0.0.1:5000/";

const CreateBookModal = ({ setBooks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    genre: "",
    notes: "",
    rating: ""
  });
  const toast = useToast();

  const handleCreateBook = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "create_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "success",
        title: "Yay",
        description: "Book created successfully",
        duration: 2000,
        position: "top-center",
      });
      onClose();
      setBooks((prevBooks) => [...prevBooks, data]);
      setInputs({
        title: "",
        author: "",
        genre: "",
        notes: "",
        rating: "",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Error Occurred",
        description: error.message,
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
      <BiAddToQueue size={25} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateBook}>
          <ModalContent>
            <ModalHeader>My New Books</ModalHeader>
            <ModalCloseButton />
         
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    value={inputs.title}
                    onChange={(e) =>
                      setInputs({ ...inputs, title: e.target.value })}
                  />
                </FormControl>

              </Flex>
              <FormControl>
                <FormLabel>Author</FormLabel>
                <Input
                  placeholder="Author"
                  value={inputs.author}
                  onChange={(e) =>
                    setInputs({ ...inputs, author: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  placeholder="Genre"
                  value={inputs.genre}
                  onChange={(e) =>
                    setInputs({ ...inputs, genre: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  resize={"none"}
                  placeholder="Notes"
                  value={inputs.notes}
                  onChange={(e) =>
                    setInputs({ ...inputs, notes: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  placeholder="Rating"
                  value={inputs.rating}
                  onChange={(e) =>
                    setInputs({ ...inputs, rating: e.target.value })
                  }
                />
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateBookModal;
