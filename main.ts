import { parse } from 'https://deno.land/std/flags/mod.ts';

const args = parse(Deno.args);
console.log(args);

const a = args.a; // -a 4
const b = args.b;
const c = args.c; 

console.log(`a: ${a}, b: ${b}, c: ${c}`);

let x, x1, x2: number;

const diskr = b*b - 4*a*c;

let encoder;
let f;

if(args.file) {
    encoder = new TextEncoder();
    f = await Deno.open(args.fname, {write: true, create: true});
}
// 0x^2 + bx + c = 0 => x = -c/b; b == 0, c = 0
if(!a || a == 0) {
    if( !b || (b == 0 && c !== 0 ) ) {
        console.log("Invalid equation");
    }
    else {
        x = -c/b;
        console.log(`One real solution found: x = ${x}`);
        if(f && encoder ) {
            const data = encoder.encode(`One real solution found: x = ${x}`);
            Deno.writeAll(f, data);
        }
    }
}
else {
    if (diskr == 0) {
        x = -b/(2*a);
        console.log(`One real solution found: x = ${x}`);
        if(f && encoder ) {
            const data = encoder.encode(`One real solution found: x = ${x}`);
            Deno.writeAll(f, data);
        }
    }
    else if (diskr < 0) {
        console.log("No real solutions are found");
    }
    else {
        x1 = (-b - Math.sqrt(b*b -4*a*c))/(2*a);
        x2 = (-b + Math.sqrt(b*b -4*a*c))/(2*a);
        console.log(`Two real solutions found: x1 = ${x1}, x2 = ${x2}`);
        if(f && encoder ) {
            const data = encoder.encode(`Two real solutions found: x1 = ${x1}, x2 = ${x2}`);
            Deno.writeAll(f, data); 
        }
    }
}