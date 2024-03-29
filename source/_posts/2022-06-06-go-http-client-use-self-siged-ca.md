---
title: Go 语言 https 客户端如何使用自签名 CA
---

[戳这里见原文](https://forfuncsake.github.io/post/2017/08/trust-extra-ca-cert-in-go-app/)。本文把代码部分复制过来备份，因为代码部分足够清楚明了了。

代码如下：

```go
package main

import (
	"crypto/x509"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const (
	localCertFile = "/usr/local/internal-ca/ca.crt"
)

func main() {
	insecure := flag.Bool("insecure-ssl", false, "Accept/Ignore all server SSL certificates")
	flag.Parse()

	// Get the SystemCertPool, continue with an empty pool on error
	rootCAs, _ := x509.SystemCertPool()
	if rootCAs == nil {
		rootCAs = x509.NewCertPool()
	}

	// Read in the cert file
	certs, err := ioutil.ReadFile(localCertFile)
	if err != nil {
		log.Fatalf("Failed to append %q to RootCAs: %v", localCertFile, err)
	}

	// Append our cert to the system pool
	if ok := rootCAs.AppendCertsFromPEM(certs); !ok {
		log.Println("No certs appended, using system certs only")
	}

	// Trust the augmented cert pool in our client
	config := &tls.Config{
		InsecureSkipVerify: *insecure,
		RootCAs:            rootCAs,
	}
	tr := &http.Transport{TLSClientConfig: config}
	client := &http.Client{Transport: tr}

	// Uses local self-signed cert
	req := http.NewRequest(http.MethodGet, "https://localhost/api/version", nil)
	resp, err := client.Do(req)
	// Handle resp and err

	// Still works with host-trusted CAs!
	req = http.NewRequest(http.MethodGet, "https://example.com/", nil)
	resp, err = client.Do(req)
	// Handle resp and err

	// ...
}
```