# Bault

![GitHub release (latest by date)](https://img.shields.io/github/v/release/nault/nault)
[![GitHub All Releases](https://img.shields.io/github/downloads/nault/nault/total)](https://github.com/Bault/Bault/releases/latest)
[![Discord](https://img.shields.io/badge/discord-join%20chat-orange.svg?logo=discord&color=7289DA)](https://discord.nanocenter.org)

Bault is a community-driven fork of the popular nano wallet [NanoVault](https://github.com/cronoh/nanovault) 💙

It's a fully client-side signing wallet for sending and receiving [nano](https://github.com/nanocurrency/nano-node/) either directly in your browser at [nault.cc](https://wallet.xbrl.blocky.com.br) or with the [desktop app](https://github.com/Bault/Bault/releases/latest).

Seamless integration with any nano compatible RPC backend/websocket and the aim to be more frequently maintained are some of the main features. Those together will greatly increase the stability, performance and uptime.

![Bault Screenshot](/src/assets/img/preview.png)
___

## How To Use
Bault comes in different flavors to suit your needs.
#### Desktop App
Available for Windows/Mac/Linux – just head over to the [latest release](https://github.com/Bault/Bault/releases/latest) and download the version for your OS. Arch Linux users may [install it from the (unofficial) AUR](https://aur.archlinux.org/packages/nault-bin/).

If you want to verify the binary checksum there are plenty of apps to do this. One way is using a powershell or bash terminal:

* **Powershell:** `Get-FileHash -Path '.\Bault-Setup-x.x.x-Windows.exe' -Algorithm SHA256`
* **Bash:** `openssl sha256 Bault-x.x.x-Linux.AppImage`

Then compare the output hash with the one listed in the corresponding checksums file that you download.

#### Web App
You can also use Bault from any device on the web at [nault.cc](https://wallet.xbrl.blocky.com.br).

Both the desktop (recommended) and web version supports the Ledger Nano hardware wallet. For help using it, please refer to [this guide](https://docs.nault.cc/2020/08/04/ledger-guide.html).

The web version can additionally be pulled from the [dockerhub repo](https://hub.docker.com/r/nault/nault) using: docker pull nault/nault:latest

A full security guide and other useful articles can be found in the [Bault Docs](https://docs.nault.cc).

#### Mobile App
There is no native mobile app but the web wallet contains a Progressive Web App (PWA). That allows you to run it in offline mode for remote-signing.

If you visit [wallet.xbrl.blocky.com.br](https://wallet.xbrl.blocky.com.br) in your phone you will be given the option to install it.

* Android: Click on "Install Bault for Android" in the menu
* iOS (Safari only): 1 - Tap the share button. 2 - Select "+ Add to home screen". 3 - Open Bault from the home screen

## How To Help

Thanks for your interest in contributing! There are many ways to contribute to this project. [Get started here at CONTRIBUTING.md](CONTRIBUTING.md).

If you want to know how to setup the development environment head over to [DEVELOPMENT.md](DEVELOPMENT.md).

## Support

If you are looking for more interactive and quick support compared to creating a new Github issue, you will then find most of the developers in the Bault channel over at the [TNC discord server](https://discord.nanocenter.org/).

## Acknowledgements

Special thanks to the following!

- [NanoVault](https://github.com/cronoh/nanovault) - The original one
- [numtel/nano-webgl-pow](https://github.com/numtel/nano-webgl-pow) - WebGL PoW Implementation
- [jaimehgb/RaiBlocksWebAssemblyPoW](https://github.com/jaimehgb/RaiBlocksWebAssemblyPoW) - CPU PoW Implementation
- [dcposch/blakejs](https://github.com/dcposch/blakejs) - Blake2b Implementation
- [dchest/tweetnacl-js](https://github.com/dchest/tweetnacl-js) - Cryptography Implementation

## Donations

If you have found Bault useful and are feeling generous, you can donate at
`xbrl_3g4xqr1h6tfaykypf3ppk5ik8yffjc63cjtf579dy47b1bz7bd87kdfijxor`

Thanks a lot!
