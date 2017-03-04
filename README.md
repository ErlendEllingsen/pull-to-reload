# ☝️👇 pull-to-reload 
This is a pull to refresh implementation for the web. Designed to work with both mobile and desktop devices. Fits nicely with web-apps or single-page applications (SPA). *Configurable to the seventh degree.*

### Preview 

<img src="https://fat.gfycat.com/AnyHeartfeltBarnswallow.gif" height="400px" alt="Functionality demo">

## Install 

### NPM (Recommended)

`npm install pull-to-reload`

### Direct

Add `pull-to-reload.js` to your project. 

##  Usage 
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
* NathanHeffley 

## 💪🏽 Contribute
If you'd like to contribute to this project you can do so by creating a *fork* and send in a *pull-request*. 

Make sure to write detailed comments and state your changes when sending in a PR. Keep the code style equal to the current.

Contributions are very much appreciated 😍!

## License
As most of my other projects, this project is licensed as **MIT**.
 