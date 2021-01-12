# Linked List Cycle

---

## Interviewer Prompt

If you're given a linked list head node, write a function that will return true if there is a CYCLE in the list, and return false if there is no cycle.

```
Ex: 
Cycle looks like: 1 -> 2 -> 3 -> 4 -> 5
                            ^---------|
Returns true

No cycle looks like: 1 -> 2 -> 3 -> 4 -> null

Returns false
```
---

## Example Output

```javascript
containsCycle(llWithCycle) -> true
containsCycle(llWithoutCycle) -> false
```

---

## Interviewer Guide

This problem can be approached with a hash table or with 2 pointers. Make sure you understand both solutions so that you can guide the interviewee no matter which option they take.

You can give your interviewee the following code to get started, but see if they ask the right question about whether they need to create a node class first. 

```javascript
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

You can also provide your interviewee with the following linked list creation code to test their solution:

```javascript
 const repeatedNode = new Node(4);
 const llWithCycle = new Node(1, new Node(2, repeatedNode));
 repeatedNode.next = new Node(5, new Node(1, repeatedNode));
 const llWithoutCycle = new Node(1, new Node(2))
```

---

## Solution and Explanation (a)

Create a hash table of nodes that have been seen already, looping through the linked list. If you arrive at a node you've seen, the list has a cycle. If you get to the end and you haven't encountered a node you've seen (in the 'seen' object), the lsit does not have a cycle.

---

### Solution Code (a1)

```javascript
function containsCycle(head) {
let seen = [];
let currentNode = head;

while (currentNode.next !== null) {
  if (seen.includes(currentNode.next)) {
    return true;
  }
  seen.push(currentNode);
  currentNode = currentNode.next;
}
return false;
}
```

### Solution Code (a2)

```javascript
function containsCycle(head) {
let seen = {};
let currentNode = head;

while (currentNode.next !== null) {
  if (seen[currentNode.next]) {
    return true;
  }
  seen.[currentNode] = true;
  currentNode = currentNode.next;
}
return false;
}
```

### Time and Space Complexity

Time complexity : For sol a1, O(n^2). We visit each of the n elements in the list at most once, and loop through the seen array on each iteration. Adding a node to the hash table costs only O(1) time. For sol a2, O(n). We visit each of the n elements on the list at most once, and only check for whether we've seen the current node in our seen object once (don't have to loop through). Note: you can also use a JavaScript Set if you're interested.

Space complexity: O(n). The space depends on the number of elements added to the hash table, which contains at most n elements.

---

## Solution and Explanation (b)

You can also implement a solution with 2 pointers.

---

### Solution Code

```javascript
function containsCycle(head) {
  if (head === null) {
    return false
  }
  let slow = head;
  let fast = head.next

  while (slow != fast) {
    if (fast === null || fast.next === null) {
      return false
    }
    slow = slow.next;
    fast = fast.next.next
  }
  return true;
}
```
### Time and Space Complexity

Time complexity : O(n). Let us denote n as the total number of nodes in the linked list. To analyze its time complexity, we consider the following two cases separately.

List has no cycle:
The fast pointer reaches the end first and the run time depends on the list's length, which is O(n).

List has a cycle:
We break down the movement of the slow pointer into two steps, the non-cyclic part and the cyclic part:

The slow pointer takes "non-cyclic length" steps to enter the cycle. At this point, the fast pointer has already reached the cycle.

Both pointers are now in the cycle. Consider two runners running in a cycle - the fast runner moves 2 steps while the slow runner moves 1 steps at a time. Since the speed difference is 1, it takes (distance between the 2 runners / difference of speed) loops for the fast runner to catch up with the slow runner. As the distance is at most "cyclic length K" and the speed difference is 1, we conclude that number of iterations = almost "cyclic length K".

Therefore, the worst case time complexity is O(N+K), which is O(n).

Space complexity : O(1). We only use two nodes (slow and fast) so the space complexity is O(1).

---
