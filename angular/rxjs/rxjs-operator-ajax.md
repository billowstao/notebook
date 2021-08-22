# RxJS 操作符 - `ajax`

- [RxJS 操作符 - `ajax`](#rxjs-操作符---ajax)
  - [描述](#描述)
  - [使用 `ajax()` 获取 API 响应的对象](#使用-ajax-获取-api-响应的对象)
  - [使用 `ajax.json()` 获取 API 数据](#使用-ajaxjson-获取-api-数据)
  - [使用 `ajax()` 以对象为参数和 POST 方法，延迟 2 秒](#使用-ajax-以对象为参数和-post-方法延迟-2-秒)
  - [使用 `ajax()` 获取数据，请求中返回错误对象](#使用-ajax-获取数据请求中返回错误对象)

> Rx 对象上的 ajax 操作符

```ts
const ajax: AjaxCreationMethod;
```

## 描述

它为 Ajax 请求创建一个可观察对象，该对象可以是带有 `url`、`header` 等的请求对象，也可以是 `url` 字符串。

## 使用 `ajax()` 获取 API 响应的对象

```ts
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const obs$ = ajax(`https://api.github.com/users?per_page=5`).pipe(
  map((userResponse) => console.log("users: ", userResponse)),
  catchError((error) => {
    console.log("error: ", error);
    return of(error);
  })
);
```

## 使用 `ajax.json()` 获取 API 数据

```ts
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`).pipe(
  map((userResponse) => console.log("users: ", userResponse)),
  catchError((error) => {
    console.log("error: ", error);
    return of(error);
  })
);
```

## 使用 `ajax()` 以对象为参数和 POST 方法，延迟 2 秒

```ts
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const users = ajax({
  url: "https://httpbin.org/delay/2",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "rxjs-custom-header": "Rxjs",
  },
  body: {
    rxjs: "Hello World!",
  },
}).pipe(
  map((response) => console.log("response: ", response)),
  catchError((error) => {
    console.log("error: ", error);
    return of(error);
  })
);
```

## 使用 `ajax()` 获取数据，请求中返回错误对象

```ts
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const obs$ = ajax(`https://api.github.com/404`).pipe(
  map((userResponse) => console.log("users: ", userResponse)),
  catchError((error) => {
    console.log("error: ", error);
    return of(error);
  })
);
```
