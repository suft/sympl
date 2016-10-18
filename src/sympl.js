var SYMPL = {};

/**
 ************************************************
 * Math Module
 ************************************************
 */

SYMPL.Math = function() {};

SYMPL.Math.prototype = {};

SYMPL.Math.gcd = function(a, b) {
    return (b === 0) ? a : SYMPL.Math.gcd(b, a % b);
};

SYMPL.Math.lcm = function(a, b) {
    return (a / SYMPL.Math.gcd(a, b)) * b;
};

SYMPL.Math.factorial = function(n) {
    return (n === 0) ? 1 : n * SYMPL.Math.factorial(n - 1);
};

SYMPL.Math.isInt = function(n) {
    return n % 1 === 0;
};

SYMPL.Math.isEven = function(n) {
    return n % 2 === 0;
};

SYMPL.Math.divMod = function(a, b) {
    if (!SYMPL.Math.isInt(a) || !SYMPL.Math.isInt(b)) return false;
    return [SYMPL.Math.floor(a / b), a % b];
};

/**
 ************************************************
 * Tween Module
 ************************************************
 */

SYMPL.Tween = function() {
    if (arguments[0] instanceof SYMPL.Tween) return arguments[0];
    else {
        this.object = arguments[0];
        this.properties = arguments[1];
        this.duration = arguments[2];
        this.easingFunction = arguments[3];
        this.onProgress = arguments[4];
        this.onComplete = arguments[5];
        this.completed = false;
        this.starts = {};
        this.changes = {};
        this.startTime = new Date();
        for (var property in this.properties) {
            this.starts[property] = this.object[property];
            this.changes[property] = this.properties[property] - this.starts[property];
        }
    }
};

SYMPL.Tween.prototype = {

    update: function() {
        var time = new Date() - this.startTime;
        if (time < this.duration) {
            for (var property in this.properties) {
                this.object[property] = this.easingFunction(time, this.starts[property], this.changes[property], this.duration);
            }
            this.onProgress();
        } else {
            time = this.duration;
            for (var property in this.properties) {
                this.object[property] = this.easingFunction(time, this.starts[property], this.changes[property], this.duration);
            }
            this.onComplete();
        }
    },

};

SYMPL.Tween.names = [
    'easeLinear',
    'easeInQuad',
    'easeOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce'
];

SYMPL.Tween.easeLinear = function(t, b, c, d) {
    return c * t / d + b;
};

SYMPL.Tween.easeInQuad = function(t, b, c, d) {
    return c * (t /= d) * t + b;
};

SYMPL.Tween.easeOutQuad = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
};

SYMPL.Tween.easeInCubic = function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
};

SYMPL.Tween.easeOutCubic = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
};

SYMPL.Tween.easeInQuart = function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
};

SYMPL.Tween.easeOutQuart = function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

SYMPL.Tween.easeInQuint = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
};

SYMPL.Tween.easeOutQuint = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};

SYMPL.Tween.easeInSine = function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};

SYMPL.Tween.easeOutSine = function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

SYMPL.Tween.easeInOutSine = function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

SYMPL.Tween.easeInExpo = function(t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};

SYMPL.Tween.easeOutExpo = function(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

SYMPL.Tween.easeInCirc = function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};

SYMPL.Tween.easeOutCirc = function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};

SYMPL.Tween.easeInElastic = function(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};

SYMPL.Tween.easeOutElastic = function(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};

SYMPL.Tween.easeInBack = function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

SYMPL.Tween.easeOutBack = function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

SYMPL.Tween.easeInBounce = function(t, b, c, d) {
    return c - SYMPL.Tween.easeOutBounce(d - t, 0, c, d) + b;
};

SYMPL.Tween.easeOutBounce = function(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
};

