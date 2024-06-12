---
sidebar_position: 30
title: Raspberry Pi'de Tam Düğüm
sidebar_label: Raspberry Pi'de Tam Düğüm
---

Bu kılavuzda öğreneceğiz:

- Bir Raspberry Pi 4'ü nasıl kurulur
- Docker'laştırılmış bir Alephium tam düğümü örneğini nasıl çalıştıracağımız

## Bir Raspberry Pi 4 kurulumu

Bu ilk bölüm, bir Raspberry Pi 4'e Ubuntu 20.04 sunucusunu nasıl kuracağımın kişisel yolunu detaylandıracaktır.
Bunun için bir Raspberry Pi 4 (açıkçası), bir SD Kart (en az 8 GB) ve bir SD Kart okuyucusuna ihtiyacınız olacak.
SD Kartı flaşlamak için macOS'tan kabuk komutları kullanılacak, ancak Windows'ta karşılığını bulacaksınız.

![Zor işe hazırlık yapılıyor](media/flashing.jpeg)

İlk olarak, Ubuntu'nun kurulumunu yapılandıracağız. Bunun için Ubuntu 20.04 ve üstüne gömülü olan cloud-init kullanılacaktır.
Bu yapılandırma, varsayılan `ubuntu` kullanıcısından farklı bir kullanıcı oluşturur ve birkaç paket kurar.

### Önyüklemeyi yapılandırın

Aşağıdaki parçacığı `user-data.yml` adında bir dosyaya koyun ve kaydedin. Bu, `alephium` adında bir kullanıcı oluşturur ve `installfest2021` şifresini kurar.
Bu dosyanın içeriğini özelleştirebilirsiniz, eğer ne yaptığınızı biliyorsanız.

```yaml
#cloud-config

hostname: alephium

ssh_pwauth: true

users:
  - name: alephium
    gecos: "alephium"
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    groups: adm,sudo,docker
    plain_text_passwd: installfest2021
    lock_passwd: false
    chpasswd: { expire: false }
#    ssh_authorized_keys: # Optionally ad ssh key here, if you don't want the password.
#      - ssh-ed25519 xxxxxxxxxxxxxxxxxx

packages:
  - apt-transport-https
  - ca-certificates
  - curl
  - gnupg-agent
  - software-properties-common
  - git
  - openssh-server
  - docker.io
  - docker-compose

runcmd:
  - systemctl start docker
  - systemctl enable docker

package_update: true
package_upgrade: true

power_state:
  mode: reboot
```

### SD Kartı flaşla

Şimdi, bu dosya `user-data.yml` ile birlikte SD Kartı flaşlayacağız.

Bunun için [flash](https://github.com/hypriot/flash/) aracını kullanıyorum, çünkü çoğu zor işi sizin için yapıyor.

```shell
curl -LO https://github.com/hypriot/flash/releases/download/2.7.2/flash
chmod +x flash

./flash --userdata user-data.yml https://cdimage.ubuntu.com/releases/20.04/release/ubuntu-20.04.4-preinstalled-server-arm64+raspi.img.xz
```

Yukarıdaki komut, `/dev/disk2`'nin SD Kart olduğunu ve sabit diskiniz olmadığını onaylamanızı ve bir SD Kartı flaşlamanın yönetici ayrıcalıkları gerektirdiği için şifrenizi isteyecektir.

Yukarıdaki komut tamamlandığında, SD Kartı Raspberry Pi'nize takabilir ve açabilirsiniz.
İlk başlatma tamamlanana kadar birkaç dakika sürer ve Raspberry Pi'niz kullanıma hazır hale gelir.
Düğüm hazır olduğunda, kullanıcı adı `alephium` ve şifre olarak `installfest2021` kullanarak ona ssh ile bağlanabilirsiniz!

```shell
ssh alephium@alephium
```

Eğer `alephium` ana bilgisayarı bilinmiyorsa, düğümün IP adresini bulmanız gerekecek, muhtemelen router yapılandırma uygulaması/sayfasında.

Ve işte bu, Raspberry Pi'niz Ubuntu 20.04 ile çalışıyor ve Docker'a hazır durumda, ve Alephium tam düğümünü çalıştırmaya hazır.

🚀

![Raspberry pi 4](media/pies.jpeg)

## Docker'laştırılmış Alephium tam düğümü örneğini çalıştırma

Bu ikinci bölüm, bir Raspberry Pi ile ilgili değil, ancak herhangi bir sunucu/vm/bilgisayar için genelleştirilebilir ve SSH erişimine sahip olabilir.
En temel bir Alephium tam düğümünü docker kullanarak çalıştıracağız ve sonra kurulumumuzu daha kullanışlı hale getirmek için ilerleyeceğiz.

Bu bölümün önkoşulu, SSH erişimine sahip bir sunucunun olması gerektiğidir ve daha kesin olarak Ubuntu 20.04 veya daha yeni bir sürümünün çalıştırılması gerekmektedir.
Önceki bölüm, bunu bir Raspberry Pi ile nasıl yapacağınızı açıklar, ancak AWS EC2 örneği de işi yapacaktır.

### Sunucuya bağlanın

Bu adım kolay olmalı, `ssh` komutunu kullanarak. Çalıştırın:

```shell
ssh alephium@alephium
```

### Docker ve docker-compose kurulumu

Docker ve docker-compose'u hızlı bir şekilde kurarak, Alephium tam düğümünü çalıştırmaya hazır olacağız.

SSH ile bağlandıktan sonra, aşağıdaki komutları çalıştırın:

```shell
sudo apt install -y docker.io docker-compose
```

Great, docker should be running:

```shell
docker ps
```

### Tam düğümü çalıştırma

Şimdi tam düğümü çalıştırabiliriz, tek bir satırda aşağıdaki gibi:

```shell
docker run -it --rm -p 12973:12973 --name alephium alephium/alephium:latest
```

### Docker-compose

Docker-compose, özellikle komut hacmi, daha fazla bağlantı noktası, ortam değişkenleri, vb. içeren komutlara sahipse, bir konteyner çalıştırmanın biraz daha uygun bir yoludur.

Bu nedenle, aşağıda bir `docker-compose.yml` dosyasına koyabileceğiniz hizmet tanımı verilmiştir, ve bu tanımdan tam düğümünüzü başlatmak için `docker-compose up -d` komutunu çağırabilirsiniz.

```yaml
version: "3"
services:
  broker:
    image: "alephium/alephium:latest"
    restart: unless-stopped
    ports:
      - 9973:9973/tcp
      - 9973:9973/udp
      - 10973:10973/tcp
      - 12973:12973/tcp
```
