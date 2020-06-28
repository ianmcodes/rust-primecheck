use wasm_bindgen::prelude::*;

/// Generates a random number in the given range.
///
/// # Arguments
/// * `min` - Rust `u64`; JS `BigInt`;
/// * `max` - Rust `u64`; JS `BigInt`;
///
/// # Example
/// ```js
/// var num = module.rng_gen_range(2n, 512n);
/// ```
#[wasm_bindgen]
pub fn rng_gen_range(min: u64, max: u64) -> u64 {
    let mut val: u64 = 0;
    let range: f64 = max as f64 - min as f64;
    let bits: f64 = range.log2().ceil();
    let bytes: u8 = (bits / 8.0).ceil() as u8;
    let mut byt_arr: [u8; 8] = [0; 8];
    let crypto = web_sys::window().unwrap().crypto().unwrap();
    let _result = crypto.get_random_values_with_u8_array(&mut byt_arr);
    let mut p: u64 = (bytes as u64 - 1) * 8;
    for i in 0..bytes {
        val += byt_arr[i as usize] as u64 * (2 ^ p);
        p -= 8;
    }
    if val > (range as u64) {
        return rng_gen_range(min, max);
    }
    return min + val;
}

/// Implementation of modular exponentiation for u64. Exposed to JS.
/// `(b ^ e) % m`
///
/// # Arguments
/// * `base` - Rust `u64`; JS `BigInt`; The base.
/// * `exponent` - Rust `u64`; JS `BigInt`; The exponent.
/// * `modulus` - Rust `u64`; JS `BigInt`; The modulus.
///
/// # Example
/// ```js
/// var num = module.modpow(2n,10n,10n);
/// ```
#[wasm_bindgen]
pub fn modpow(mut base: u64, mut exponent: u64, modulus: u64) -> u64 {
    if modulus == 1 {
        return 0
    }
    let mut result: u64 = 1;
    base = base % modulus;
    while exponent > 0 {
        if exponent % 2 == 1 {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

/// Implementation of Fermat Prime Test. Returns true if the number is probably 
/// prime, false if it is composite. This is exposed to JavaScript.
/// 
/// # Arguments
/// * `n` - Rust `u64`; JS `BigInt`; The number to test.
/// * `k` - Rust `u32`; JS `Number`; Number of time to run the test. Improves accuracy of result.
///
/// # Example
/// ```js
/// // remember that the first argument needs to be a BigInt, hence the 'n' at 
/// // the end. Could also use `BigInt(5)`. 
/// var result = module.prime_check(5n, 10);
/// ```
#[wasm_bindgen]
pub fn prime_check(n: u64, mut k: u32) -> bool {
    if n == 1 || n == 3 {
        return true;
    } else if n % 2 == 0 {
        return false;
    }
    // let mut rng = rand::thread_rng();
    while k > 0 {
        // let a: u64 = rng.gen_range(2, n - 2);
        let a: u64 = rng_gen_range(2, n - 2);
        println!("n: {}; k: {}; a: {}", n, k, a);
        let x = modpow(a,n-1, n);
        println!("(a^(n-1)) % n: {}", x);
        if x != 1 {
            return false;
        }
        k = k - 1;
    }
    return true;
}
