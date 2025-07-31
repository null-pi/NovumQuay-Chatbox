import { Flex, Box } from "@chakra-ui/react";

interface SenderChatBubbleProps {
    children: React.ReactNode;
}

const SenderChatBubble = ({ children }: SenderChatBubbleProps) => {
    return (
        <Flex
            alignSelf="flex-end"
            direction="row-reverse"
        >
            <Box
                bg="gray.600"
                color="whiteAlpha.800"
                px={4}
                py={2}
                borderRadius="xl"
                borderTopRightRadius="none"
            >
                {children}
            </Box>
        </Flex>
    )
}

export default SenderChatBubble;