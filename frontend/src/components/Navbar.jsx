import { Box, Button, Container, Flex, Text, useColorMode } from "@chakra-ui/react"
import { SiMoonrepo } from "react-icons/si";
import { ImSun } from "react-icons/im";
import CreateUserModal from "./CreateUserModal";



const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={"900px"}>
        <Box 
        px={4}
        my={4}
        borderRadius={5}
        bg={"gray.500"}
        >
            <Flex h="16"
            alignItems={"center"}
            justifyContent={"space-between"}
            >
                <Flex 
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
                display={{base:"none", sm:"flex"}}
                >
                    <img src="/logo.png" alt="logo" width={80} height={50}/>
                    <Text color={"white"} fontSize={"1.8rem"}>Media Rater</Text>
                </Flex>
                <Flex gap={3} alignItems={"center"}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <SiMoonrepo /> : <ImSun  size={20}/>}
                    </Button>
                    <CreateUserModal />
                </Flex>
            </Flex>
        </Box>
    </Container>
      

  )
}

export default Navbar
