import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { FiTrash2 } from "react-icons/fi";
import EditModal from './EditModal';


const UserCard = ({user}) => {
  return (
    <Card>
        <CardHeader>
            <Flex >
                <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                    <Avatar src='https://th.bing.com/th/id/OIP.G8QLLMuPtRnMLNLRKaEVxwHaH2?rs=1&pid=ImgDetMain'/>
                    <Box>
                        <Heading size="sm">{user.name}</Heading>
                        <Text>{user.tags}</Text>
                    </Box>
                </Flex>
                <Flex>
                    <EditModal />
                    <IconButton
                    variant="ghost"
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See menu'
                    icon={<FiTrash2 size={20}/>} 
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
