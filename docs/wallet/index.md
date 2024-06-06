---
sidebar_position: 5
title: Overview
sidebar_label: Overview
---

import {
  DesktopRegular,
  CommunicationRegular,
  PhoneRegular
} from '@fluentui/react-icons';

<CardSection
  id="Quickstart"
  description="Alephium offers a suite of wallets which are designed for ease-of-use, to make Alephium’s technology accessible for all."
>
  <Card
    title="Desktop Wallet"
    icon={<DesktopRegular />}
    to="/wallet/desktop-wallet"
    description="Alephium’s flagship wallet. Ready for everything,
    from daily management tasks to smart contracts deployment, privacy & DeFi."
  />
  <Card
    title="Extension Wallet"
    icon={<CommunicationRegular />}
    to="/wallet/extension-wallet/overview"
    description="works right inside of your browser. Get access to the
    latest features with a focus on DeFi."
  />
  <Card
    title="Mobile Wallet"
    icon={<PhoneRegular />}
    description={
      <div>Enables Alephium on the go with the first-class UX. Available on both <a href="https://play.google.com/store/apps/details?id=org.alephium.wallet">Android</a> and <a href="https://apps.apple.com/us/app/alephium-wallet/id6469043072">iOS</a>.</div>
    }
  />
</CardSection>

Alephium's full node also comes with a built-in [node
wallet](/wallet/node-wallet-guide), which could be useful if you are a
developer. Alephium team is also finalizing the work for the
[Ledger support](/wallet/ledger).

Other than the wallets that are built and maintained by the team,
there are also community built wallets such as [Sesame
wallet](https://sezame.app/) and [Sahhar
wallet](https://play.google.com/store/apps/details?id=com.sahhar.sahhar_wallet).
