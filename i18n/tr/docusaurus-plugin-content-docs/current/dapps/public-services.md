---
sidebar_position: 50
title: Halk Hizmetleri
sidebar_label: Halk hizmetleri
---

## Testnet Musluğu

Testnet Musluğu, belirli bir cüzdana testnet-v1 jetonları almanın bir yoludur.

### HTTP API'si Aracılığıyla

Testnet-v16 jetonları almanın başka bir yolu, istek gövdesinde cüzdan adresinizi vererek bir HTTP çağrısı yapmaktır, aşağıdaki gibi:

```
curl -X POST -d '1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy' https://faucet.testnet.alephium.org/send
```

Musluk, istekleri birkaç dakika boyunca kısıtlamaktadır.

## Node ve Gezgin API'ları

Şu anda aşağıdaki API hizmetleri sürdürülmektedir. Tüm API'lar spamı önlemek için sınırlıdır.
* Ana ağ için `https://wallet-v20.mainnet.alephium.org`, node v2.X ile ([Dokümantasyon](https://wallet-v20.mainnet.alephium.org/docs))
* Test ağı için `https://wallet-v20.testnet.alephium.org`, node v2.X ile ([Dokümantasyon](https://wallet-v20.testnet.alephium.org/docs))
* Ana ağ için `https://backend-v113.mainnet.alephium.org`, gezgin arka uç v1.13.X ile ([Dokümantasyon](https://backend-v113.mainnet.alephium.org/docs))
* Test ağı için `https://backend-v113.testnet.alephium.org`, gezgin arka uç v1.13.X ile ([Dokümantasyon](https://backend-v113.testnet.alephium.org/docs))

Proje hala aktif geliştirme aşamasında olduğu için, tüm API'lar sürümlenmiştir. Genellikle yalnızca en son sürümler sürdürülür, ancak API yükseltmeleri topluluğa önceden duyurulur.

## API Takma Adları

Kullanıcıların eski API'den geçmelerine zaman tanımak için aşağıdaki API takma adlarını sürdürüyoruz.

import aliases from "./api-aliases.json";

export const Aliases = ({aliases, type}) => (
    <Box>
        {aliases.length > 0 && <h3>{type} Takma Adlar</h3>}
        <ul>{aliases && aliases.map((alias) => {
            const from = alias['from'];
            const to = alias['to'];
            const additionalPath = from.includes('wallet') ? '/infos/version' : from.includes('backend') ? '/infos' : '';
            return <li key={from}><code>{from}</code> (<a href={`${from}${additionalPath}`}>Test</a>) -> <code>{to}</code></li>;
        })}</ul>
    </Box>
)

<Aliases aliases={aliases['current']} type='Mevcut' />
<Aliases aliases={aliases['deprecated']} type='Kullanımdan Kaldırılan' />

## API Sınırlı Kullanımı

En iyi performansı ve güvenliği sağlamak için tüm halka açık API'larımızda sınırlı kullanım uygulanmaktadır. Bu, belirli bir zaman dilimi içinde yapabileceğiniz istek sayısına bir sınır getirilmesi anlamına gelir. Hizmetlerimiz geliştikçe ve büyüdükçe, sınırların hizmetin gerçek kullanımına dayanarak ayarlanması mümkündür.

Sınırlı kullanım içinde sorunsuz bir deneyim yaşamak için, API hizmetlerimize istek yaparken önbellek ve yeniden deneme mekanizmaları uygulamanızı kesinlikle öneririz. Yanıtların önbelleğe alınması, API çağrılarının sayısını azaltmaya yardımcı olurken, başarısız isteklerin yeniden denemesi geçici sorunları veya hataları ele alabilir.

Uygulamanız React çerçevesi ile oluşturulmuşsa, npm'de bulunan ["SWR"](https://www.npmjs.com/package/swr) paketinden faydalanabilirsiniz. SWR, veri alımı ve önbelleğe alma için uygun kancalar sağlar, bu da API'larla çalışmayı kolaylaştırır. Özellikle değişken verileri işlemek için `useSWR` kancasını ve jeton meta verileri gibi değişmez verileri işlemek için `useSWRImmutable` kancasını kullanabilirsiniz.
