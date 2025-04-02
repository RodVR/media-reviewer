import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"

import { useState } from "react"

import { BiEdit } from "react-icons/bi";
import { BASE_URL } from "../App";



function EditModal({setUsers, user}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: user.name,
        tags: user.tags,
        description: user.description
    })
    const toast = useToast()

    const handleEdit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const rest = await fetch(BASE_URL + "/media/" + user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })
            const data = await rest.json()
            if(!rest.ok){
                throw new Error(data.error)
            }
            setUsers((prevUsers) => prevUsers.map((u) => u.id === user.id ? data : u))
            toast({
                status: "success",
                title: "Success",
                description: "Updated successfully!",
                duration: 2000,
                position: "top"
            })
            onClose()
        } catch (error){
            toast({
                status: "error",
                title: "An error occured.",
                description: error.message,
                duration: 4000,
                position: "top"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <IconButton
                onClick={onOpen}
                variant="ghost"
                colorScheme="blue"
                aria-label="See menu"
                size={"sm"}
                icon={<BiEdit size={20} />}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEdit}>
                    <ModalContent>
                        <ModalHeader>Entry</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input 
                                        placeholder="Add name"
                                        value={inputs.name}
                                        onChange={(e) => setInputs((prev) => ({...prev, name: e.target.value}))}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Tags</FormLabel>
                                    <Input 
                                        placeholder="Add tags"
                                        value={inputs.tags}
                                        onChange={(e) => setInputs((prev) => ({...prev, tags: e.target.value}))}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea 
                                    resize={"none"}
                                    overflow={"hidden"}
                                    placeholder="Add a description..."
                                    value={inputs.description}
                                    onChange={(e) => setInputs((prev) => ({...prev, description: e.target.value}))}
                                />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading} isDisabled={!inputs.name.trim() || !inputs.description.trim()}>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                    </form>
            </Modal>
        </>
    )
}



export default EditModal
