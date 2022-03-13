# Starter Guide: How to Launch your Node

> Block explorer: [https://explorer.alephium.org][explorer]

## Requirements

Ensure that Java (11 or 17 is recommended) is installed on your computer:

- Windows or Macos: [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
- Ubuntu: run `sudo apt install default-jdk` in Terminal

## Download Application File

Download file `alephium-1.2.6.jar` from [Github release](https://github.com/alephium/alephium/releases/latest) (do not double click on it, it can not be launched this way).

## Start your node

1. Open the search and type in `Terminal` (for Mac and Ubuntu) or `Command Prompt` (for Windows).
2. In the Terminal/Command Prompt program, type `cd your-jar-file-path` to enter the folder in which the **alephium-1.2.6.jar** file is saved.
3. Type the following command and press Enter to launch the full node:
   ```shell
   java -jar alephium-1.2.6.jar
   ```

🎉 _**Tada, your node is running**_

- Your node will start to sync with the network. It might take long the first time. Your node has been fully synced once the block height in the terminal logs is equal to the one found in the latest blocks of the [explorer].
- If you close the terminal the node will be turned off.
- All of the blockchain data is stored in `.alephium` under your home folder[^1].

### Swagger

We use OpenAPI to interact with the full node. You can directly open Swagger UI through [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

Alternatively, you can use any OpenAPI client to
import the `openapi.json` file from our repository ([download](https://github.com/alephium/alephium/raw/master/api/src/main/resources/openapi.json)).

### Mining

For mining tutorial, you can follow our [Solo Mining Guide](Solo-Mining-Guide.md) or [Pool Mining Guide](Pool-Mining-Guide.md).

### Wallet

You could download the desktop wallet from here: [https://github.com/alephium/alephium-wallet/releases](https://github.com/alephium/alephium-wallet/releases)

Alternatively, our full node has a builtin wallet with advanced features, you can follow our [Wallet Guide](Wallet-Guide.md) to learn how to use it.

[^1]: The home folder depends on your system: `C:\Users\<your-username>` in Windows, `/Users/<your-username>` in macOS, `/home/<your-username>` in Linux.

[explorer]: https://explorer.alephium.org
