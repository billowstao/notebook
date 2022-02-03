export default class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return typeof callback === "function"
      ? callback(this.value)
      : `${this.value}`;
  }
}
