export default class DoublyLinkedListNode {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback) {
    return typeof callback === "function"
      ? callback(this.value)
      : `${this.value}`;
  }
}