SYMPL.Tween.easeInOutBounce = function(t, b, c, d) {
    if (t < d / 2) {
        return SYMPL.Tween.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    }
    return SYMPL.Tween.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

/**
 ************************************************
 * Chance Module
 ************************************************
 */

SYMPL.Chance = function() {};

SYMPL.Chance.prototype = {};

SYMPL.Chance.randomRange = function(min, max) {
    return min + Math.random() * (max - min);
};

SYMPL.Chance.randomInt = function(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
};

SYMPL.Chance.randomTween = function() {
    return SYMPL.Tween[SYMPL.Tween.names[SYMPL.Chance.randomInt(0, SYMPL.Tween.names.length - 1)]];
};

/**
 ************************************************
 * Colour Module
 ************************************************
 */

SYMPL.Colour = function() {
    if (arguments[0] instanceof SYMPL.Colour) return arguments[0];
    else if (arguments[0] instanceof String && arguments[0].charAt(0) === '#') {
        this.hex = arguments[0];
        this.alpha = arguments[1] || 1;
        this.decimal = parseInt(this.hex.slice(1).toString(10));
        this.value = this.hex;
        this.tween = null;
    } else if (arguments[0] instanceof Number && arguments[1] instanceof Number && arguments[2] instanceof Number) {
        this.hex = '#' + arguments[0].toString(16) + arguments[1].toString(16) + arguments[2].toString(16);
        this.alpha = arguments[3] || 1;
        this.decimal = parseInt(this.hex.slice(1).toString(10));
        this.value = this.hex;
        this.tween = null;
    } else {
        this.hex = '#000000';
        this.alpha = 1;
        this.decimal = parseInt(this.hex.slice(1).toString(10));
        this.value = this.hex;
        this.tween = null;
    }
};

SYMPL.Colour.prototype = {

    shadow: function(ctx) {
        ctx.shadowColor = this.value;
        ctx.shadowBlur = this.alpha * 100;
    },

    stroke: function(ctx) {
        ctx.strokeStyle = this.value;
        ctx.globalAlpha = this.alpha;
    },

    fill: function(ctx) {
        ctx.fillStyle = this.value;
        ctx.globalAlpha = this.alpha;
    },

    setTween: function(decimal, alpha, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'decimal': decimal,
            'alpha': alpha,
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function() {
        this.tween.update();
        //this.decimal = Math.floor(this.decimal);
        this.hex = '#' + this.decimal.toString(16);
        if (this.hex.indexOf('.') == -1) {
            this.value = this.hex;
        }
    },

    getHex: function() {
        return {
            h: this.hex
        };
    },

    getHexA: function() {
        return {
            h: this.hex,
            a: this.alpha
        };
    },

    getRGB: function() {
        return {
            r: (this.hex.charAt(1) + this.hex.charAt(2)).toString(10),
            g: (this.hex.charAt(3) + this.hex.charAt(4)).toString(10),
            b: (this.hex.charAt(5) + this.hex.charAt(6)).toString(10),
        };
    },

    getRGBA: function() {
        return {
            r: (this.hex.charAt(1) + this.hex.charAt(2)).toString(10),
            g: (this.hex.charAt(3) + this.hex.charAt(4)).toString(10),
            b: (this.hex.charAt(5) + this.hex.charAt(6)).toString(10),
            a: this.alpha,
        };
    },

    strokeStyle: function(ctx) {
        ctx.strokeStyle = this.hex;
    },

    fillStyle: function(ctx) {
        ctx.fillStyle = this.hex;
    },

    equals: function(c) {
        return this.hex == c.hex && this.alpha == c.alpha;
    },

    clone: function() {
        return new SYMPL.Colour(this.hex, this.alpha);
    },

};

SYMPL.Colour.random = function(min, max) {
    if (min === undefined || max === undefined) {
        return '#' + Math.floor(Math.random() * 16581375).toString(16);
    } else {
        return '#' + Math.floor(min + Math.random() * ((max % 16581375) - min + 1)).toString(16);
    }
};

SYMPL.Colour.preset = {
    'aqua': '#00ffff',
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'black': '#000000',
    'blue': '#0000ff',
    'cyan': '#00ffff',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgreen': '#006400',
    'darkturquoise': '#00ced1',
    'deepskyblue': '#00bfff',
    'green': '#008000',
    'lime': '#00ff00',
    'mediumblue': '#0000cd',
    'mediumspringgreen': '#00fa9a',
    'navy': '#000080',
    'springgreen': '#00ff7f',
    'teal': '#008080',
    'midnightblue': '#191970',
    'dodgerblue': '#1e90ff',
    'lightseagreen': '#20b2aa',
    'forestgreen': '#228b22',
    'seagreen': '#2e8b57',
    'darkslategray': '#2f4f4f',
    'darkslategrey': '#2f4f4f',
    'limegreen': '#32cd32',
    'mediumseagreen': '#3cb371',
    'turquoise': '#40e0d0',
    'royalblue': '#4169e1',
    'steelblue': '#4682b4',
    'darkslateblue': '#483d8b',
    'mediumturquoise': '#48d1cc',
    'indigo': '#4b0082',
    'darkolivegreen': '#556b2f',
    'cadetblue': '#5f9ea0',
    'cornflowerblue': '#6495ed',
    'mediumaquamarine': '#66cdaa',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'slateblue': '#6a5acd',
    'olivedrab': '#6b8e23',
    'slategray': '#708090',
    'slategrey': '#708090',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'mediumslateblue': '#7b68ee',
    'lawngreen': '#7cfc00',
    'aquamarine': '#7fffd4',
    'chartreuse': '#7fff00',
    'gray': '#808080',
    'grey': '#808080',
    'maroon': '#800000',
    'olive': '#808000',
    'purple': '#800080',
    'lightskyblue': '#87cefa',
    'skyblue': '#87ceeb',
    'blueviolet': '#8a2be2',
    'darkmagenta': '#8b008b',
    'darkred': '#8b0000',
    'saddlebrown': '#8b4513',
    'darkseagreen': '#8fbc8f',
    'lightgreen': '#90ee90',
    'mediumpurple': '#9370db',
    'darkviolet': '#9400d3',
    'palegreen': '#98fb98',
    'darkorchid': '#9932cc',
    'yellowgreen': '#9acd32',
    'sienna': '#a0522d',
    'brown': '#a52a2a',
    'darkgray': '#a9a9a9',
    'darkgrey': '#a9a9a9',
    'greenyellow': '#adff2f',
    'lightblue': '#add8e6',
    'paleturquoise': '#afeeee',
    'lightsteelblue': '#b0c4de',
    'powderblue': '#b0e0e6',
    'firebrick': '#b22222',
    'darkgoldenrod': '#b8860b',
    'mediumorchid': '#ba55d3',
    'rosybrown': '#bc8f8f',
    'darkkhaki': '#bdb76b',
    'silver': '#c0c0c0',
    'mediumvioletred': '#c71585',
    'indianred': '#cd5c5c',
    'peru': '#cd853f',
    'chocolate': '#d2691e',
    'tan': '#d2b48c',
    'lightgray': '#d3d3d3',
    'lightgrey': '#d3d3d3',
    'thistle': '#d8bfd8',
    'goldenrod': '#daa520',
    'orchid': '#da70d6',
    'palevioletred': '#db7093',
    'crimson': '#dc143c',
    'gainsboro': '#dcdcdc',
    'plum': '#dda0dd',
    'burlywood': '#deb887',
    'lightcyan': '#e0ffff',
    'lavender': '#e6e6fa',
    'darksalmon': '#e9967a',
    'palegoldenrod': '#eee8aa',
    'violet': '#ee82ee',
    'azure': '#f0ffff',
    'honeydew': '#f0fff0',
    'khaki': '#f0e68c',
    'lightcoral': '#f08080',
    'sandybrown': '#f4a460',
    'beige': '#f5f5dc',
    'mintcream': '#f5fffa',
    'wheat': '#f5deb3',
    'whitesmoke': '#f5f5f5',
    'ghostwhite': '#f8f8ff',
    'lightgoldenrodyellow': '#fafad2',
    'linen': '#faf0e6',
    'salmon': '#fa8072',
    'oldlace': '#fdf5e6',
    'bisque': '#ffe4c4',
    'blanchedalmond': '#ffebcd',
    'coral': '#ff7f50',
    'cornsilk': '#fff8dc',
    'darkorange': '#ff8c00',
    'deeppink': '#ff1493',
    'floralwhite': '#fffaf0',
    'fuchsia': '#ff00ff',
    'gold': '#ffd700',
    'hotpink': '#ff69b4',
    'ivory': '#fffff0',
    'lavenderblush': '#fff0f5',
    'lemonchiffon': '#fffacd',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightyellow': '#ffffe0',
    'magenta': '#ff00ff',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'orange': '#ffa500',
    'orangered': '#ff4500',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'pink': '#ffc0cb',
    'red': '#ff0000',
    'seashell': '#fff5ee',
    'snow': '#fffafa',
    'tomato': '#ff6347',
    'white': '#ffffff',
    'yellow': '#ffff00',
    'rebeccapurple': '#663399',
};

/**
 ************************************************
 * Size Module
 ************************************************
 */

SYMPL.Size2 = function() {
    if (arguments[0] instanceof SYMPL.Size2) return arguments[0];
    else {
        this.width = arguments[0] || 0;
        this.height = arguments[1] || 0;
        this.tween = null;
    }
};

SYMPL.Size2.prototype = {

    setTween: function(width, height, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'width': width,
            'height': height,
        }, duration, easingFunction, onProgress, onComplete);
    },

    area: function() {
        return this.width * this.height;
    },

    equals: function(s) {
        return this.width == s.width && this.height == s.height;
    },

    clone: function() {
        return new SYMPL.Size2(this.width, this.height);
    },

};

