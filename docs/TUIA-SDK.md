# 推啊（短链接）JS 说明文档

## 概述

通过使用推啊（短链接）JS，媒体可在自身 H5 页面内载入推啊互动活动。

## 使用说明

> 步骤零：确认是否可用
请确保webview支持ES5语法，并且支持iframe。

> 步骤一：引入 JS 文件

在需要初始化 JS 的页面上引入如下 JS 文件，(支持 https): http://yun.tuisnake.com/h5-mami/short-link/v1.1.1/short-link.min.js

> 步骤二：通过 init 接口初始化

如果需要使用 JS 的方法，使用的页面必须先初始化，否则将无法调用（请使用合法的有效参数）

```
Tsdk.init({
  appKey: '加密的appid',  //  系统分配 (在推啊后台‘我的媒体’获取appkey)
  slotId: '10000',       //  系统分配的广告位Id (在推啊后台‘我的广告位’获取slotId) 
  deviceId: '123456',    //  此信息将有利于我们对于用户的精准识别，从而推荐更优质合适的广告，从而有助于提升媒体收益。
  dom: '#index',         //  dom节点（该dom节点必须要有宽高，确保在调用方法是该dom节点已存在与页面上)
  debug: false,          //  选择是否开启debug模式
  userId: 'fgdfgdfg'     //  用户id，用于对接虚拟奖品，确定用户身份
})
```

> 步骤三：通过 ready 接口处理成功验证

```
Tsdk.ready(function() {
  // 如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
  // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
})
```

> 步骤四：监听 error 事件处理执行过程中的错误信息

```
Tsdk.on('error', function(err) {
  // 在里面处理err
})
```

## 接口说明

> init

用于 sdk 初始化

```
Tsdk.init({
  appKey: '加密的appid',
  slotId: '10000',
  deviceId: '123456',
  dom: '#index',
  debug: false,
  userId: 'fgdfgdfg'
})
```

| 参数名 | 必填 | 类型   | 示例值    | 描述               |
| ------ | :--: | ------ | --------- | ------------------ |
| appKey |  是  | string | iamappkey | 系统分配 (在推啊后台‘我的媒体’获取appkey) |
| slotId |  是  | string | iamappkey | 系统分配的广告位Id (在推啊后台‘我的广告位’获取slotId) |
| deviceId |  是  | string | iamappkey | 此信息将有利于我们对于用户的精准识别，从而推荐更优质合适的广告，从而有助于提升媒体收益。 |
| dom | 是 | string | '.dom' | 媒体传入挂载点 |
| debug |  否  | boolean | false | 是否开启debug模式 |
| userId |  是  | string | 'dgfgdf' | 媒体用户id |


说明：
  deviceId为设备号，在为空的情况下，会自动根据规则生成。
  userId为媒体的自身用户，用于对接虚拟奖品，确定用户身份。
  (如果用户体系中只存在userId或者deviceId, 两者传入相同的userId或者deviceId即可)

## 事件说明

> showError

```
用于上报错误信息
```
| 参数名 | 必填 | 类型   | 示例值    | 描述               |
| ------ | :--: | ------ | --------- | ------------------ |
| type | 是 | string | iamappkey | 错误类型 |
| code | 是 | string | iamappkey | 错误状态码 |

```
主要错误码：
'0000000': '成功';
'0000001': '参数缺失或无效';
'1000001': 'appKey 错误或者不存在';
'1000002': 'slotId 错误或者不存在';
'1000003': 'token 过期';
'1000004': '订单不存在';
'1000005': '系统错误';
'9999999': '发生未知错误';
```
> ready

```
JS 在初始化完毕的时候会触发
```
如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

> close

```
由于推啊互动活动是用iframe的形式挂在页面之中的，所以活动的关闭需要对接方来提供的

在触发媒体（对接方的关闭事件的时候）请调用
Tsdk.close() 来告知sdk。
```

## 额外的JS API
如果在引用JSSDK的页面注入jsapi, 在特定的时候优先去调用它。（该方法需要媒体注入在页面内，供JSSDK调用）

1、需要新打开页面时（例如：跳转我的奖品页，跳转广告落地页）。
```
  window.TAHandler.openUrl(JSON)
    JSON <string> "{'url': '//www.tuia.cn'}"
```

## 常见错误及解决方法
在jssdk中报错会触发error事件，
```
Tsdk.on('error', function(err) {
  // 这里会将错误信息捕获
})
```
调用 init 接口的时候传入参数 debug: true 可以开启 debug 模式，页面会出现调试工具。
debug所需模块会异步加载到页面。
