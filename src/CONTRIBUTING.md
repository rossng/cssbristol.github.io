# Contributing

## Prerequisites

* Install [Node.js](https://nodejs.org/en/). The Node.js install includes the npm package manager.
* Ensure that your `PATH` is set correctly. It must contain:
  * The Node.js installation directory (on Windows x64: `C:\Program Files\nodejs\`). This is required in order to run `npm` from the terminal.
  * npm's global package directory (on Windows x64: `C:\Users\<user>\AppData\Roaming\npm`). This wil contain wrappers to execute globally-installed npm packages such as Grunt and Bower.
* Run `npm install -g grunt-cli` to install Grunt and Bower globally

## Getting the Source

* Fork the `cssbristol/cssbristol.github.io` repo.
* `git clone https://github.com/<github-username>/cssbristol.github.io.git`
  * Where `<github-username>` is your username.
* `cd cssbristol.github.io`
* `git checkout develop`

## Building the Site

* Go the the directory where you cloned the repo.
* `npm install` to install the local npm packages required by the site (including Grunt itself).
* `bower install` to install assets used by the site.
* `grunt` to build the site and launch a local server.
* Go to [http://localhost:9000/](http://localhost:9000/) in your browser. If you see the site, it's working!
