use rand::Rng;
use std::io;

fn main() {
    loop {
        println!("Enter number to check");
        let mut n = String::new();
        io::stdin().read_line(&mut n).expect("Faild to read line");
        let n: u64 = match n.trim().parse() {
            Ok(num) => num,
            Err(_) => continue
        };
        if prime_check(n, 10) {
            println!("{} is probably prime", n);
        } else {
            println!("{} is not prime", n);
        }
    }
}

fn modpow(mut base: u64, mut exponent: u64, modulus: u64) -> u64 {
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
    return result
}

fn prime_check(n: u64, mut k: u32) -> bool {
    if n == 1 || n == 3 {
        return true;
    } else if n % 2 == 0 {
        return false
    }
    let mut rng = rand::thread_rng();
    while k > 0 {
        let a: u64 = rng.gen_range(2, n - 2);
        println!("n: {}; k: {}; a: {}", n, k, a);
        let x = modpow(a,n-1, n);
        println!("(a^(n-1)) % n: {}", x);
        if x != 1 {
            return false
        }
        k = k - 1;
    }
    return true
}
