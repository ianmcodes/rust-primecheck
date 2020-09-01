
let wasm;

const u32CvtShim = new Uint32Array(2);

const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}
/**
* Generates a random number in the given range.
*
* # Arguments
* * `min` - Rust `u64`; JS `BigInt`;
* * `max` - Rust `u64`; JS `BigInt`;
*
* # Example
* ```js
* var num = module.rng_gen_range_crypto(2n, 512n);
* ```
* @param {BigInt} min
* @param {BigInt} max
* @returns {BigInt}
*/
export function rng_gen_range_crypto(min, max) {
    const retptr = 8;
    uint64CvtShim[0] = min;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    uint64CvtShim[0] = max;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    const ret = wasm.rng_gen_range_crypto(retptr, low0, high0, low1, high1);
    const memi32 = getInt32Memory();
    u32CvtShim[0] = memi32[retptr / 4 + 0];
    u32CvtShim[1] = memi32[retptr / 4 + 1];
    const n0 = uint64CvtShim[0];
    return n0;
}

/**
* Generates a random number in the given range.
*
* # Arguments
* * `min` - Rust `u64`; JS `BigInt`;
* * `max` - Rust `u64`; JS `BigInt`;
*
* # Example
* ```js
* var num = module.rng_gen_range(2n, 512n);
* ```
* @param {BigInt} min
* @param {BigInt} max
* @returns {BigInt}
*/
export function rng_gen_range(min, max) {
    const retptr = 8;
    uint64CvtShim[0] = min;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    uint64CvtShim[0] = max;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    const ret = wasm.rng_gen_range(retptr, low0, high0, low1, high1);
    const memi32 = getInt32Memory();
    u32CvtShim[0] = memi32[retptr / 4 + 0];
    u32CvtShim[1] = memi32[retptr / 4 + 1];
    const n0 = uint64CvtShim[0];
    return n0;
}

/**
* Implementation of modular exponentiation for u64. Exposed to JS.
* `(b ^ e) % m`
*
* # Arguments
* * `base` - Rust `u64`; JS `BigInt`; The base.
* * `exponent` - Rust `u64`; JS `BigInt`; The exponent.
* * `modulus` - Rust `u64`; JS `BigInt`; The modulus.
*
* # Example
* ```js
* var num = module.modpow(2n,10n,10n);
* ```
* @param {BigInt} base
* @param {BigInt} exponent
* @param {BigInt} modulus
* @returns {BigInt}
*/
export function modpow(base, exponent, modulus) {
    const retptr = 8;
    uint64CvtShim[0] = base;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    uint64CvtShim[0] = exponent;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    uint64CvtShim[0] = modulus;
    const low2 = u32CvtShim[0];
    const high2 = u32CvtShim[1];
    const ret = wasm.modpow(retptr, low0, high0, low1, high1, low2, high2);
    const memi32 = getInt32Memory();
    u32CvtShim[0] = memi32[retptr / 4 + 0];
    u32CvtShim[1] = memi32[retptr / 4 + 1];
    const n0 = uint64CvtShim[0];
    return n0;
}

/**
* Implementation of Fermat Prime Test. Returns true if the number is probably
* prime, false if it is composite. This is exposed to JavaScript.
*
* # Arguments
* * `n` - Rust `u64`; JS `BigInt`; The number to test.
* * `k` - Rust `u32`; JS `Number`; Number of time to run the test. Improves accuracy of result.
*
* # Example
* ```js
* // remember that the first argument needs to be a BigInt, hence the \'n\' at
* // the end. Could also use `BigInt(5)`.
* var result = module.prime_check(5n, 10);
* ```
* @param {BigInt} n
* @param {number} k
* @returns {boolean}
*/
export function prime_check(n, k) {
    uint64CvtShim[0] = n;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    const ret = wasm.prime_check(low0, high0, k);
    return ret !== 0;
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        const ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__widl_f_get_random_values_with_u8_array_Crypto = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).getRandomValues(getArrayU8FromWasm(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_crypto_Window = function(arg0) {
        try {
            const ret = getObject(arg0).crypto;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_call_4499dca0c553c196 = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_6ad69a50998c5acb = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_globalThis_36c1f2e85948e420 = function() {
        try {
            const ret = globalThis.globalThis;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_self_73c7a601ff857345 = function() {
        try {
            const ret = self.self;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_window_ca735e04cb2b0566 = function() {
        try {
            const ret = window.window;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_global_99312a595fd2e761 = function() {
        try {
            const ret = global.global;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_floor_5efa4e3d8e57289e = typeof Math.floor == 'function' ? Math.floor : notDefined('Math.floor');
    imports.wbg.__wbg_random_09364f2d8647f133 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

