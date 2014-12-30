
window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/backbone/backbone.js"},
        {url: "./bower_components/typeplate-starter-kit/css/typeplate.css"},
        {url: "./bower_components/normalize.css/normalize.css"},
        {url: "//yui.yahooapis.com/3.18.1/build/yui/yui-min.js"},
        {url: "./js/main.js"},
        {url: "./dist/style.css"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        document.body.style.opacity = 1;
        // start app?
        
        var test = new Validator();
    })

}
    
