import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import * as dotenv from "dotenv";
import { handleCommands } from './src/handlers/handleCommands';

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT);
const WS_PORT = Number(process.env.WS_PORT);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({port: WS_PORT})

console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on('connection', handleCommands);

process.on("SIGNINT", () => {
    wsServer.close();
    process.exit(0);
})
