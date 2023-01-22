import { WebSocket, createWebSocketStream } from 'ws';
import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import { drawCircle } from './drawCircle';
import { drawSquare } from './drawSquare';
import { drawRectangle } from './drawRectangle';
import { printScreen } from './printScreen';

export const handleCommands = async (ws: WebSocket) => {
    const wsStream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});

    wsStream.on("data", async (data: Buffer) => {
        try {
            const [cmd, ...args] = data.toString().split(' ');
            const [arg1, arg2] = args;
            const { x, y } = await mouse.getPosition();
            switch(cmd) {
                case 'mouse_up':
                    await mouse.move(up(+arg1));
                    wsStream.write(`mouse_up_${arg1}`)
                    break;
                case 'mouse_down':
                    await mouse.move(down(+arg1))
                    wsStream.write(`mouse_down_${arg1}`)
                    break;
                case 'mouse_left':
                    await mouse.move(left(+arg1))
                    wsStream.write(`mouse_left_${arg1}`)
                    break;
                case 'mouse_right':
                    await mouse.move(right(+arg1))
                    wsStream.write(`mouse_right_${arg1}`)
                    break;
                case 'mouse_position':
                    wsStream.write(`mouse_position ${x}px,${y}px`)
                    break;
                case 'draw_circle':
                    drawCircle(+arg1);
                    wsStream.write('draw_circle')
                    break;
                case 'draw_rectangle':
                    drawRectangle(+arg1, +arg2)
                    wsStream.write('draw_rectangle')
                    break;
                case 'draw_square':
                    drawSquare(+arg1)
                    wsStream.write('draw_square')
                    break;
                case 'prnt_scrn':
                    const buffer:string = await printScreen()
                    wsStream.write(`prnt_scrn ${buffer}`)
                    break;
                default: 
                    console.log(`Command ${cmd} not found`)
            }
        } catch (err) {
            console.log(err);
        }
    })

    wsStream.on('close', () => {
        wsStream.destroy();
        console.log('WebSocket connection closed')
    })
}