# LMD-EXPRESSION

Gives features to evaluate simple mathematical expressions like "3*18-4*2".

This package can be used from JavaScript client side applications and NodeJS applications. 

## Installation

> npm i lmd-expression

## Using from NodeJS applications

> const Computer = require("lmd-expression").default;
>
> const computer = new Computer();<br>
> const result = computer.compute("3*18-4*2");
> 
> console.log(result);

## Using from ES6 application

> import Computer from "./expression-computer.js";
>
> const computer = new Computer();
> const result = computer.compute("3*18-4*2");
>
> console.log(result);