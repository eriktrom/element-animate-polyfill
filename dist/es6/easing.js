import { BaseException } from './exceptions';
import { toFloat } from './util';
export class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export const LINEAR = [0, 0, 1, 1];
export const EASE = [.25, .1, .25, 1];
export const EASE_IN = [0.42, 0, 1, 1];
export const EASE_OUT = [0, 0, 0.58, 1];
export const EASE_IN_OUT = [0.42, 0, .58, 1];
const EPSILON = 1.0e-7;
var EASING_REGEX = /cubic-bezier\(\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*\)/i;
export function resolveEasingEquation(name) {
    var coefficients;
    switch (name.toLowerCase()) {
        case 'linear':
            coefficients = LINEAR;
            break;
        case 'ease':
            coefficients = EASE;
            break;
        case 'ease-out':
            coefficients = EASE_OUT;
            break;
        case 'ease-in':
            coefficients = EASE_IN;
            break;
        case 'ease-in-out':
            coefficients = EASE_IN_OUT;
            break;
        default:
            var matches = name.match(EASING_REGEX);
            if (!matches) {
                throw new BaseException('Invalid easing value provided');
            }
            coefficients = [
                toFloat(matches[1]),
                toFloat(matches[2]),
                toFloat(matches[3]),
                toFloat(matches[4])
            ];
            break;
    }
    var curve = new Bezier(coefficients);
    return curve.solve.bind(curve);
}
// Mostly inspired by
// https://code.google.com/p/chromium/codesearch#chromium/src/ui/gfx/geometry/cubic_bezier.cc
class Bezier {
    constructor([p1x, p1y, p2x, p2y]) {
        this.cx_ = 3.0 * p1x;
        this.bx_ = 3.0 * (p2x - p1x) - this.cx_;
        this.ax_ = 1.0 - this.cx_ - this.bx_;
        this.cy_ = 3.0 * p1y;
        this.by_ = 3.0 * (p2y - p1y) - this.cy_;
        this.ay_ = 1.0 - this.cy_ - this.by_;
    }
    ;
    x(t) {
        return ((this.ax_ * t + this.bx_) * t + this.cx_) * t;
    }
    y(t) {
        return ((this.ay_ * t + this.by_) * t + this.cy_) * t;
    }
    xprime(t) {
        return (3.0 * this.ax_ * t + 2.0 * this.bx_) * t + this.cx_;
    }
    yprime(t) {
        return (3.0 * this.ay_ * t + 2.0 * this.by_) * t + this.cy_;
    }
    solveTgivenX(percentage) {
        // add assert(0 <= percentage && percentage <= 1);
        var t = percentage;
        var x, d;
        // First try a few iterations of Newton's method -- normally very fast.
        for (var i = 0; i < 8; i++) {
            x = this.x(t) - percentage;
            if (Math.abs(x) < EPSILON)
                return t;
            d = this.xprime(t);
            if (Math.abs(d) < EPSILON)
                break;
            t = t - x / d;
        }
        // Fallback to bisection.
        var t0 = 0.0;
        var t1 = 1.0;
        var t = percentage;
        while (t0 < t1) {
            x = this.x(t);
            if (Math.abs(x - percentage) < EPSILON)
                return t;
            if (percentage > x)
                t0 = t;
            else
                t1 = t;
            t = (t1 - t0) * .5 + t0;
        }
        return t;
    }
    solve(percentage) {
        return this.y(this.solveTgivenX(percentage));
    }
}
export function computePercentageFromEasing(percentage, easing) {
    return new Bezier(easing).solve(percentage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWFzaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sY0FBYztPQUNuQyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVE7QUFFOUI7SUFDRSxZQUFtQixDQUFTLEVBQVMsQ0FBUztRQUEzQixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUFHLENBQUM7QUFDcEQsQ0FBQztBQUVELE9BQU8sTUFBTSxNQUFNLEdBQTJDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsT0FBTyxNQUFNLElBQUksR0FBNkMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxPQUFPLE1BQU0sT0FBTyxHQUEwQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlFLE9BQU8sTUFBTSxRQUFRLEdBQXlDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUUsT0FBTyxNQUFNLFdBQVcsR0FBc0MsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUU3RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFFdkIsSUFBSSxZQUFZLEdBQUcsc0ZBQXNGLENBQUM7QUFDMUcsc0NBQXNDLElBQVk7SUFDaEQsSUFBSSxZQUE4QyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsS0FBSyxRQUFRO1lBQ1gsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUN0QixLQUFLLENBQUM7UUFDUixLQUFLLE1BQU07WUFDVCxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUssQ0FBQztRQUNSLEtBQUssVUFBVTtZQUNiLFlBQVksR0FBRyxRQUFRLENBQUM7WUFDeEIsS0FBSyxDQUFDO1FBQ1IsS0FBSyxTQUFTO1lBQ1osWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUN2QixLQUFLLENBQUM7UUFDUixLQUFLLGFBQWE7WUFDaEIsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUMzQixLQUFLLENBQUM7UUFDUjtZQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sSUFBSSxhQUFhLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQ0QsWUFBWSxHQUFHO2dCQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEIsQ0FBQztZQUNGLEtBQUssQ0FBQztJQUNWLENBQUM7SUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELHFCQUFxQjtBQUNyQiw2RkFBNkY7QUFDN0Y7SUFPRSxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFtQztRQUNoRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7O0lBRUQsQ0FBQyxDQUFDLENBQVM7UUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsQ0FBQyxDQUFDLENBQVM7UUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQVM7UUFDZCxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUM5RCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQVM7UUFDZCxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUM5RCxDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQWtCO1FBQzdCLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsdUVBQXVFO1FBQ3ZFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztZQUNSLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNiLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUVuQixPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNmLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQUMsSUFBSTtnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFrQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztBQUNILENBQUM7QUFFRCw0Q0FBNEMsVUFBa0IsRUFBRSxNQUF3QztJQUN0RyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5pbXBvcnQge3RvRmxvYXR9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge31cbn1cblxuZXhwb3J0IGNvbnN0IExJTkVBUiAgICAgIDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBbMCwwLDEsMV07XG5leHBvcnQgY29uc3QgRUFTRSAgICAgICAgOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFsuMjUsLjEsLjI1LDFdO1xuZXhwb3J0IGNvbnN0IEVBU0VfSU4gICAgIDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBbMC40MiwgMCwgMSwgMV07XG5leHBvcnQgY29uc3QgRUFTRV9PVVQgICAgOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFswLCAwLCAwLjU4LCAxXTtcbmV4cG9ydCBjb25zdCBFQVNFX0lOX09VVCA6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAuNDIsMCwuNTgsMV07XG5cbmNvbnN0IEVQU0lMT04gPSAxLjBlLTc7XG5cbnZhciBFQVNJTkdfUkVHRVggPSAvY3ViaWMtYmV6aWVyXFwoXFxzKihbLVxcLlxcZF0rKVxccyosXFxzKihbLVxcLlxcZF0rKVxccyosXFxzKihbLVxcLlxcZF0rKVxccyosXFxzKihbLVxcLlxcZF0rKVxccypcXCkvaTtcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWFzaW5nRXF1YXRpb24obmFtZTogc3RyaW5nKTogRnVuY3Rpb24ge1xuICB2YXIgY29lZmZpY2llbnRzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdsaW5lYXInOlxuICAgICAgY29lZmZpY2llbnRzID0gTElORUFSO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWFzZSc6XG4gICAgICBjb2VmZmljaWVudHMgPSBFQVNFO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWFzZS1vdXQnOlxuICAgICAgY29lZmZpY2llbnRzID0gRUFTRV9PVVQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlYXNlLWluJzpcbiAgICAgIGNvZWZmaWNpZW50cyA9IEVBU0VfSU47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlYXNlLWluLW91dCc6XG4gICAgICBjb2VmZmljaWVudHMgPSBFQVNFX0lOX09VVDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbWF0Y2hlcyA9IG5hbWUubWF0Y2goRUFTSU5HX1JFR0VYKTtcbiAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignSW52YWxpZCBlYXNpbmcgdmFsdWUgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGNvZWZmaWNpZW50cyA9IFtcbiAgICAgICAgdG9GbG9hdChtYXRjaGVzWzFdKSxcbiAgICAgICAgdG9GbG9hdChtYXRjaGVzWzJdKSxcbiAgICAgICAgdG9GbG9hdChtYXRjaGVzWzNdKSxcbiAgICAgICAgdG9GbG9hdChtYXRjaGVzWzRdKVxuICAgICAgXTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHZhciBjdXJ2ZSA9IG5ldyBCZXppZXIoY29lZmZpY2llbnRzKTtcbiAgcmV0dXJuIGN1cnZlLnNvbHZlLmJpbmQoY3VydmUpO1xufVxuXG4vLyBNb3N0bHkgaW5zcGlyZWQgYnlcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vY29kZXNlYXJjaCNjaHJvbWl1bS9zcmMvdWkvZ2Z4L2dlb21ldHJ5L2N1YmljX2Jlemllci5jY1xuY2xhc3MgQmV6aWVyIHtcbiAgYXhfOiBudW1iZXI7XG4gIGJ4XzogbnVtYmVyO1xuICBjeF86IG51bWJlcjtcbiAgYXlfOiBudW1iZXI7XG4gIGJ5XzogbnVtYmVyO1xuICBjeV86IG51bWJlcjtcbiAgY29uc3RydWN0b3IoW3AxeCwgcDF5LCBwMngsIHAyeV06IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgdGhpcy5jeF8gPSAzLjAgKiBwMXg7XG4gICAgdGhpcy5ieF8gPSAzLjAgKiAocDJ4IC0gcDF4KSAtIHRoaXMuY3hfO1xuICAgIHRoaXMuYXhfID0gMS4wIC0gdGhpcy5jeF8gLSB0aGlzLmJ4XztcblxuICAgIHRoaXMuY3lfID0gMy4wICogcDF5O1xuICAgIHRoaXMuYnlfID0gMy4wICogKHAyeSAtIHAxeSkgLSB0aGlzLmN5XztcbiAgICB0aGlzLmF5XyA9IDEuMCAtIHRoaXMuY3lfIC0gdGhpcy5ieV87XG4gIH07XG5cbiAgeCh0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoKHRoaXMuYXhfICogdCArIHRoaXMuYnhfKSAqIHQgKyB0aGlzLmN4XykgKiB0O1xuICB9XG5cbiAgeSh0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoKHRoaXMuYXlfICogdCArIHRoaXMuYnlfKSAqIHQgKyB0aGlzLmN5XykgKiB0O1xuICB9XG5cbiAgeHByaW1lKHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICgzLjAgKiB0aGlzLmF4XyAqIHQgKyAyLjAgKiB0aGlzLmJ4XykgKiB0ICsgdGhpcy5jeF87XG4gIH1cblxuICB5cHJpbWUodDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKDMuMCAqIHRoaXMuYXlfICogdCArIDIuMCAqIHRoaXMuYnlfKSAqIHQgKyB0aGlzLmN5XztcbiAgfVxuXG4gIHNvbHZlVGdpdmVuWChwZXJjZW50YWdlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8vIGFkZCBhc3NlcnQoMCA8PSBwZXJjZW50YWdlICYmIHBlcmNlbnRhZ2UgPD0gMSk7XG4gICAgdmFyIHQgPSBwZXJjZW50YWdlO1xuICAgIHZhciB4LCBkO1xuICAgIC8vIEZpcnN0IHRyeSBhIGZldyBpdGVyYXRpb25zIG9mIE5ld3RvbidzIG1ldGhvZCAtLSBub3JtYWxseSB2ZXJ5IGZhc3QuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIHggPSB0aGlzLngodCkgLSBwZXJjZW50YWdlO1xuICAgICAgaWYgKE1hdGguYWJzKHgpIDwgRVBTSUxPTilcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICBkID0gdGhpcy54cHJpbWUodCk7XG4gICAgICBpZiAoTWF0aC5hYnMoZCkgPCBFUFNJTE9OKVxuICAgICAgICBicmVhaztcbiAgICAgIHQgPSB0IC0geCAvIGQ7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgdG8gYmlzZWN0aW9uLlxuICAgIHZhciB0MCA9IDAuMDtcbiAgICB2YXIgdDEgPSAxLjA7XG4gICAgdmFyIHQgPSBwZXJjZW50YWdlO1xuXG4gICAgd2hpbGUgKHQwIDwgdDEpIHtcbiAgICAgIHggPSB0aGlzLngodCk7XG4gICAgICBpZiAoTWF0aC5hYnMoeCAtIHBlcmNlbnRhZ2UpIDwgRVBTSUxPTikgcmV0dXJuIHQ7XG4gICAgICBpZiAocGVyY2VudGFnZSA+IHgpIHQwID0gdDsgZWxzZSB0MSA9IHQ7XG4gICAgICB0ID0gKHQxIC0gdDApICogLjUgKyB0MDtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG4gIH1cblxuICBzb2x2ZShwZXJjZW50YWdlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnkodGhpcy5zb2x2ZVRnaXZlblgocGVyY2VudGFnZSkpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlUGVyY2VudGFnZUZyb21FYXNpbmcocGVyY2VudGFnZTogbnVtYmVyLCBlYXNpbmc6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKSB7XG4gIHJldHVybiBuZXcgQmV6aWVyKGVhc2luZykuc29sdmUocGVyY2VudGFnZSk7XG59XG4iXX0=