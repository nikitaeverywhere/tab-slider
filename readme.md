# Tab Slider

<img src="src/img/logo-128.png" width=16 vertical-align=bottom/> An extension which keeps browser tabs sorted in most recently used order, 
creating totally different browsing experience.

+ [Install for Chrome](https://chrome.google.com/webstore/detail/nobaaibkcalggmjnjhnlmmcldllpogjp/)
+ [Install for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tab-slider/)
+ [Install for Opera](https://addons.opera.com/en/extensions/details/tab-slider/)

Features
--------

+ Works with pinned tabs, multiple windows and hot keys
+ Customizable reordering delay
+ New active tabs appear left immediately

Demo
----

![Demo](etc/demo.gif "Demo")

Development
-----------

This extension's codebase is developed to support both Firefox and Chrome browser extension APIs.

Before going into development, you will need latest NodeJS (tested on v6-8) installed. Then, run:

```bash
npm install
```

And finally

```bash
npm run build
```

To bundle versions of extension for different browsers. They will go to `build` folder ready-to-use.

Note: Microsoft Edge does not support moving tabs in its extension API at the time of extension 
creation, so sadly no Edge :(

License
-------

[MIT](license) © [Nikita Savchenko](https://nikita.tk)

Inspired by [this extension](https://chrome.google.com/webstore/detail/tab-stack/gfpdghcockbpiokcaaagmnneioeopnnb).