SYMPL.Size2.preset = {
    '_1K_UHD': new SYMPL.Size2(960, 540),
    '_2K_UHD': new SYMPL.Size2(1920, 1080),
    '_3K_UHD': new SYMPL.Size2(2880, 1620),
    '_4K_UHD': new SYMPL.Size2(3840, 2160),
    '_5K_UHD': new SYMPL.Size2(4800, 2700),
    '_6K_UHD': new SYMPL.Size2(5760, 3240),
    '_7K_UHD': new SYMPL.Size2(6720, 3780),
    '_8K_UHD': new SYMPL.Size2(7680, 4320),
    '_1K': new SYMPL.Size2(1024, 576),
    '_2K': new SYMPL.Size2(2048, 1152),
    '_3K': new SYMPL.Size2(3072, 1728),
    '_4K': new SYMPL.Size2(4096, 2304),
    '_5K': new SYMPL.Size2(5120, 2160),
    '_6K': new SYMPL.Size2(6144, 3456),
    '_7K': new SYMPL.Size2(7168, 4032),
    '_8K': new SYMPL.Size2(8192, 4608),
};

SYMPL.Size3 = function() {
    if (arguments[0] instanceof SYMPL.Size3) return arguments[0];
    else {
        this.width = arguments[0] || 0;
        this.height = arguments[1] || 0;
        this.depth = arguments[2] || 0;
        this.tween = null;
    }
};

SYMPL.Size3.prototype = {

    setTween: function(width, height, depth, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'width': width,
            'height': height,
            'depth': depth
        }, duration, easingFunction, onProgress, onComplete);
    },

    volume: function() {
        return this.width * this.height * this.depth;
    },

    equals: function(s) {
        return this.width == s.width && this.height == s.height && this.depth == s.depth;
    },

    clone: function() {
        return new SYMPL.Size3(this.width, this.height, this.depth);
    },

};

/**
 ************************************************
 * Vector Module
 ************************************************
 */

SYMPL.Vector2 = function() {
    if (arguments[0] instanceof SYMPL.Vector2) return arguments[0];
    else {
        this.x = arguments[0] || 0;
        this.y = arguments[1] || 0;
        this.tween = null;
    }
};

