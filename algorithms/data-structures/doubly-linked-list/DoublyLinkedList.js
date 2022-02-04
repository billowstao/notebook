import DoublyLinkedListNode from "./DoublyLinkedListNode";
import Comparator from "../../utils/Comparator";

export default class DoublyLinkedList {
  /**
   * @param comparatorFunction - 比较函数
   */
  constructor(comparatorFunction) {
    this.head = null;

    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 前向添加值
   *
   * @param {*} value - 值
   */
  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 添加值
   *
   * @param value 值
   * @returns 双向链表
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    newNode.previous = this.tail;

    this.tail = newNode;

    return this;
  }

  /**
   * 删除
   *
   * @param value - 删除的值
   * @returns 删除的节点
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = null;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = deletedNode.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }
}
