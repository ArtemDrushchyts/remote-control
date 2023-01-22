import { WebSocket, createWebSocketStream } from 'ws';
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const handleCommands = async (ws: WebSocket) => {
    const wsStream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});

    wsStream.on("data", async (data: Buffer) => {
        try {
            const [cmd, ...args] = data.toString().split(' ');
            const [offset] = args;
            switch(cmd) {
                case 'mouse_up':
                    await mouse.move(up(+offset));
                    wsStream.write(`mouse_up_${offset}`)
                    break;
                case 'mouse_down':
                    await mouse.move(down(+offset))
                    wsStream.write(`mouse_down_${offset}`)
                    break;
                case 'mouse_left':
                    await mouse.move(left(+offset))
                    wsStream.write(`mouse_left_${offset}`)
                    break;
                case 'mouse_right':
                    await mouse.move(right(+offset))
                    wsStream.write(`mouse_right_${offset}`)
                    break;
                case 'mouse_position':
                    console.log('mouse_position')
                    break;
                case 'draw_circle':
                    console.log('draw_circle')
                    break;
                case 'draw_rectangle':
                    console.log('draw_rectangle')
                    break;
                case 'draw_square':
                    console.log('draw_square')
                    break;
                case 'prnt_scrn':
                    console.log('prnt_scrn')
                    break;
                default: 
                    console.log(cmd)
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