SYMPL.Vector2.prototype = {

    stroke: function(ctx, size) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, size || 1, 0, Math.PI * 2, false);
        ctx.stroke();
    },

    fill: function(ctx, size) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, size || 1, 0, Math.PI * 2, false);
        ctx.fill();
    },

    setTween: function(x, y, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'x': x,
            'y': y,
        }, duration, easingFunction, onProgress, onComplete);
    },

    rotate: function(angle, origin) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var x = this.x - origin.x;
        var y = this.y - origin.y;
        this.x = origin.x + (x * cos) - (y * sin);
        this.y = origin.y + (y * cos) + (x * sin);
    },

    add: function(v) {
        if (v instanceof SYMPL.Vector2) return new SYMPL.Vector2(this.x + v.x, this.y + v.y);
        else return new SYMPL.Vector2(this.x + v, this.y + v);
    },

    addTo: function(v) {
        if (v instanceof SYMPL.Vector2) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
    },

    subtract: function(v) {
        if (v instanceof SYMPL.Vector2) return new SYMPL.Vector2(this.x - v.x, this.y - v.y);
        else return new SYMPL.Vector2(this.x - v, this.y - v);
    },

    subtractFrom: function(v) {
        if (v instanceof SYMPL.Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
    },

    multiply: function(v) {
        if (v instanceof SYMPL.Vector2) return new SYMPL.Vector2(this.x * v.x, this.y * v.y);
        else return new SYMPL.Vector2(this.x * v, this.y * v);
    },

    multiplyBy: function(v) {
        if (v instanceof SYMPL.Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
    },

    divide: function(v) {
        if (v instanceof SYMPL.Vector2) return new SYMPL.Vector2(this.x / v.x, this.y / v.y);
        else return new SYMPL.Vector2(this.x / v, this.y / v);
    },

    divideBy: function(v) {
        if (v instanceof SYMPL.Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        } else {
            this.x /= v;
            this.y /= v;
        }
    },

    equals: function(v) {
        return this.x == v.x && this.y == v.y;
    },

    dot: function(v) {
        return (this.x * v.x) + (this.y * v.y);
    },

    length: function() {
        return Math.sqrt(this.dot(this));
    },

    unit: function() {
        this.divide(this.length());
    },

    clone: function() {
        return new SYMPL.Vector2(this.x, this.y);
    }

};

SYMPL.Vector2.negative = function(a, b) {
    b.x = -a.x;
    b.y = -a.y;
    return b;
};

SYMPL.Vector2.add = function(a, b, c) {
    if (b instanceof SYMPL.Vector2) {
        c.x = a.x + b.x;
        c.y = a.y + b.y;
    } else {
        c.x = a.x + b;
        c.y = a.y + b;
    }
    return c;
};

SYMPL.Vector2.subtract = function(a, b, c) {
    if (b instanceof SYMPL.Vector2) {
        c.x = a.x - b.x;
        c.y = a.y - b.y;
    } else {
        c.x = a.x - b;
        c.y = a.y - b;
    }
    return c;
};

SYMPL.Vector2.multiply = function(a, b, c) {
    if (b instanceof SYMPL.Vector2) {
        c.x = a.x * b.x;
        c.y = a.y * b.y;
    } else {
        c.x = a.x * b;
        c.y = a.y * b;
    }
    return c;
};

SYMPL.Vector2.divide = function(a, b, c) {
    if (b instanceof SYMPL.Vector2) {
        c.x = a.x / b.x;
        c.y = a.y / b.y;
    } else {
        c.x = a.x / b;
        c.y = a.y / b;
    }
    return c;
};

SYMPL.Vector2.unit = function(a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    return b;
};

SYMPL.Vector3 = function() {
    if (arguments[0] instanceof SYMPL.Vector3) return arguments[0];
    else {
        this.x = arguments[0] || 0;
        this.y = arguments[1] || 0;
        this.z = arguments[2] || 0;
        this.sx = 0;
        this.sy = 0;
        this.tween = null;
    }
};

SYMPL.Vector3.prototype = {

    setTween: function(x, y, z, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'x': x,
            'y': y,
            'z': z,
        }, duration, easingFunction, onProgress, onComplete);
    },

    add: function(v) {
        if (v instanceof SYMPL.Vector3) return new SYMPL.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        else return new SYMPL.Vector3(this.x + v, this.y + v, this.z + v);
    },

    addTo: function(v) {
        if (v instanceof SYMPL.Vector3) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        } else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
    },

    subtract: function(v) {
        if (v instanceof SYMPL.Vector3) return new SYMPL.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        else return new SYMPL.Vector3(this.x - v, this.y - v, this.z - v);
    },

    subtractFrom: function(v) {
        if (v instanceof SYMPL.Vector3) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        } else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
    },

    multiply: function(v) {
        if (v instanceof SYMPL.Vector3) return new SYMPL.Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        else return new SYMPL.Vector3(this.x * v, this.y * v, this.z * v);
    },

    multiplyBy: function(v) {
        if (v instanceof SYMPL.Vector3) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
    },

    divide: function(v) {
        if (v instanceof SYMPL.Vector3) return new SYMPL.Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
        else return new SYMPL.Vector3(this.x / v, this.y / v, this.z / v);
    },

    divideBy: function(v) {
        if (v instanceof SYMPL.Vector3) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        } else {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        }
    },

    rotateX: function(angle, origin) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var z = this.z - origin.z;
        var y = this.y - origin.y;
        this.y = origin.y + (y * cos) - (z * sin);
        this.z = origin.z + (z * cos) + (y * sin);
    },

    rotateY: function(angle, origin) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var z = this.z - origin.z;
        var x = this.x - origin.x;
        this.x = origin.x + (x * cos) - (z * sin);
        this.z = origin.z + (z * cos) + (x * sin);
    },

    rotateZ: function(angle, origin) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var x = this.x - origin.x;
        var y = this.y - origin.y;
        this.x = origin.x + (x * cos) - (y * sin);
        this.y = origin.y + (y * cos) + (x * sin);
    },

    project: function(fl, centerZ) {
        var scale = fl / (fl + this.z + centerZ);
        this.sx = this.x * scale;
        this.sy = this.y * scale;
    },

    equals: function(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    },

    dot: function(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    },

    cross: function(v) {
        return new SYMPL.Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    },

    length: function() {
        return Math.sqrt(this.dot(this));
    },

    unit: function() {
        this.divide(this.length());
    },

    clone: function() {
        return new SYMPL.Vector3(this.x, this.y, this.z);
    },

};

