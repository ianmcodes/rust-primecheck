use num_traits::pow;
use rand::Rng;
use std::io;

fn main() {
    loop {
        println!("Enter number to check");
        let mut n = String::new();
        io::stdin().read_line(&mut n).expect("Faild to read line");
        let n: u32 = match n.trim().parse() {
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

fn prime_check(n: u32, mut k: u32) -> bool {
    if n == 1 || n == 3 {
        return true;
    } else if n % 2 == 0 {
        return false
    }
    let mut rng = rand::thread_rng();
    while k > 0 {
        let a = rng.gen_range(2, n - 2);
        println!("n: {}; k: {}; a: {}", n, k, a);
        let x = pow(a,n-1);
        println!("(a^(n-1)): {}", x);
        if (x % n) != 1 {
            return false
        }
        k = k - 1;
    }
    return true
}
