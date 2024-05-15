// way of export
export function add(x: number, y: number): number {
    return x + y;
}

export function subtract(x: number, y: number): number {
    return x - y;
}

// way of import
import { add } from "./math"
add(1, 2)

// ================================================================
// ================================================================
// ================================================================

// way of export default
export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}

// way of import for default export
import Calculator from './Calculator';
const calc = new Calculator();
console.log(calc.add(10, 5));