SYMPL.Vector3.negative = function(a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
};

SYMPL.Vector3.add = function(a, b, c) {
    if (b instanceof SYMPL.Vector3) {
        c.x = a.x + b.x;
        c.y = a.y + b.y;
        c.z = a.z + b.z;
    } else {
        c.x = a.x + b;
        c.y = a.y + b;
        c.z = a.z + b;
    }
    return c;
};

SYMPL.Vector3.subtract = function(a, b, c) {
    if (b instanceof SYMPL.Vector3) {
        c.x = a.x - b.x;
        c.y = a.y - b.y;
        c.z = a.z - b.z;
    } else {
        c.x = a.x - b;
        c.y = a.y - b;
        c.z = a.z - b;
    }
    return c;
};

SYMPL.Vector3.multiply = function(a, b, c) {
    if (b instanceof SYMPL.Vector3) {
        c.x = a.x * b.x;
        c.y = a.y * b.y;
        c.z = a.z * b.z;
    } else {
        c.x = a.x * b;
        c.y = a.y * b;
        c.z = a.z * b;
    }
    return c;
};

SYMPL.Vector3.divide = function(a, b, c) {
    if (b instanceof SYMPL.Vector3) {
        c.x = a.x / b.x;
        c.y = a.y / b.y;
        c.z = a.z / b.z;
    } else {
        c.x = a.x / b;
        c.y = a.y / b;
        c.z = a.z / b;
    }
    return c;
};

SYMPL.Vector3.cross = function(a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
};

SYMPL.Vector3.unit = function(a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
};

/**
 ************************************************
 * Camera Module
 ************************************************
 */

SYMPL.Camera = function() {
    if (arguments[0] instanceof SYMPL.Camera) arguments[0];
    else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof SYMPL.Size2) {
        this.center = arguments[0];
        this.translate = new SYMPL.Vector2(0, 0);
        this.translate.setTween(this.translate.x, this.translate.y, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[1];
        this.size.setTween(this.size.width, this.size.height, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.res = arguments[2] || SYMPL.Size2.preset['1K'];
        this.angle = arguments[3] || 0;
        this.scale = new SYMPL.Vector2(this.size.width / this.res.width, this.size.height / this.res.height);
        this.scale.setTween(this.scale.x, this.scale.y, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.tween = null;
    }
};

SYMPL.Camera.prototype = {

    setTween: function(angle, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'angle': angle
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function() {
        this.translate.tween.update();
        this.size.tween.update();
        this.scale.tween.update();
        if (this.tween != null) this.tween.update();
        this.center.addTo(this.translate);
        this.res.width = this.size.width / this.scale.x;
        this.res.height = this.size.height / this.scale.y;
    },

    start: function(ctx) {
        ctx.save();
        ctx.scale(this.scale.x, this.scale.y);
        ctx.translate(this.translate.x, this.translate.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.translate.x, -this.translate.y);
    },

    end: function(ctx) {
        ctx.restore();
    },

};

/**
 ************************************************
 * Shape Module
 ************************************************
 */

SYMPL.Rectangle = function() {
    if (arguments[0] instanceof SYMPL.Rectangle) return arguments[0];
    else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof SYMPL.Size2) {
        this.center = arguments[0];
        this.center.setTween(this.center.x, this.center.y, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[1];
        this.size.setTween(this.size.width, this.size.height, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[2] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector2(-this.size.width / 2, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, -this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)), this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof Number && arguments[2] instanceof Number) {
        this.center = arguments[0];
        this.center.setTween(this.center.x, this.center.y, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = new SYMPL.Size2(arguments[1], arguments[2]);
        this.size.setTween(this.size.width, this.size.height, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[3] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector2(-this.size.width / 2, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, -this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)), this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else if (arguments[0] instanceof Number && arguments[1] instanceof Number && arguments[2] instanceof SYMPL.Size2) {
        this.center = new SYMPL.Vector2(arguments[0], arguments[1]);
        this.center.setTween(this.center.x, this.center.y, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[2];
        this.size.setTween(this.size.width, this.size.height, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[3] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector2(-this.size.width / 2, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, -this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)), this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else {
        this.center = new SYMPL.Vector2(arguments[0] || 0, arguments[1] || 0);
        this.center.setTween(this.center.x, this.center.y, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = new SYMPL.Size2(arguments[2] || 0, arguments[3] || 0);
        this.size.setTween(this.size.width, this.size.height, 0, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[4] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector2(-this.size.width / 2, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, -this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)), this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    }
};

SYMPL.Rectangle.prototype = {

    setTween: function(angle, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'angle': angle
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function() {
        this.center.tween.update();
        this.size.tween.update();
        if (this.tween != null) this.tween.update();
        this.points = [this.center.add(new SYMPL.Vector2(-this.size.width / 2, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, -this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)), this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    },

    intersectRect: function(rectangle) {
        return !(rectangle.points[2].x < this.points[0].x || this.points[2].x < rectangle.points[0].x ||
            rectangle.points[2].y < this.points[0].y || this.points[2].y < rectangle.points[0].y);
    },

    getA: function() {
        return this.points[3].subtract(this.points[0]);
    },

    getB: function() {
        return this.points[1].subtract(this.points[0]);
    },

    getC: function() {
        return this.points[2].subtract(this.points[1]);
    },

    getD: function() {
        return this.points[2].subtract(this.points[3]);
    },

    setAngle: function(angle, origin) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle - this.angle, origin);
        }
        this.angle = angle;
    },

    addToAngle: function(angle, origin) {
        this.angle += angle;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle, origin);
        }
    },

    perimeter: function() {
        return this.size.perimeter();
    },

    area: function() {
        return this.size.area();
    },

    plotStroke: function(ctx, size) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, size || 1, 0, Math.PI * 2, false);
            ctx.stroke();
        }
    },

    plotFill: function(ctx, size) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, size || 1, 0, Math.PI * 2, false);
            ctx.fill();
        }
    },

    stroke: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.closePath();
        ctx.stroke();
    },

    fill: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.closePath();
        ctx.fill();
    },

};

