import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import * as dotenv from "dotenv";

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT;
const WS_PORT = Number(process.env.WS_PORT);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({port: WS_PORT})

console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on('connection', () => {
    console.log('Connect')
})

process.on("SIGNINT", () => {
    wsServer.close();
    process.exit(0);
})
