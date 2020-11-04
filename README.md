


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPLv3 License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/MaximilianHeidenreich/Snipp">
    <img src="https://raw.githubusercontent.com/MaximilianHeidenreich/Snipp/master/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Snipp</h2>

  <p align="center">
    A modern Pastebin alernative which looks nice and has powerful functions.</a>.
    <br />
    <a href="https://github.com/MaximilianHeidenreich/Snipp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://snipp.xyz">View Demo</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Snipp/issues">Report Bug</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Snipp/issues">Request Feature</a>
  </p>
</p>


![Banner GIF][snipp-bannergif]


<!-- TABLE OF CONTENTS -->
## Table of Contents
- - - -

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Features:](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Installation](#local-installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)



<br></br>
<!-- ABOUT THE PROJECT -->
## About The Project


***Are you tired of using pastebins which look like they were designed in the early 2000s?***

***Fear not! Snipp got you covered.***

> Snipp is a powerful, user friendly pastebin tool with a modern aesthetic.

### Features:

- [x] **Create & Share** snippets accessible by short IDs (e.g. ""EEmt6k)
- [x] **Edit** snippets after publishing them *(No login required!)*
- [x] **Clone** pastes if you want to make changes to other peoples snippets
- [x] Visual features
  - [x] Clean & Modern UI
  - [x] Syntax highlighting
  - [ ] Light & Dark Theme
  - [x] Line numbers *(togglable)*

- [x] Simple **API** *(Feel free to extend it. Maybe a CLI Tool?)*
- [x] **Open Source** *(GPL-3.0, see [License info](https://choosealicense.com/licenses/gpl-3.0/) for further details)*


<br></br>
<!-- GETTING STARTED -->
## Getting Started

> **:bulb:** The Snipp project is split into 2 codebases!
> - [Snipp (Frontend)](https://github.com/MaximilianHeidenreich/Snipp)
> - [Snipp-API (API)](https://github.com/MaximilianHeidenreich/Snipp-api)
> 
> The frontend only contains the Nuxt.js (Vue) project. It simply provides a clean ui to interface 
> with the backend API. If you want to host Snipp yourself, please make sure you have an API instance 
> running somewhere!



<!--If you want to use the frontend, you will have to deploy the API server somewhere. You can either host it on your own server or easily deploy it on services like Heroku.

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.-->

### Prerequisites

Please ensure that you have installed & configured all of the following requirements:
- [npm](https://npme.npmjs.com/docs/cli/installation.html) / [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [PostgreSQL Database](https://www.postgresql.org/docs/13/installation.html)
- [Snipp API](https://github.com/MaximilianHeidenreich/Snipp-api)

Before you launch the server or build the project, you need to configure the following ENV 
variables inside the `.env` file:

```bash
# ! Do not append a '/' to the URLs !

API_BASE_URL="https://yourApiUrl.com"   # The URL where the API is hosted / accessible. 

BASE_URL="https://yourAccessUrl.com"    # The URL where Snipp frontend will be accessed from.
```


### Local Installation

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how Nuxt.js works, check out [Nuxt.js docs](https://nuxtjs.org).


<br></br>
<!-- USAGE EXAMPLES -->
## Usage

<br>
<details>
  <summary><b>Creating & Updating</b></summary>
  <p>
    To create a Snipp, simple click the '+' button and paste your text into the free editor space.
    If you want, you can enter a name associated with the Snipp inside of the 'Name' field.
    <br></br>
    <i>💡 Snipp will automatically try to detect the language and select it for syntax highlighting.</i>
    <br></br>
    After you created your Snipp, you can always access it and make changes (See <i>Owner Pin</i> for further details). Just hit the 'save' button right next to the '+' button to pubish your changes.
    <br></br>
    <i>💡 When you create a Snipp, the url to access it will be copied to your clipboard!</i>
  </p>
</details>
<br>
<details>
  <summary><b>Clone Snipp</b></summary>
  <p>
    If you come across a Snipp, which was created by someone else but you still want to edit it, 
    you can use the 'clone' button (It replaces the 'save' button if you don't own the Snipp).
    <br></br>
    After cloning the Snipp, make your changes and hit the 'save' button. Now it will be yours :)
    <br></br>
    <i>💡 When you published your changes, the url to access the Snipp will be copied to your clipboard!</i>
  </p>
</details>
<br>
<details>
  <summary><b>Owner Pin</b></summary>
  <p>
    The 'Owner Pin' is a 8-digit pin (0000-0000) which is used to identify a client.
    <br></br>
    Important notes:
    <ul>
      <li>
        The owner pin is no secure identification token! It only provides a basic level of security 
        to prevent everyone from editing every Snipp.
      </li>
      <li>
        The owner pin is automatically generated when a client visits the Snipp frontend for the first time.
      </li>
      <li>
        A client can change his PIN to whatever he wants (as long as it meets the format requirements).
      </li>
    </ul>
    <br></br>
    If you want to use the same PIN on multiple devices to enable editing access to your Snipps, 
    just select the 'gear' icon on your main device. Remember the PIN which is displayed at the top 
    and insert it into your other clients settings.
  </p>
</details>
<br>
<details>
  <summary><b>Visual Configuration</b></summary>
  <p>
    // TODO: Add visual config docs.
  </p>
</details>


<br></br>
<!-- ROADMAP -->
## Roadmap


See the [open issues](https://github.com/MaximilianHeidenreich/Snipp-api/issues) for a list of proposed features (and known issues).


<br></br>
<!-- CONTRIBUTING -->
## Contributing


Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<br></br>
<!-- CONTACT -->
## Contact


Maximilian Heidenreich - github@maximilian-heidenreich.de

Project Link: [https://github.com/MaximilianHeidenreich/Snipp](https://github.com/MaximilianHeidenreich/Snipp)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/MaximilianHeidenreich/Snipp.svg?style=flat-square
[contributors-url]: https://github.com/MaximilianHeidenreich/Snipp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MaximilianHeidenreich/Snipp?style=flat-square
[forks-url]: https://github.com/MaximilianHeidenreich/Snipp/network
[stars-shield]: https://img.shields.io/github/stars/MaximilianHeidenreich/Snipp?style=flat-square
[stars-url]: https://github.com/MaximilianHeidenreich/Snipp/stargazers
[issues-shield]: https://img.shields.io/github/issues/MaximilianHeidenreich/Snipp?style=flat-square
[issues-url]: https://github.com/MaximilianHeidenreich/Snipp-api/issues
[license-shield]: https://img.shields.io/github/license/MaximilianHeidenreich/Snipp?style=flat-square
[license-url]: https://github.com/MaximilianHeidenreich/Snipp/blob/master/LICENSE.md
[snipp-bannergif]: https://i.imgur.com/LjEA3Vk.gif
