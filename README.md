


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
    <img src="https://via.placeholder.com/150" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Snipp</h2>

  <p align="center">
    A modern Pastebin alernative which looks nice and has powerful functions.</a>.
    <br />
    <a href="https://github.com/MaximilianHeidenreich/Snipp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://snipp.maximilian-heidenreich.de">View Demo</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Snipp/issues">Report Bug</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Snipp/issues">Request Feature</a>
  </p>
</p>


![Banner GIF][snipp-bannergif]


<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

**! This project is still under development, I will be "finishing" it in a few days, which includes writing docs & guides. **

Are you tired of using pastebins that are using old Bootstrap styles or look like their are from the early 2000s?

If this is the case, you should try Snipp. Snipp aims to be a modern, minimalistic yet powerful pastebin tool.

Features include:
- Create pastes ("snipps") globally accessible by short IDs (e.g. "EEmt6k")
- Support for multiple languages
- Syntax highlighting
- Ability to toggle line numbers
- A clean, modern UI
- Light & Dark Theme
- Clone pastes
- Ability to edit pastes after saving them (if you created it) -> No login required
- Simple API which can be used to extend Snipp (e.g. write custom cli tools)
- Open-Source using GPL-3.0 license -> You can basically do whatever you want with it (See [License Info](https://choosealicense.com/licenses/gpl-3.0/) for further details about GPL-3.0)

The project is split into 2 codebases. The "Snipp" repository includes the frontend (Nuxt.js & Vue).
The "[Snipp-api](https://github.com/MaximilianHeidenreich/Snipp-api)" repository includes the API server (Express & PostgreSQL).

If you want to use the frontend, you will have to deploy the API server somewhere. You can either host it on your own server or easily deploy it on services like Heroku.


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `config.js`
```JS
const API_KEY = 'ENTER YOUR API';
```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/MaximilianHeidenreich/Snipp-api/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GNU GPLv3 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Maximilian Heidenreich - github@maximilian-heidenreich.de

Project Link: [https://github.com/MaximilianHeidenreich/Snipp](https://github.com/MaximilianHeidenreich/Snipp)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/MaximilianHeidenreich/Snipp.svg?style=flat-square
[contributors-url]: https://github.com/MaximilianHeidenreich/Snipp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MaximilianHeidenreich/Snipp
[forks-url]: https://github.com/MaximilianHeidenreich/Snipp/network
[stars-shield]: https://img.shields.io/github/stars/MaximilianHeidenreich/Snipp
[stars-url]: https://github.com/MaximilianHeidenreich/Snipp/stargazers
[issues-shield]: https://img.shields.io/github/issues/MaximilianHeidenreich/Snipp?style=flat-square
[issues-url]: https://github.com/MaximilianHeidenreich/Snipp-api/issues
[license-shield]: https://img.shields.io/github/license/MaximilianHeidenreich/Snipp?style=flat-square
[license-url]: https://github.com/MaximilianHeidenreich/Snipp/blob/master/LICENSE.md
[snipp-bannergif]: https://i.imgur.com/jqubQoU.gif

# Snipp

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
