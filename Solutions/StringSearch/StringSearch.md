# String Search

### (ie indexOf)

---

# Prompt

You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).You can think of the problem as looking for a particular substring inside another string and returning the starting index of that substring.

---

# Examples

```javascript
indexOf('or', 'hello world'); // should return 7
indexOf('hello world', 'or'); // should return -1
indexOf('howdy', 'hello world'); // should return -1
indexOf('oox', 'ooboxoooxo'); // should return 6
indexOf('kittens', 'kittens'); // should return 0 
```

---

## Common approaches

**built-in methods**

- Most students' first instincts will be to use built-in string methods like `indexOf()`, `includes()` or `substring()`. `indexOf()` is, of course, explicitly forbidden; steer them away from methods like `includes()` and `substring()`.


- Many whiteboard interviews will be language-agnostic and focus on the underlying concepts. You will want to show that you understand how these methods work, not that you happened to read the right documentation the night before.


- You may actually be adding more (hidden) complexity. Look into how `indexOf()`, `includes()` and `substring()` work under the hood. Many built-in methods actually add an operation that's O(n), or worse.

---

**split() and loop**

- Some students also move to split the haystack into an array of characters, and then loop through.

- This approach would work; but imagine the space complexity of generating a new array and then holding it in memory for a very, very large haystack. You would be introducing another O(n) dimension in time and space, where n is the length of the haystack.


# Solution(s)

```javascript
function indexOf(needle, haystack) {
  for (let hIdx = 0; hIdx < haystack.length; hIdx++) {
    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
      if (nIdx + 1 === needle.length) return hIdx;
    }
  }
  return -1;
}
```
**Small Optimization**

When iterating through haystack, we don't want to keep going if we already have less characters in haystack than the length of needle. 

```javascript
// let n be the length of the needle
// let h be the length of the haystack

function indexOf(needle, haystack) {
  //looping through haystack takes O(h) time
  for (let hIdx = 0; hIdx < haystack.length -(needle.length - 1); hIdx++) {
    for (let nIdx = 0; nIdx < needle.length; nIdx++) { // looping through needle takes O(n) time
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break; //comparisons of chars take O(1) time
      if (nIdx + 1 === needle.length) return hIdx; //O(1) time
    }
  }
  return -1;
}
```
---

# Big O

Where h is the haystack size and n the needle size, the solution is O(h\*n).


# Solution with a string method (.slice)

```javascript
function indexOf(needle, haystack) {
  for (let i = 0; i < haystack.length -(needle.length - 1); i++) {
      if (haystack[i] === needle[0]) {
         let temp = haystack.slice(i, i + needle.length)
         if(temp === needle) return i
      }
  }
  
  return -1;
}
```
Time Complexity is the same as our other solution, O(h\*n)