SYMPL.Triangle = function() {
    if (arguments[0] instanceof SYMPL.Triangle) return arguments[0];
    else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof SYMPL.Size2) {
        this.center = arguments[0];
        this.center.setTween(this.center.x, this.center.y, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[1];
        this.size.setTween(this.size.width, this.size.height, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[2] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector2(0, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof Number && arguments[2] instanceof Number) {
        this.center = arguments[0];
        this.size = new SYMPL.Size2(arguments[1], arguments[2]);
        this.angle = arguments[3] || 0;
        this.points = [this.center.add(new SYMPL.Vector2(0, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else if (arguments[0] instanceof Number && arguments[1] instanceof Number && arguments[2] instanceof SYMPL.Size2) {
        this.center = new SYMPL.Vector2(arguments[0], arguments[1]);
        this.size = arguments[2];
        this.angle = arguments[3] || 0;
        this.points = [this.center.add(new SYMPL.Vector2(0, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    } else {
        this.center = new SYMPL.Vector2(arguments[0] || 0, arguments[1] || 0);
        this.size = new SYMPL.Size2(arguments[2] || 0, arguments[3] || 0);
        this.angle = arguments[4] || 0;
        this.points = [this.center.add(new SYMPL.Vector2(0, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    }
};

SYMPL.Triangle.prototype = {

    setTween: function(angle, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'angle': angle
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function() {
        this.center.tween.update();
        this.size.tween.update();
        if (this.tween != null) this.tween.update();
        this.points = [this.center.add(new SYMPL.Vector2(0, -this.size.height / 2)), this.center.add(new SYMPL.Vector2(this.size.width / 2, this.size.height / 2)),
            this.center.add(new SYMPL.Vector2(-this.size.width / 2, this.size.height / 2))
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(this.angle, this.center);
        }
    },

    getA: function() {
        return this.points[2].subtract(this.points[0]);
    },

    getB: function() {
        return this.points[1].subtract(this.points[0]);
    },

    getC: function() {
        return this.points[1].subtract(this.points[2]);
    },

    setAngle: function(angle, origin) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle - this.angle, origin);
        }
        this.angle = angle;
    },

    addToAngle: function(angle, origin) {
        this.angle += angle;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle, origin);
        }
    },

    area: function() {
        return this.size.area() / 2;
    },

    plotStroke: function(ctx, size) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, size || 1, 0, Math.PI * 2, false);
            ctx.stroke();
        }
    },

    plotFill: function(ctx, size) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, size || 1, 0, Math.PI * 2, false);
            ctx.fill();
        }
    },

    stroke: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.closePath();
        ctx.stroke();
    },

    fill: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.closePath();
        ctx.fill();
    },

};

SYMPL.Oval = function() {
    if (arguments[0] instanceof SYMPL.Oval) return arguments[0];
    else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof SYMPL.Size2) {
        this.center = arguments[0];
        this.center.setTween(this.center.x, this.center.y, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[1];
        this.size.setTween(this.size.width, this.size.height, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angle = arguments[2] || 0;
        this.tween = null;
    } else if (arguments[0] instanceof SYMPL.Vector2 && arguments[1] instanceof Number && arguments[2] instanceof Number) {
        this.center = arguments[0];
        this.size = new SYMPL.Size2(arguments[1], arguments[2]);
        this.angle = arguments[3] || 0;
    } else if (arguments[0] instanceof Number && arguments[1] instanceof Number && arguments[2] instanceof SYMPL.Size2) {
        this.center = new SYMPL.Vector2(arguments[0], arguments[1]);
        this.size = arguments[2];
        this.angle = arguments[3] || 0;
    } else {
        this.center = new SYMPL.Vector2(arguments[0] || 0, arguments[1] || 0);
        this.size = new SYMPL.Size2(arguments[2] || 0, arguments[3] || 0);
        this.angle = arguments[4] || 0;
    }
};

SYMPL.Oval.prototype = {

    setTween: function(angle, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'angle': angle
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function() {
        this.center.tween.update();
        this.size.tween.update();
        if (this.tween != null) this.tween.update();
    },

    setAngle: function(angle) {
        this.angle = angle;
    },

    drawEllipse: function(ctx, centerX, centerY, width, height) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - height / 2); // A1
        ctx.bezierCurveTo(
            centerX + width / 2, centerY - height / 2, // C1
            centerX + width / 2, centerY + height / 2, // C2
            centerX, centerY + height / 2); // A2
        ctx.bezierCurveTo(
            centerX - width / 2, centerY + height / 2, // C3
            centerX - width / 2, centerY - height / 2, // C4
            centerX, centerY - height / 2); // A1
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    },

    fill: function(ctx) {
        ctx.beginPath();
        if (ctx.ellipse != null) ctx.ellipse(this.center.x, this.center.y, this.size.width / 2, this.size.height / 2, this.angle, 0, Math.PI * 2, false);
        else {
            ctx.save();
            ctx.translate(this.center.x, this.center.y);
            ctx.rotate(this.angle || 0);
            ctx.translate(-this.center.x, -this.center.y);
            this.drawEllipse(ctx, this.center.x, this.center.y, this.size.width, this.size.height);
            ctx.restore();
        }
        ctx.fill();
    },

    stroke: function(ctx) {
        ctx.beginPath();
        if (ctx.ellipse != null) ctx.ellipse(this.center.x, this.center.y, this.size.width / 2, this.size.height / 2, this.angle, 0, Math.PI * 2, false);
        else {
            ctx.save();
            ctx.translate(this.center.x, this.center.y);
            ctx.rotate(this.angle || 0);
            this.drawEllipse(ctx, this.center.x, this.center.y, this.size.width, this.size.height);
            ctx.translate(-this.center.x, -this.center.y);
            ctx.restore();
        }
        ctx.stroke();
    },

};

