---
title: Java 11 HttpClient 允许不安全的 SSL
---

原文: https://www.javacodemonk.com/allow-insecure-ssl-in-java-11-httpclient-6e677c76

*We will learn how to allow insecure SSL connections (expired certificate, self-signed certificates) in Java 11 HttpClient.*

There could be various reasons for bad SSL - expired SSL certificate, wrong host in SSL certificate, self-signed certificate, untrusted root certificate, revoked certificate, weak key used for certificate, etc.

## Using SSL Context settings

We will create and initialize an instance of SSLContext that accepts all SSL certificates without any kind of verification. **Such SSL context shall never be used in production environment.**

Java 11 HttpClient with Insecure SSLContext:

```kotlin
fun testIgnoreSSL(url: String) {
    val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
        override fun getAcceptedIssuers(): Array<X509Certificate>? = null
        override fun checkClientTrusted(certs: Array<X509Certificate>, authType: String) {}
        override fun checkServerTrusted(certs: Array<X509Certificate>, authType: String) {}
    })

    val sslContext: SSLContext = SSLContext.getInstance("TLS")
    sslContext.init(null, trustAllCerts, SecureRandom())

    val httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(10000))
            .sslContext(sslContext) // SSL context 'sc' initialised as earlier
            .build()

    val requestBuilder = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .GET()
            .build()

    val response = httpClient.send(requestBuilder, HttpResponse.BodyHandlers.ofString()); // sends the request
    println(response.body())
}
```

## Disabling the host verification

If we just want to disable a particular check for hostname verification, then we can use either of the two below mentioned approaches:


Using command line argument to JVM

```
-Djdk.internal.httpclient.disableHostnameVerification
```

Programmatically setting the property before httpclient instance creation

```
val props = System.getProperties()
props.setProperty("jdk.internal.httpclient.disableHostnameVerification", "true")
//TODO: Initialize the HttpClient now
```