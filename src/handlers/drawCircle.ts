import { mouse, Button, Point, straightTo } from "@nut-tree/nut-js";
import { defaultMouseSpeed } from '../constants/constants';

export const drawCircle = async (radius: number) => {
    mouse.config.mouseSpeed = defaultMouseSpeed;
    let position = await mouse.getPosition();
    await mouse.pressButton(Button.LEFT);
    for(let i = 360; i >= 0; i--) {
        //convert degrees to radians
        const radians = i * Math.PI / 180; 
        const x = radius * Math.cos(radians) + position.x - radius;
        const y = radius * Math.sin(radians) + position.y;
        const target = new Point(x, y);
        await mouse.move(straightTo(target));
    }
    await mouse.releaseButton(Button.LEFT);
}