SYMPL.Cuboid = function() {
    if (arguments[0] instanceof SYMPL.Cuboid) return arguments[0];
    else {
        this.center = arguments[0];
        this.center.setTween(this.center.x, this.center.y, this.center.y, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.size = arguments[1];
        this.size.setTween(this.size.width, this.size.height, this.size.depth, 1, SYMPL.Tween.easeLinear, function() {}, function() {});
        this.angleX = arguments[2] || 0;
        this.angleY = arguments[3] || 0;
        this.tween = null;
        this.points = [this.center.add(new SYMPL.Vector3(-this.size.width / 2, -this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, -this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, -this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, -this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, this.size.height / 2, -this.size.depth / 2)),
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotateX(this.angleX, this.center);
            this.points[i].rotateY(this.angleY, this.center);
        }
    }
};

SYMPL.Cuboid.prototype = {

    setTween: function(angleX, angleY, duration, easingFunction, onProgress, onComplete) {
        this.tween = new SYMPL.Tween(this, {
            'angleX': angleX,
            'angleY': angleY
        }, duration, easingFunction, onProgress, onComplete);
    },

    update: function(fl, centerZ) {
        this.center.tween.update();
        this.size.tween.update();
        if (this.tween != null) this.tween.update();
        this.points = [this.center.add(new SYMPL.Vector3(-this.size.width / 2, -this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, -this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, -this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, -this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, this.size.height / 2, this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(this.size.width / 2, this.size.height / 2, -this.size.depth / 2)),
            this.center.add(new SYMPL.Vector3(-this.size.width / 2, this.size.height / 2, -this.size.depth / 2)),
        ];
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].rotateX(this.angleX, this.center);
            this.points[i].rotateY(this.angleY, this.center);
        }
        this.project(fl, centerZ);
    },

    project: function(fl, centerZ) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            p.project(fl, centerZ);
        }
    },

    stroke: function(ctx) {
        var faces = [
            [0, 1, 2, 3],
            [0, 1, 5, 4],
            [0, 3, 7, 4],
            [1, 2, 6, 5],
            [2, 3, 7, 6],
            [4, 5, 6, 7]
        ];
        for (var i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(this.points[faces[i][0]].sx, this.points[faces[i][0]].sy);
            for (var j = 1; j < 4; j++) {
                var v = this.points[faces[i][j]];
                ctx.lineTo(v.sx, v.sy);
            }
            ctx.lineTo(this.points[faces[i][0]].sx, this.points[faces[i][0]].sy);
            ctx.closePath();
            ctx.stroke();
        }
    },

    fill: function(ctx) {
        var faces = [
            [0, 1, 2, 3],
            [0, 1, 5, 4],
            [0, 3, 7, 4],
            [1, 2, 6, 5],
            [2, 3, 7, 6],
            [4, 5, 6, 7]
        ];
        for (var i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(this.points[faces[i][0]].sx, this.points[faces[i][0]].sy);
            for (var j = 1; j < 4; j++) {
                var v = this.points[faces[i][j]];
                ctx.lineTo(v.sx, v.sy);
            }
            ctx.lineTo(this.points[faces[i][0]].sx, this.points[faces[i][0]].sy);
            ctx.closePath();
            ctx.fill();
        }
    },

    labelPoints: function(ctx) {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            ctx.fillText(i, p.sx, p.sy);
        }
    },

};

/**
 ************************************************
 * Particle Module
 ************************************************
 */

SYMPL.Particle = function() {
    if (arguments[0] instanceof SYMPL.Particle) return arguments[0];
    else {
        this.pos = arguments[0];
        this.vel = arguments[1];
        this.acc = arguments[2];
        this.radius = arguments[3];
        this.friction = arguments[4];
        this.bounce = arguments[5];
        this.gravity = arguments[6];
        this.colour = arguments[7];
        this.mass = arguments[8];
        this.lifeSpan = arguments[9];
        this.time = 0;
        this.springs = [];
        this.gravitations = [];
    }
};

