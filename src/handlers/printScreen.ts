import { mouse, screen, Region } from "@nut-tree/nut-js";
import Jimp from "jimp"

export const printScreen = async () => {
    try {
        const position = await mouse.getPosition()
        const region = new Region(position.x - 100, position.y - 100, 200, 200);
        const imgRegion = await (await screen.grabRegion(region)).toRGB();
        const img = new Jimp(imgRegion);
        const base64 = await (await img.getBufferAsync(Jimp.MIME_PNG)).toString('base64');
        return base64;
    } catch (err) {
        console.log('Image error: not enough space for a screenshot.');
    }
}