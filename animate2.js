/*
    Copyright (c) 2017 Yrals
     @author Rohit Lodha, BITS 
It takes 3 argument :
The website url , Time betweeen successive screenshot( Framerate) , No. of screenshots
*/
var system = require('system');
var page = new WebPage();

var address = system.args[1];			// link
var wait = parseInt(system.args[2]);			//framerate
var iterations = parseInt(system.args[3]);		//no. of png

page.open(address, function(){
    (function snap(i){
        if(i < iterations){
            window.setTimeout(function(){
            		var clipRect = page.evaluate(function(){
									return document.querySelector('.hp_strip').getBoundingClientRect();
								});
								page.viewportSize = { width: 1024, height: 768 };
								page.clipRect ={ top:225,left:75,width:1024,height:260 };
                page.render('capture/'+i+'.png');
                console.log("filling inputs"+i);
                snap(++i);
            }, wait);
        }
        else{
            phantom.exit();
        }
    })(0);
});
