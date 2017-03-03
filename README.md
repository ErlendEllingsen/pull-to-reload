# pull-to-reload 
This is a pull to refresh implementation for the web. Designed to work with both mobile and websites. *Configurable to the seventh degree.*

### Preview 

<img src="https://fat.gfycat.com/AnyHeartfeltBarnswallow.gif" style="height: 300px;" alt="Functionality demo">

### Install 
Add `pull-to-reload.js` to your project. 

### Usage 
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


### Dependencies
* jQuery 



### Contribute
If you have the time, these features are requested:

* Remove jQuery-dependency
* Better README