import React from 'react';
import {
  Container,
  Box,
  Flex,
  Text,
  useColorMode,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import CreateBookModal from './CreateBookModal';

const NavBar = ({ setBooks }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Container maxW={"900px"}>
        <Box
          px={4}
          my={4}
          borderRadius={5}
          bg={colorMode === "light" ? "yellow.200" : "blue.900"}
        >
          <Flex h='16' alignItems={"center"} justifyContent={"space-between"}>
            <Flex
              alignItems={"center"}
              gap={4}
            >
              <Popover>
                <PopoverTrigger>
                  <Button>
                    <InfoOutlineIcon w={6} h={6} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>What should I do?</PopoverHeader>
                  <PopoverBody>Input the books you have read!</PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <Flex
              flex="1"
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
              display={{ base: "none", sm: "flex" }}
            >
              <Text
                fontSize={{ base: "2xl", md: "45px" }}
                fontWeight={"bold"}
                letterSpacing={"2px"}
                textTransform={"uppercase"}
              >
                <Text
                  as={"span"}
                  fontWeight={"bold"}
                  bgGradient={'linear(to-b, #964B00, #FF0080, yellow.400)'}
                  bgClip={"text"}
                >
                  Here is your library
                </Text>
              </Text>
            </Flex>
            <Flex gap={3} alignItems={"center"}>
              <CreateBookModal setBooks={setBooks} />
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </div>
  );
}

export default NavBar;
