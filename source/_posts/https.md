---
title: 我们在说 https 证书的时候，实际在说些什么？
---

在说 https 的时候，少不了要说 SSL、TLS，也可能会说证书、根证书、证书链、密钥、公钥，有时甚至我们会需要自己去创建证书文件，并把这些文件正确地配置到指定的地方。

本文尝试对此问题做简单回答。

## HTTP 和 HTTPS

HTTP 是一个应用层协议。一个 HTTP 报文就是一段明文的文本，尽管它是有结构的。HTTP 使用的传输层协议是 TCP，数据可以通过 HTTP 在客户端和服务器之间进行可靠传输，但这里里说的“可靠”是指数据通过 TCP 协议传输时不会丢失，我们并不能保证 HTTP 数据没有被篡改。此外，我们也没有办法避免数据泄露。其实只要我们能保证 HTTP 报文不被泄露，那么它就不会被篡改。

{% note info %}
如果你想了解 HTTP 的更多细节的话，可以去 [MDN 的 HTTP 部分](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)查看。不会被墙，放心访问。
{% endnote %}



```
┏━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━┓
┃    HTTP    ┃  ┃    HTTP    ┃ ┈┈┈╮
┣━━━━━━━━━━━━┫  ┣━━━━━━━━━━━━┫    ├ HTTPS
┃    TCP     ┃  ┃   SSL/TLS  ┃ ┈┈┈╯
┣━━━━━━━━━━━━┫  ┣━━━━━━━━━━━━┫
┃    ...     ┃  ┃    TCP     ┃
                ┣━━━━━━━━━━━━┫
                ┃    ...     ┃

```

需要 https 的原因：

1. Privacy 私密性：http 是明文传输，会被窃听，https 希望改变这个现状。问: http 也可以传输密文啊？
2. Integrity 完整性：中间人修改了传输的数据，导致接收方收到的和发送方发送的数据不一致。问: https 也有中间攻击问题啊？
3. Identification 身份识别：这个要求是说我可以检查这个消息是来自指定的计算机。

Https 需要一个方法来保证以上三个性质，还需要一个加密机制。

对称密钥算法：用同一个 key 来进行加密和解密
非对称加密算法：公钥和私钥配合工作，只有私钥才可以解密公钥加密的密文。

https 握手过程：

1. 客户端向服务端发起请求，带上自己支持的 SSL/TLS 算法版本（或者叫 cipher suite）
2. 服务端根据自己的支持情况和客户端的支持情况，选个最好的算法，然后把相应证书（里面带有公钥）发给客户端
3. 客户端检查证书是否合法，然后生成一个 pre-master key，并用公钥加密这个 pre-master key 后发送给服务端
4. 服务端用私钥解密得到这个 pre-master key。这时 https 链接正式建立

链接建立后，客户端和服务端双方用对称加密算法进行通信。

SSL: Secure Sockets Layer， created by Netscape

SSLv1 从未 release，1995年推出 SSLv2。之后因为 SSLv2 有安全问题，所以推出了 SSLv3。
后来微软和 Netscape 大战，Netscape 把 SSL 的控制权交割了 IETF。
1999 年，IETF 推出了 TLS 1.0（或者说是 SSL 3.1）。

TLS: Transport Layer Security.

TLS 1.1 - 2006
TLS 1.2 - 2008

SSL 3.0 在 2015 年被废弃

TLS 1.3 - 2018

CA: Certificate Authorities，是一个第三方机构，它有三个主要目标：
1. 发证书
2. 确认证书 owner 的身份
3. 证明这个证书是有效的

Symantec， Comodo，Lets Encrypt、DigiCert GoDaddy

称为 CA 是一项很严肃的事，你需要被 root store 信任。root store 是一个被信任的 CA 数据库。苹果、微软、Mozilla 各自运营着自己的 root store，它们被预先安装在你的电脑或者浏览器中。

你需要买哪种证书呢？一般有三种风格：
1. Domain validated. The certificate just verifies the domain name, and nothing else. You probably need this one.
2. Organization validated. The certificate requires the validation and manual verification of the organization behind the certificate.
3. Extended validation. The certificate requires an exhaustive verification of the business.

如何验证证书？

CA 在发布证书时，会先用预先安装在 root store 中的根证书对要发布的证书签名。
证书的验证过程基于一个“chain of trust”。
浏览器发起一个 https 请求并得到一个证书，这个证书不是根证书。
然后浏览器下载用于签名刚刚等到的那个证书的证书，这个证书还是不根证书。
然后浏览器下载用于签名刚刚等到的那个证书的证书，这个证书还是不根证书。
。。。
直到找到根证书。

得到根证书后，就认为发证的站点是受信任的。
如果最后得不到根证书，那么这个证书就是不受信任的。

但是为何使用自己签名的证书时也需要 CA 呢？自签名的证书也没什么问题，不受信任的原因是 CA 不在客户端 root store 里。


TODO: 输入 http 版本的网址，有的网站会跳转到 https 的版本，是发生了什么？为什么有的不会？


TODO: curl -v

------------

参考:

- [SSL/TLS Capabilities of Your Browser](https://clienttest.ssllabs.com:8443/ssltest/viewMyClient.html)
- [How Https Works](https://howhttps.works/)
- [OpenSSL Certificate Authority - Jamie](https://jamielinux.com/docs/openssl-certificate-authority/index.html)
- [使用自定义根 CA 生成 Azure 应用程序网关自签名证书 - Microsoft](https://docs.microsoft.com/zh-cn/azure/application-gateway/self-signed-certificates)
- [OpenSSL Creating a Certificate Authority (CA) - Node Security](https://node-security.com/posts/openssl-creating-a-ca/?msclkid=39909730cef711ec83184b67c5e22cfd)

