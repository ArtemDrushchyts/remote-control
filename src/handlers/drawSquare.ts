import { mouse, Button, left, down, right, up } from "@nut-tree/nut-js";
import { defaultMouseSpeed } from '../constants/constants';

export const drawSquare = async (width: number) => {
    await mouse.pressButton(Button.LEFT);
    mouse.config.mouseSpeed = defaultMouseSpeed;
    await mouse.drag(left(width));
    await mouse.drag(down(width));
    await mouse.drag(right(width));
    await mouse.drag(up(width));
    await mouse.releaseButton(Button.LEFT);
}