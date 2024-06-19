---
sidebar_position: 20
title: Full Node on Flux
sidebar_label: On Flux
---


This guide assumes that you are familiar with
[Flux](https://runonflux.io/), otherwise please refer to Flux's
[official documentation](https://wiki.runonflux.io/wiki). You should
also own enough Flux token to start a Flux App.

## Get the Full Node App from the Marketplace

Go to the [Flux
Marketplace](https://home.runonflux.io/apps/marketplace?q=alephium)
and select the App named *AlephiumNode*. Follow the instructions to
install Alephium full node.

### Expose the API

By default, the Full Node App only has the P2P port (`39973` on Flux nodes) exposed. If you want to expose the API port, you'll need to update the specification of your Flux App as follows. Please keep in mind that exposing the API might be a security concern unless you know what you're doing.

1. Manage your application

<img src={require("/img/flux1.png").default} alt="Manage your application"/>

2. Update the specifications

<img src={require("/img/flux2.png").default} alt="Update specifications"/>

3. Configure the connectivity to expose the container port `12973`. In the screenshot below the port `42973` has been arbitrariliy choosen and will be exposing the API. Any other valid port would work. Compute the signing message and follow the signing process to broadcast the specifications update across the network.

<img src={require("/img/flux3.png").default} alt="Configure connectivity"/>

4. Softly redeploy your application to take into account the specifications update.

<img src={require("/img/flux4.png").default} alt="Soft redeploy the app"/>

That's it, your API is now exposed through the automatic endpoint containing `_42973` (or the different port your specified), you can easily validate with the API endpoint `/infos/version`, i.e. something like `https://alephiumnode1708292985626_42973.app.runonflux.io/infos/version`.