SYMPL.Particle.prototype = {

    getSpeed: function() {
        return this.vel.length();
    },

    setSpeed: function(speed) {
        var heading = this.getHeading();
        this.vel.x = Math.cos(heading) * speed;
        this.vel.y = Math.sin(heading) * speed;
    },

    getHeading: function() {
        return Math.atan2(this.vel.y, this.vel.x);
    },

    setHeading: function(heading) {
        var speed = this.getSpeed();
        this.vel.x = Math.cos(heading) * speed;
        this.vel.y = Math.sin(heading) * speed;
    },


    addGravitation: function(p) {
        this.removeGravitation(p);
        this.gravitations.push(p);
    },

    removeGravitation: function(p) {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            if (p === this.gravitations[i]) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    },

    addSpring: function(point, k, length) {
        this.removeSpring(point);
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    },

    removeSpring: function(point) {
        for (var i = 0; i < this.springs.length; i += 1) {
            if (point === this.springs[i].point) {
                this.springs.splice(i, 1);
                return;
            }
        }
    },

    handleGravitations: function() {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            this.gravitateTo(this.gravitations[i]);
        }
    },

    handleSprings: function() {
        for (var i = 0; i < this.springs.length; i += 1) {
            var spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    },

    gravitateTo: function(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),
            force = p2.mass / distSQ,
            ax = dx / dist * force,
            ay = dy / dist * force;
        this.vel.x += ax;
        this.vel.y += ay;
    },

    springTo: function(point, k, length) {
        var dx = point.x - this.x,
            dy = point.y - this.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            springForce = (distance - length || 0) * k;
        this.vel.x += dx / distance * springForce,
            this.vel.y += dy / distance * springForce;
    },

    accelerate: function() {
        this.vel.addTo(this.acc);
    },

    update: function(dt) {
        this.handleSprings();
        this.handleGravitations();
        this.vel.multiplyBy(this.friction);
        this.vy += this.gravity * (dt || 1);
        this.pos.x += this.vx * (dt || 1);
        this.pos.y += this.vy * (dt || 1);
        this.time += (dt || 1);
    },

    render: function(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    },

};

/**
 ************************************************
 * Emitter Module
 ************************************************
 */

SYMPL.Settings = function() {
    if (arguments[0] instanceof SYMPL.Settings) return arguments[0];
    else {
        this.limits = [];
        for (var i = 0; i < arguments.length; i++) {
            this.limits.push(arguments[i]);
        };
    }
};

SYMPL.Settings.prototype = {
    vel: function() {
        return new SYMPL.Vector2(SYMPL.Chance.randomRange(this.limits[0].min0, this.limits[0].max0), SYMPL.Chance.randomRange(this.limits[0].min1, this.limits[0].max1));
    },
    acc: function() {
        return new SYMPL.Vector2(SYMPL.Chance.randomRange(this.limits[0].min0, this.limits[0].max0), SYMPL.Chance.randomRange(this.limits[0].min1, this.limits[0].max1));
    },
    radius: function() {
        return SYMPL.Chance.randomRange(this.limits[2].min, this.limits[2].max);
    },
    friction: function() {
        return SYMPL.Chance.randomRange(this.limits[3].min, this.limits[3].max);
    },
    bounce: function() {
        return SYMPL.Chance.randomRange(this.limits[4].min, this.limits[4].max);
    },
    gravity: function() {
        return SYMPL.Chance.randomRange(this.limits[5].min, this.limits[5].max);
    },
    colour: function() {
        return 'black' /*SYMPL.Colour.random(this.limits[6].min, this.limits[6].max)*/ ;
    },
    mass: function() {
        return SYMPL.Chance.randomRange(this.limits[7].min, this.limits[7].max);
    },
    lifeSpan: function() {
        return SYMPL.Chance.randomInt(this.limits[8].min, this.limits[8].max);
    },
};

SYMPL.Emitter = function() {
    if (arguments[0] instanceof SYMPL.Emitter) return arguments[0];
    else {
        this.pos = arguments[0];
        this.vel = arguments[1];
        this.settings = arguments[2];
        this.particles = [];
    }
};

SYMPL.Emitter.prototype = {

    addParticle: function() {
        var p = new SYMPL.Particle(this.pos, this.settings.vel(), this.settings.acc(), this.settings.radius(), this.settings.friction(), this.settings.bounce(), this.settings.gravity(), this.settings.colour(), this.settings.mass(), this.settings.lifeSpan());
        this.particles.push(p);
    },

    removeParticle: function(particle) {
        var index = this.particles.indexOf(particle);
        this.particles.splice(index, 1);
    },

    update: function(dt) {
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            p.update(dt);
            if(p.lifeSpan <= p.time) this.removeParticle(p);
        }
    },

    render: function(ctx) {
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            p.render(ctx);
        }
    },

};

/**
 ************************************************
 * Loop Module
 ************************************************
 */

SYMPL.Loop = function() {
    if (arguments[0] instanceof SYMPL.Loop) return arguments[0];
    else {
        this.canvas = arguments[0];
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.init = arguments[1] || function() {};
        this.update = arguments[2] || function() {};
        this.render = arguments[3] || function() {};
        this.init();
    }
};

SYMPL.Loop.prototype = {

    run: function() {
        var self = this;
        var now,
            dt = 0,
            last = timestamp(),
            slow = 1, // slow motion scaling factor
            step = 1 / 60,
            slowStep = slow * step,
            fpsmeter = new FPSMeter({
                decimals: 1,
                graph: true,
                heat: true,
                history: 20,
                theme: 'dark',
                left: '5px'
            });

        function timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }

        function frame() {
            fpsmeter.tickStart();
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);
            while (dt > slowStep) {
                dt = dt - slowStep;
                self.update(step);
            }
            self.render(dt / slow, self.ctx);
            last = now;
            fpsmeter.tick();
            window.requestAnimationFrame(frame, self.canvas);
        }

        window.requestAnimationFrame(frame);
    },

};
