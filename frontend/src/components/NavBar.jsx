import { Container, Flex, Text, HStack, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import {LuSun} from 'react-icons/lu';
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="1140px" px={4} >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: 'column', sm: 'row' }}
      >
      <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
      >


        <Link to="/">Product Store 🛒</Link>
      </Text>
     

        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
            <Button>
              <FaPlusSquare />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>{colorMode==="light"? <IoMoon/>:<LuSun size="20"/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar