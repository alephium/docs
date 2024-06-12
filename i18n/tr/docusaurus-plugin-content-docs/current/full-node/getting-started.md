---
sidebar_position: 10
title: Başlarken
sidebar_label: Başlarken
---

## Gereksinimler

Bilgisayarınızda Java'nın kurulu olduğundan emin olun (11 veya 17 önerilir):

- Windows veya macOS: [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
- Ubuntu: Terminal'de `sudo apt install default-jdk` komutunu çalıştırın

## Uygulama Dosyasını İndirme

Dosyayı `alephium-x.x.x.jar` [Github sürümünden](https://github.com/alephium/alephium/releases/latest) indirin (bu şekilde çift tıklamayın, bu şekilde başlatılamaz).

## Düğümünüzü Başlatın

1. Arama kutusunu açın ve `Terminal` (Mac ve Ubuntu için) veya `Command Prompt` (Windows için) yazın.
2. Terminal/Komut İstemi programında, **alephium-x.x.x.jar** dosyasının kaydedildiği klasöre girmek için `cd your-jar-file-path` komutunu yazın.
3. Aşağıdaki komutu yazın ve Enter tuşuna basarak tam düğümü başlatın:
   ```shell
   java -jar alephium-x.x.x.jar
   ```

🎉 _**Tada, düğümünüz çalışıyor**_

- Düğümünüz ağ ile senkronize olmaya başlayacaktır. İlk kez uzun sürebilir. Düğümünüz tamamen senkronize olmuş olacaktır terminal günlüklerindeki blok yüksekliği en son bloklardaki ile eşit olduğunda ([explorer]'da bulunan).
- Terminali kapatırsanız, düğüm kapanacaktır.
- Tüm blok zinciri verileri ev klasörünüzün altındaki `.alephium` klasöründe saklanır[^1].

### Swagger

Tam düğümle etkileşimde bulunmak için OpenAPI kullanıyoruz. [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) adresinden Swagger UI'yi doğrudan açabilirsiniz.

Alternatif olarak, herhangi bir OpenAPI istemcisini
bizim deposundaki (`openapi.json` dosyasını ([indir](https://github.com/alephium/alephium/raw/master/api/src/main/resources/openapi.json))) içe aktarabilirsiniz.

### Madencilik

Madencilik için öğretici için [Solo Madencilik Kılavuzu](mining/solo-mining-guide.md) veya [Havuz Madencilik Kılavuzu](mining/pool-mining-guide.md)'nu takip edebilirsiniz.

### Cüzdan

Masaüstü cüzdanı buradan [GitHub](https://github.com/alephium/desktop-wallet/releases/latest) indirebilirsiniz.

Alternatif olarak, tam düğümümüz gelişmiş özelliklere sahip bir yerleşik cüzdan içerir, bunu nasıl kullanacağınızı öğrenmek için [Cüzdan Kılavuzu](wallet/node-wallet-guide.md)'nu takip edebilirsiniz.

[^1]: Ev klasörü sistemlerinize bağlıdır: Windows'ta `C:\Users\<your-username>`, macOS'ta `/Users/<your-username>`, Linux'ta `/home/<your-username>`.

[explorer]: https://explorer.alephium.org
