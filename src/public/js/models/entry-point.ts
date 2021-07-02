import { View } from "../views/view";

export interface EntryPoint
{
    display(view: View): void;
}