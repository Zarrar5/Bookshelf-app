import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import { EditIcon } from '@chakra-ui/icons';
const BASE_URL = "http://127.0.0.1:5000/";

const EditModal = ({ setBooks, book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    notes: book.notes,
    rating: book.rating,
  });
  const toast = useToast();

  const handleEditBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}update_book/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? data : b))
      );
      toast({
        status: "success",
        title: "Success",
        description: "Book updated successfully.",
        duration: 2000,
        position: "top-center",
      });
      onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="blue"
        aria-label="Edit Book"
        size={"sm"}
        icon={<EditIcon w={6} h={6}/>}
      />
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditBook}>
          <ModalContent>

            <ModalHeader>Edit Book</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Book Title"
                    value={inputs.title}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Author</FormLabel>
                  <Input
                    placeholder="Author"
                    value={inputs.author}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, author: e.target.value }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Genre</FormLabel>
                  <Input
                    placeholder="Genre"
                    value={inputs.genre}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, genre: e.target.value }))
                    }
                  />
                </FormControl>
              </Flex>
              <FormControl mt={4}>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  resize={"none"}
                  placeholder="Notes"
                  value={inputs.notes}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  placeholder="Rating"
                  value={inputs.rating}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, rating: e.target.value }))
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
                Edit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
