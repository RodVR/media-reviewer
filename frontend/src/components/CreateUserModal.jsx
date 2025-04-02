import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiSolidBookAdd } from "react-icons/bi";
import { BASE_URL } from '../App';


const CreateUserModal = ({ setUsers }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        tags:"",
        description:"",
        type:""

    })

    const toast = useToast()

    const handleCreateReview = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(BASE_URL + "/media", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error)
            }

            toast({
                status: "success",
                title: "🌟",
                description: "Review posted successfully!",
                duration: "2000",
                position: "top"
            })

            onClose()
            setUsers((prevUsers) => [...prevUsers, data])

            setInputs({
                name: "",
                tags: "",
                description: "",
                type: ""
            })

        } catch (error) {
            toast({
                status: "error",
                title: "Something went wrong!",
                description: error.message,
                duration: "3000",
                position: "top"
            })
        } finally {
            setIsLoading(false)

        }
    }

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
        <form onSubmit={handleCreateReview}>
        <ModalContent>
            <ModalHeader>Entry</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Add name'
                        value={inputs.name}
                        onChange={(e) => setInputs({...inputs, name: e.target.value})}
                        />     
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tags</FormLabel>
                        <Input placeholder='Add tags'
                             value={inputs.tags}
                             onChange={(e) => setInputs({...inputs, tags: e.target.value})} 
                        />
                    </FormControl>
                </Flex>
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        resize={"none"}
                        overflow={"hidden"}
                        placeholder='Add a description...'
                        value={inputs.description}
                        onChange={(e) => setInputs({...inputs, description: e.target.value})}
                    />
                </FormControl>
                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value="game"
                         onChange={(e) => setInputs({...inputs, type: e.target.value})}
                        >Game</Radio>
                        <Radio value="movie"
                         onChange={(e) => setInputs({...inputs, type: e.target.value})}
                        >Movie</Radio>
                        <Radio value="book"
                         onChange={(e) => setInputs({...inputs, type: e.target.value})}
                        >Book</Radio>
                        <Radio value="other"
                         onChange={(e) => setInputs({...inputs, type: e.target.value})}
                        >Other</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Add</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </ModalContent>
        </form>

    </Modal>
    </>
  )
}

export default CreateUserModal
