import { Box, Textarea, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const Chatbox = () => {
    const [prompt, setPrompt] = useState("");

    return (
        <Box
            display="flex"
            flexDirection="column"
            h="100vh"
            p="2rem 10rem"
        >
            <Text
                flex="1"
                fontSize="5xl"
                fontWeight="bold"
                alignContent="center"
                textAlign="center"
            >
                Hello User!!
            </Text>

            <Box
                display="flex"
                spaceX={4}
                alignItems="center"
                borderColor={"whiteAlpha.500"}
                borderWidth={2}
                borderRadius="2xl"
                p={2}
                pr={8}
            >
                <Textarea
                    placeholder="Type your query here..."
                    variant="outline"
                    size="xl"
                    colorPalette="whiteAlpha"
                    _placeholder={{ color: "whiteAlpha.700" }}
                    resize="none"
                    autoresize
                    maxH="20vh"
                    border="none"
                    _focus={{
                        outline: "none"
                    }}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <IconButton
                    aria-label="Send message"
                    variant="outline"
                    colorScheme="teal"
                    color={"whiteAlpha.800"}
                    _hover={{ bg: "whiteAlpha.200" }}
                    bgColor="transparent"
                >
                    <IoSend />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Chatbox;
