/* tslint:disable */
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
export function rng_gen_range(min: BigInt, max: BigInt): BigInt;
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
export function modpow(base: BigInt, exponent: BigInt, modulus: BigInt): BigInt;
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
export function prime_check(n: BigInt, k: number): boolean;

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        