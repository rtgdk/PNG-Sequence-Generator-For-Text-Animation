/*
    Copyright (c) 2017 Yrals
    @author Rohit Lodha, BITS
Using phantomJS for getting the screenshot of the text animation from megalocode.com and aving in the capture folder

In the comment, there is the casperJS part for opening the gist website, fill up the credentials and login.

*/

var system = require('system');		// import system module
var page = new WebPage();
var t = Date.now();
var address = system.args[1];			// url
var wait = parseInt(system.args[2]);			// framerate
var iterations = parseInt(system.args[3]);			///no of screenshot

page.open(address, function(){
    (function snap(i){
        if(i < iterations){
            window.setTimeout(function(){
            		var clipRect = page.evaluate(function(){
									return document.querySelector('.hp_strip').getBoundingClientRect();
								});
								page.viewportSize = { width: 1024, height: 768 };
								page.clipRect ={ top:225,left:75,width:1024,height:260 };  // Set page Clip Rectangle Here
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
t = Date.now() - t;
console.log("Loading time " + t );



/*var casper = require('casper').create(); 

casper.on("remote.message", function (msg) {
    console.log(msg);
});

casper.start("http://gistai.com/app/admin/index.php", function () {
    //Enter Credentials
    this.evaluate(function () {
        console.log("filling inputs");
        document.forms[0].loginname.value=""; // give some value
				document.forms[0].loginpassword.value="";  // give som value
				console.log("filling inputs");
				document.forms[0].submit();
				});
				//this.click("btnLogin");
				//this.echo("login button was submitted");
});
casper.then(function () {
    this.capture('example2.png');
});
casper.run();*/
/*var casper = require('casper').create();
casper.start("http://gistai.com/app/admin/index.php", function() {
//searches and fills the form with id="loginForm"
	this.echo(this.getTitle());
  this.fill('form[action="logincheck.php"]', {
    'login':    'rohit.lodhartg@gmail.com',
    'password':    'harvey21'
   }, true);
  this.evaluate(function(){
    //trigger click event on submit button
    document.querySelector('input[type="submit"]').click();
  });
  this.echo(this.getTitle());
});*/
/*var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
page.clipRect ={ top:0,left:0,width:1024,height:768 };
page.open('http://gistai.com/app/admin/index.php', function() {
	page.evaluate(function() {
		document.forms[0].loginname.value="rohit.lodhartg@gmail.com";
		document.forms[0].loginpassword.value="harvey21";
    document.forms[0].submit();
	});
	var page = new WebPage(), testindex = 0, loadInProgress = false;

	page.onConsoleMessage = function(msg) {
		console.log(msg);
	};

	page.onLoadStarted = function() {
		loadInProgress = true;
		console.log("load started");
	};

	page.onLoadFinished = function() {
		loadInProgress = false;
		console.log("load finished");
	};

  setTimeout(function(){
        page.render("nextPage.png");
        phantom.exit();
    }, 5000); // 5 seconds
  //phantom.exit();
});*/

