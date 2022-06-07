---
title: TLS
---

首先明确下，TLS（transport layer secure）是一个应用层协议，它使用的传输层协议为 TCP。SSL 是 TLS 的前身，或者说它们是一个东西的两个名字，本文不再区分，也不再使用 SSL/TLS 这样的写法，直接称为 TLS。

要建立一个 TLS 链接，首先要进行握手。TLS 握手主要完成 3 件事：

* Exchanging cipher suites and parameters
* Authenticating one or both parties
* Creating/Exchanging symmetric session keys


不同的软件支持的 TLS 版本，MacOS、Windows 、Linux 之间可能不同，Firefox 和 Chrome 之间支持情况也不同，WindowsServer、Nginx、Apache 之间的支持情况也不同。客户端和服务器端需要协商使用他们共同支持的 cipher suite。

客户端要验证服务端发来的证书，所有受信的证书都由 CA 发布。

握手过程如下（--> 表示客户端向服务端发送，<== 表示服务端向客户端发送）：

1. --> Client Hello
2. <== Server Hello
3. <== Certificate
4. <== Server Key Exchange
5. <== Server Hello Done
6. --> Client Key Exchange
7. --> Change Cipher Spec
8. --> Finished
9. <== Change Cipher Spec
10. <== Finished

说明:
1. 第一个消息叫“ClientHello”。这个消息包含了客户端支持的所有 cipher suite，还包含一个巨大的、随机生成的质数，叫“client random”。
2. 服务端说 “ServerHello”。这个消息里包含了链接的一些参数，有服务端选择使用的 cipher suite，和服务端随机生成的大质数，叫“server random”。如果服务端不支持客户端的任何 cipher suite，链接中断。
3. 这一步，服务端把它的 TLS 证书链发给客户端，证书链包含 leaf certificate 和 intermediate certificate。为验证链接的身份，这个 TLS 证书是由一个 CA 签发的，这使得客户端能够自己去验证证书是否合法。客户端收到后，会检查证书的身份，包括检查证书的数字签名、验证证书链以及其他的潜在问题（比如证书是否过期、域名是不是不对等）。
4. 这是一个可选的消息，仅在特定的 key exchange 方法（比如 Diffe-Hellman）中使用，这里要求服务端提供额外数据。
5. 服务端说我好啦。
6. 