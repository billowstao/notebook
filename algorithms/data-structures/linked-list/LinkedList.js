import Comparator from "../../utils/Comparator";
import LinkedListNode from "./LinkedListNode";

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;

    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 前向添加
   *
   * @param {*} value - 值
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 添加
   *
   * @param {*} value - 值
   */
  append(value) {
    const newNode = new LinkedList(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * 添加到索引位置
   *
   * @param value - 值
   * @param rawIndex - 索引(从 1 开始)
   */
  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedList(value);
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
  }

  /**
   * 删除
   *
   * @param {*} value - 删除的节点
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be delete.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * TODO: 搜索
   */
}
