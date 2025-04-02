import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import { FiTrash2 } from "react-icons/fi";
import EditModal from './EditModal';
import { BASE_URL } from '../App';


const UserCard = ({user, setUsers}) => {
    const toast = useToast()
    const handleDelete = async () => {
        try{
            const res = await fetch(BASE_URL + "/media/" + user.id, {
                method:"DELETE"
            })
            const data = await res.json()

            if(!res.ok){
                throw new Error (data.error)
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
            toast({
                title: "Success",
                description:"Review deleted successfully!",
                status: "success",
                duration: "2000",
                position: "top",
                isClosable: true
            })

        } catch (error) {
            toast({
                title:"An error occurred",
                description: "error.message",
                status:"error",
                duration:"3000",
                position:"top",
                isClosable:true
            })
        }
    }
  return (
    <Card>
        <CardHeader>
            <Flex >
                <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                    <Avatar src={user.imgUrl}/>
                    <Box>
                        <Heading size="sm">{user.name}</Heading>
                        <Text>{user.tags}</Text>
                    </Box>
                </Flex>
                <Flex>
                    <EditModal setUsers={setUsers} user={user}/>
                    <IconButton
                    variant="ghost"
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See menu'
                    icon={<FiTrash2 size={20}/>} 
                    onClick={handleDelete}
                    />
                </Flex>
            </Flex>
        </CardHeader>

        <CardBody>
            <Text>
                {user.description}
            </Text>
        </CardBody>
    </Card>
  )
}

export default UserCard
