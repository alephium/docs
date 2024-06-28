---
sidebar_position: 50
title: Troubleshooting
sidebar_label: Troubleshooting
---


## API Key

It's a good practice to use API key to limit the access to your full node's rest endpoints.

### API Key Setup

Please add the following to your `user.conf` by replacing the zeros with your own key (>= 32 characters).

```
alephium.api.api-key = "--- your own key with >= 32 characters"
```

Restart your full node to make this take effect.

#### API Key Generation

On Mac / Linux, run:

```shell
cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 48 | head -n 1
```

### Use API Key

#### Swagger UI

1. Click on the `Authorize` button on the top right of your Swagger UI:

<img src={require("/img/full-node-api-key-auth0.png").default}/>

2. Fill in the value box with your key and click the authorize button:

<img src={require("/img/full-node-api-key-auth1.png").default}/>

Now you could use Swagger UI as if there is no API key.

#### Curl

Specify the `X-API-KEY` header, e.g.

```shell
curl -H "X-API-KEY: ${your-api-key}" ${your-full-node-host}/infos/version
```

## How to make the full node API publicly accessible?

1. Set up your API key properly following the guide above.

2. Add the following to your `user.conf` and restart your full node.

```
alephium.api.network-interface = "0.0.0.0"
```

## How to access the Swagger UI of my full node on another computer in the same subnet?

1. Add the following to your `user.conf` and restart your full node.

```
alephium.api.network-interface = "0.0.0.0"
```

2. Change the `host` of Swagger UI to be the subnet IP of your full node.

## Error "java.lang.AssertionError: assumption failed"

This error often occurs due to connection loss during node synchronization and means that some of the files are corrupted.
To fix the problem:

1. Delete the `db` folder under `${ALEPHIUM_HOME}/${NETWORK}`. e.g. `rm -rf ~/.alephium/mainnet/db`

2. Restart the node and wait for synchronization.

## Moving the Alephium data folder

Many users prefer to keep the Alephium data folder on a different disk than the primary boot disk. To do so with the Alephium full node jar, you can use the `ALEPHIUM_HOME` environment variable:

1. Stop the Alephium full node jar
2. Move the Alephium data folder (normally at `%userprofile%\.alephium` for Windows or `~/.alephium` for Linux and macOS) to the new location
3. Add an environment variable `ALEPHIUM_HOME` to the system pointing to the new location. You can either do this at the system level or simply create a batch file that sets the variable prior to starting the Alephium jar.
4. Restart the Alephium node

If using the docker full node, then simply change the mounted folder definitions in the docker file to point to the new home then restart.

## Customize Logging

There are several environment variables used for logging:

- `ALEPHIUM_LOG_LEVEL` could change the console log level.
- `ALEPHIUM_ENABLE_DEBUG_LOGGING` could enable debug logging.
- `ALEPHIUM_HOME` could change the home folder of the full node, therefore the folder of logs

Below is an example with all of the possible logging options:

```
ALEPHIUM_HOM=<folder> ALEPHIUM_LOG_LEVEL=<DEBUG | INFO | WARN | ERROR> ALEPHIUM_ENABLE_DEBUG_LOGGING=<true | false> java -jar alephium-x.x.x.jar
```

It's also possible to override the [logging configuration file](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/logback.xml) of Alephium.

```
java -Dlogback.configurationFile=/path/to/config.xml alephium-x.x.x.jar
```

## Pruning

A fully sync-ed Alephium full node requires more than 80 GB of disk space to store blockchain data. Since
version `2.6.1` the Alephium full node supports storage pruning which can significantly reduce the storage
requirement.

Here are the steps to prune the Alephium full node:

### Using Jar File

1. Make sure the Alephium full node is stopped
2. Download `alephium-tools-x.y.z.jar` from https://github.com/alephium/alephium/releases
3. If you changed the default Alephium home directory, set the the `ALEPHIUM_HOME` environment variable
4. Run the following command `java -cp alephium-tools-x.y.z.jar org.alephium.tools.PruneStorage` to start pruning
5. Wait until the command finishes execution, the disk space should be reduced to around 20 GB
6. Restart the Alephium full node

### Using Docker

1. Make sure the Alephium full node is stopped
2. Run the following command `docker run -it -v ${YOUR_ALEPHIUM_HOME}:/alephium-home/.alephium alephium/alephium-tools:x.y.z org.alephium.tools.PruneStorage`
3. Wait until the command finishes execution, the disk space should be reduced to around 20 GB
4. Restart the Alephium full node
