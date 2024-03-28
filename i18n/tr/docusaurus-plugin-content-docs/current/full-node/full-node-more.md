---
sidebar_position: 40
title: Daha Fazla ve Sorun Giderme
sidebar_label: Daha Fazla ve Sorun Giderme
---

## API Anahtarı

Tam düğümünüzün dinlenme uç noktalarına erişimi sınırlamak için API anahtarını kullanmak iyi bir uygulamadır.

### API Anahtarı Kurulumu

Lütfen `user.conf` dosyanıza aşağıdaki satırları ekleyerek sıfırları kendi anahtarınızla (>= 32 karakter) değiştirin.

```
alephium.api.api-key = "--- 32 karakterden uzun kendi anahtarınız"
```


Bu değişikliğin geçerli olması için tam düğümünüzü yeniden başlatın.

#### API Anahtarı Oluşturma

GNU/Linux üzerinde: `cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 48 | head -n 1`

### API Anahtarı Kullanımı

1. Swagger UI'nin sağ üstündeki `Authorize` düğmesine tıklayın:
   ![full-node-api-key-auth0](media/full-node-api-key-auth0.png)

2. Değer kutusuna anahtarınızı yazın ve yetkilendirme düğmesine tıklayın:
   ![full-node-api-key-auth1](media/full-node-api-key-auth1.png)

Artık Swagger UI'yi API anahtarı olmadan kullanabilirsiniz.

## Tam düğüm API'sinin genel erişilebilir hale getirilmesi nasıl yapılır?

1. Yukarıdaki rehbere uygun şekilde API anahtarınızı ayarlayın.

2. Aşağıdaki satırları `user.conf` dosyanıza ekleyin ve tam düğümünüzü yeniden başlatın.

```
alephium.api.network-interface = "0.0.0.0"
```

## Aynı alt ağdaki başka bir bilgisayardan tam düğümün Swagger UI'sine nasıl erişilir?

1. Aşağıdaki satırları `user.conf` dosyanıza ekleyin ve tam düğümünüzü yeniden başlatın.

```
alephium.api.network-interface = "0.0.0.0"
```


2. Swagger UI'nin `host`'unu tam düğümünüzün alt ağ IP'sine değiştirin.

## Hata "java.lang.AssertionError: assumption failed"

Bu hata genellikle düğüm senkronizasyonu sırasında bağlantı kaybından kaynaklanır ve bazı dosyaların bozulduğu anlamına gelir.
Sorunu düzeltmek için:

1. .alephium klasörünü silin `rm .alephium`

2. Düğümü yeniden başlatın ve senkronizasyonu bekleyin `java -jar alephium-x.x.x.jar`

## Alephium veri klasörünün taşınması

Birçok kullanıcı, Alephium veri klasörünü birincil önyükleme diskinin dışında farklı bir diske tutmayı tercih eder. Alephium tam düğüm jar'ı ile bunu yapmak için, `ALEPHIUM_HOME` ortam değişkenini kullanabilirsiniz:

1. Alephium tam düğüm jar'ını durdurun
2. Alephium veri klasörünü (normalde Windows için `%userprofile%\.alephium` veya Linux ve macOS için `~/.alephium`) yeni konuma taşıyın
3. Yeni konuma işaret eden bir `ALEPHIUM_HOME` ortam değişkeni sisteme ekleyin. Bunun için değişkeni sistem düzeyinde ekleyebilirsiniz veya Alephium jar'ını başlatmadan önce değişkeni ayarlayan bir toplu dosya oluşturabilirsiniz.
4. Alephium düğümünü yeniden başlatın

Docker tam düğümü kullanıyorsanız, sadece docker dosyasındaki monte edilen klasör tanımlarını yeni eve işaret etmek için değiştirin ve sonra yeniden başlatın.

## Günlüğü Özelleştirme

Günlükleme için kullanılan birkaç ortam değişkeni vardır:

- `ALEPHIUM_LOG_LEVEL` konsol günlüğü seviyesini değiştirebilir.
- `ALEPHIUM_ENABLE_DEBUG_LOGGING` hata ayıklama günlüğünü etkinleştirebilir.
- `ALEPHIUM_HOME` tam düğümün ev klasörünü değiştirebilir, bu nedenle günlüklerin klasörü değişir

Aşağıda tüm olası günlükleme seçenekleriyle bir örnek bulunmaktadır:

```
ALEPHIUM_HOM=<folder> ALEPHIUM_LOG_LEVEL=<DEBUG | INFO | WARN | ERROR> ALEPHIUM_ENABLE_DEBUG_LOGGING=<true | false> java -jar alephium-x.x.x.jar
```

Ayrıca, Alephium'un [günlük yapılandırma dosyasını](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/logback.xml) geçersiz kılabilirsiniz.

```
java -Dlogback.configurationFile=/path/to/config.xml alephium-x.x.x.jar
```

## Budama

Tam senkronize edilmiş bir Alephium tam düğümü, blok zincir verilerini depolamak için 80 GB'den fazla disk alanı gerektirir. Versiyon `2.6.1`'den itibaren Alephium tam düğümü depolama budamasını destekler, bu da depolama gereksinimini önemli ölçüde azaltabilir.

İşte Alephium tam düğümünü budamak için adımlar:

### Jar Dosyası Kullanarak

1. Alephium tam düğümünün durduğundan emin olun
2. `alephium-tools-x.y.z.jar` dosyasını https://github.com/alephium/alephium/releases adresinden indirin
3. Varsayılan Alephium ana dizinini değiştirdiyseniz, `ALEPHIUM_HOME` ortam değişkenini ayarlayın
4. Aşağıdaki komutu çalıştırın `java -cp alephium-tools-x.y.z.jar org.alephium.tools.PruneStorage` budamayı başlatmak için
5. Komutun tamamlanmasını bekleyin, disk alanı yaklaşık 20 GB'a düşmelidir
6. Alephium tam düğümünü yeniden başlatın

### Docker Kullanarak

1. Alephium tam düğümünün durduğundan emin olun
2. Aşağıdaki komutu çalıştırın `docker run -it -v ${YOUR_ALEPHIUM_HOME}:/alephium-home/.alephium alephium/alephium-tools:x.y.z org.alephium.tools.PruneStorage`
3. Komutun tamamlanmasını bekleyin, disk alanı yaklaşık 20 GB'a düşmelidir
4. Alephium tam düğümünü yeniden başlatın

