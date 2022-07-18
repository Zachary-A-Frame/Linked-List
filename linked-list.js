/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // create a new node
    const newNode = new Node(val);
    // Check if linked list is empty
    if (!this.length) {
      // set the new node as the Linked List's `tail`
      this.tail = newNode;
    } else {
      // set the new node's `next` to the Singly Linked List's current `head`
      newNode.next = this.head;
    }
    this.head = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */
  pop() {
    if (!this.length) {
      return null
    } else {
      let currentNode = this.head;
      let secondToLastNode = this.head;
      while (currentNode.next) {
        secondToLastNode = currentNode;
        currentNode = currentNode.next;
      }
      secondToLastNode.next = null;
      this.tail = secondToLastNode;
      this.length -= 1;
      // if the Linked List now is empty, set its `head` and `tail` to `null`
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
      return currentNode.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.length) {
      return null
    } else {
      if (!this.length) {
        return null;
      } else {
        // set the current `head` as the node we want to remove (`nodeToRemove`)
        const nodeToRemove = this.head;
        this.head = this.head.next;
        this.length -= 1;
        if (!this.length) {
          this.tail = null;
        }
        return nodeToRemove.val;
      }
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      return null;
    } else {
      let currentNode = this.head;
      let count = 0;

      while (count < idx) {
        currentNode = currentNode.next;
        count += 1;
      }

      return currentNode.val;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // get the one before it
    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }

}

/** removeAt(idx): return & remove item at idx, */


module.exports = LinkedList;
