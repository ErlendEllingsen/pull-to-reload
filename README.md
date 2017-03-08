# ☝️👇 pull-to-reload
[![npm version](https://badge.fury.io/js/pull-to-reload.svg)](https://badge.fury.io/js/pull-to-reload) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

This is a pull to refresh implementation for the web. Designed to work with both mobile and desktop devices. Fits nicely with web-apps or single-page applications (SPA). *Configurable to the seventh degree.*

## 🌵Preview 

<img src="https://fat.gfycat.com/AnyHeartfeltBarnswallow.gif" height="400px" alt="Functionality demo">

### Demo:
[https://erlendellingsen.github.io/pull-to-reload/](https://erlendellingsen.github.io/pull-to-reload/)


## Install 

### NPM (Recommended)

`npm install pull-to-reload`

### Direct ([Download](https://github.com/ErlendEllingsen/pull-to-reload/releases))

Add `pull-to-reload.js` to your project. 

## 🌿Usage 
Quick example: 

**Html**

```html
<div id="ptr">
    ...
</div>

<div id="content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores doloribus harum sed odit optio, fuga nam modi quod beatae? Tempore sunt molestiae, soluta quas unde exercitationem, modi accusamus pariatur reiciendis!
</div>
```

**Javascript**

```javascript
$(document).ready(function(){
    var ptr = new PullToReload({ 
        'callback-loading': function(){
            setTimeout(function(){
                ptr.loadingEnd();
            }, 5000);
        }
    });
});

```


Available options:

```
this.opts = {
        'refresh-element': 'ptr', //Required
        'content-element': 'content', //Required
        'border-height': 1,
        'height': 80,
        'font-size': '30px',
        'threshold': 20,
        'pre-content': '...',
        'loading-content': 'Loading...',
        'callback-loading': function(){ setTimeout(function(){ self.loadingEnd(); }, 1000); } //Required
    }
```


## 📎 Dependencies
*None* 🔥 

## 🥇 Contributors
* NathanHeffley *(Removed jQuery dependency)*
* mdczaplicki *(Minified version)*

## 💪🏽 Contribute
If you'd like to contribute to this project you can do so by creating a *fork* and send in a *pull-request*. 

Make sure to write detailed comments and state your changes when sending in a PR. Keep the code style equal to the current.

Contributions are very much appreciated 😍!

### Topics where help is wanted/needed
* Code: Making *pull-to-reload* **not** block regular scrolling functionality (e.g. in mobile apps).
* Documentation/Wiki - Detailed how to/setup

## License
As most of my other projects, this project is licensed as **MIT**.

 