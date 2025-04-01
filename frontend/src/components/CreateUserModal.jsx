import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiSolidBookAdd } from "react-icons/bi";


const CreateUserModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <> 
    <Button onClick={onOpen}>
      <BiSolidBookAdd size={22}/>
    </Button>

    <Modal 
    isOpen={isOpen}
    onClose={onClose}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Entry</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Add name'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tags</FormLabel>
                        <Input placeholder='Add tags'/>
                    </FormControl>
                </Flex>
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        resize={"none"}
                        overflow={"hidden"}
                        placeholder='Add a description...'
                    />
                </FormControl>
                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value="game">Game</Radio>
                        <Radio value="movie">Movie</Radio>
                        <Radio value="book">Book</Radio>
                        <Radio value="other">Other</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3}>Add</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </ModalContent>

    </Modal>
    </>
  )
}

export default CreateUserModal
