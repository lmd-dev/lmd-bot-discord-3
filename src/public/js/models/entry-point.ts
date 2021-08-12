import { View } from "../views/view";

export interface EntryPoint
{
    initView(view: View): void;
}