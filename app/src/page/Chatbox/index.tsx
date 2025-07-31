import { Box, Textarea, Text, IconButton, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdCancelScheduleSend } from "react-icons/md";
import ChatBubble from "../../component/ChatBubble";


interface Message {
    providedBy: 'user' | 'system',
    messageType: 'text' | 'image',
    content: string
}


const Chatbox = () => {
    const [prompt, setPrompt] = useState<Message>({
        providedBy: 'user',
        messageType: 'text',
        content: ''
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const clientId = "user123";
    const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws";

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectIntervalRef = useRef<number | null>(null);

    const connectWebSocket = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }

        wsRef.current = new WebSocket(`${WS_URL}/${clientId}`);

        wsRef.current.onopen = () => {
            console.log("WebSocket connection established");
            setIsConnected(true);
            if (reconnectIntervalRef.current) {
                clearInterval(reconnectIntervalRef.current);
                reconnectIntervalRef.current = null;
            }
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message received:", data);

            setMessages((prevMessages) => [
                ...prevMessages,
                { ...data }
            ]);
        };

        wsRef.current.onclose = (event) => {
            console.log("WebSocket connection closed");
            setIsConnected(false);
            if (event.code !== 1000 && !reconnectIntervalRef.current) {
                reconnectIntervalRef.current = window.setInterval(() => {
                    if (wsRef.current && wsRef.current.readyState === WebSocket.CLOSED) {
                        console.log("Attempting to reconnect...");
                        connectWebSocket();
                    }
                }, 5000);
            }
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            wsRef.current?.close();
        };
    }, [clientId]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectIntervalRef.current) {
                clearInterval(reconnectIntervalRef.current);
            }
        };
    }, [connectWebSocket]);

    const sendMessage = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && prompt.content.trim()) {
            console.log("Sending message:", [...messages, prompt]);

            wsRef.current.send(JSON.stringify([...messages, prompt]));

            setPrompt({
                providedBy: 'user',
                messageType: 'text',
                content: ''
            });
        } else {
            console.error("WebSocket is not open or message is empty");
            // Optionally, you can show an error message to the user
            alert("Unable to send message. Please try again later.");
        }
    }

    const handleSendMessage = () => {
        setMessages([...messages, prompt]);
        sendMessage();
    };

    return (
        <Flex
            direction="column"
            h="100vh"
            p="2rem 10rem"
        >
            {
                messages.length === 0 ?
                    <Text
                        flex="1"
                        fontSize="5xl"
                        fontWeight="bold"
                        alignContent="center"
                        textAlign="center"
                    >
                        Hello User!!
                    </Text> :
                    <Box
                        flex="1"
                    >
                        {
                            messages.map((message, index) => (
                                <ChatBubble
                                    key={index}
                                    isSender={message.providedBy === 'user'}
                                >
                                    {message.messageType === 'text' ? (
                                        <Text fontSize="lg">{message.content}</Text>
                                    ) : (
                                        <img src={message.content} alt="Chat Image" style={{ maxWidth: '100%' }} />
                                    )}
                                </ChatBubble>
                            ))
                        }
                    </Box>
            }


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
                    value={prompt.content}
                    onChange={(e) => setPrompt({ ...prompt, content: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <IconButton
                    aria-label="Send message"
                    variant="outline"
                    colorScheme="teal"
                    color={"whiteAlpha.800"}
                    _hover={{ bg: "whiteAlpha.200" }}
                    bgColor="transparent"
                    onClick={handleSendMessage}
                >
                    {isConnected ? <IoSend /> : <MdCancelScheduleSend />}
                </IconButton>
            </Box>
        </Flex>
    );
};

export default Chatbox;
