import { Box } from "@chakra-ui/react"

import SenderChatBubble from "../SenderChatBubble";
import type React from "react";

interface ChatBubbleProps {
    isSender: boolean;
    children: React.ReactNode;
}

const ChatBubble = ({ isSender, children }: ChatBubbleProps) => {
    return (
        <Box
            m={4}
        >
            {
                isSender ?
                    <SenderChatBubble>
                        {children}
                    </SenderChatBubble>
                    :
                    children
            }
        </Box>
    )
}

export default ChatBubble;