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
   * @returns 删除的节点
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
   * 搜索
   *
   * @param value - 检索的值
   * @param findCallback - 检索回调
   * @returns 搜索的节点
   */
  find(value, findCallback) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (!currentNode) {
      // 如果指定查找回调，通过回调查找节点
      if (typeof findCallback === "function" && findCallback(currentNode)) {
        return currentNode;
      }

      if (this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 删除尾节点
   *
   * @returns 删除的尾节点
   */
  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // 如果链表存在很多节点
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * 删除头节点
   *
   * @returns 删除的头节点
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleteHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteHead;
  }

  /**
   * 将数组转换为链表
   *
   * @param values - 数组数值
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * 转换为数组
   *
   * @returns 数组
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * 输出字符串
   *
   * @param callback - 转换回调函数
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback).toString());
  }

  /**
   * 反转链表
   *
   * @returns 反转的链表
   */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;

      // 修改当前节点链接指向前一个节点
      currNode.next = prevNode;

      // 向前移动 `prevNode`, `currNode`
      prevNode = currNode;
      currNode = nextNode;
    }

    // 重新设置 `head`, `tail`
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
