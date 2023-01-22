import { mouse, Button, left, down, right, up } from "@nut-tree/nut-js";
import { defaultMouseSpeed } from '../constants/constants';

export const drawRectangle = async (width: number, height: number) => {
    await mouse.pressButton(Button.LEFT);
    mouse.config.mouseSpeed = defaultMouseSpeed;
    await mouse.drag(left(width));
    await mouse.drag(down(height));
    await mouse.drag(right(width));
    await mouse.drag(up(height));
    await mouse.releaseButton(Button.LEFT);
}