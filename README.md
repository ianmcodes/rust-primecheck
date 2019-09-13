# Implimentation of Fermat Prime Test in Rust! #

Now converted and built for WebAssembly!!

## Wait, Why? ##
I'm trying to lean Rust and I want to build something that is not just from a tutorial.

## Why are you trying to lean Rust? ##
Rust has great support and tooling for WebAssembly. Really, being able to build WebAssembly modules is the goal.

## OK, but why a Fermat Prime Test? ##
Because it's something "bigger than a breadbox, smaller than a house". A lot of WebAssembly articles and tutorials show you some graphics heavy game or desktop application ported to WebAssembly, then only show code for building a trivial add function. I want something in between. The Fermat Prime Test is not trivial, but is simple enough that anyone with some programming knowledge should be able to follow what is going on.

# Building #

## Prerequisites ##

 * Rust and Cargo ~1.37.0
 * wasm-pack ~0.8.1
  * https://rustwasm.github.io/wasm-pack/installer/

## Command ##
`wasm-pack build -t web`