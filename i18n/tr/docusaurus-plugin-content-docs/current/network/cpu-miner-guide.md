---
sidebar_position: 30
title: CPU Madencilik Rehberi
sidebar_label: CPU madencilik rehberi
---

:::info

CPU madenciliği yalnızca test amaçlıdır. Test ağı kullanmak için lütfen [Test Ağı Rehberi](network/testnet-guide.md)'ne göz atın.

Üretimde madencilik yapmak için lütfen [Tek Başına Madencilik Rehberi](mining/solo-mining-guide.md) veya [Havuz Madenciliği Rehberi](mining/pool-mining-guide.md)'ni ziyaret edin.

:::

Önce [Tam Düğüm Rehberi](full-node/getting-started.md)'ndeki adımları izlemeniz gerekmektedir, böylece düğümünüzü indirebilir, yapılandırabilir, başlatabilir ve Swagger (veya diğer OpenAPI istemcileri) kullanabilirsiniz.

Lütfen REST API için varsayılan adres ve bağlantı noktasının [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) olduğunu unutmayın.

## Madenciliği Başlat

Madencilik yapmadan önce yerel düğümünüzün tamamen senkronize olduğundan emin olun. Bir sonraki büyük sürümümüzde bunun için bir doğrulama ekleyeceğiz.

Yerel düğümünüzde madenciliği başlatmak için `/miners/cpu-mining?action=start-mining` üzerine bir POST işlemi yaparak madenciliği **başlatabilirsiniz**.

Sunucu, madencilik işleminin artık başladığını doğrulamak için basitçe `true` yanıtı vermelidir.

Lütfen madencinizin adreslerini yapılandırmak için önce GPU Madenci Rehberi'nin [Yeni bir madenci cüzdanı oluşturun](mining/solo-mining-guide.md#bir-yeni-madenci-cüzdanı-oluşturun) bölümünü incelemeniz gerekecektir.

## Madenciliği Durdur

Benzer şekilde, yerel düğümünüzde madenciliği **durdurabilirsiniz** `/miners/cpu-mining?action=stop-mining` üzerine bir POST işlemi yaparak.

## CPU Kullanımı

Madencilik için CPU kaynaklarını nasıl ayarlayabileceğinizi aşağıdaki iki yapılandırma ile yapabilirsiniz:

    akka.actor.mining-dispatcher.fork-join-executor.parallelism-min = 1 // madencilik için minimum iş parçacığı sayısı
    akka.actor.mining-dispatcher.fork-join-executor.parallelism-max = 4 // madencilik için maksimum iş parçacığı sayısı
