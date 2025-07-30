import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import Chatbox from "./page/Chatbox";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {}
        }
    }
})

const system = createSystem(defaultConfig, config);

function App() {
    return (
        <ChakraProvider value={system}>
            <Chatbox />
        </ChakraProvider>
    )
}

export default App;
