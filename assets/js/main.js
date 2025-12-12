/*
	Adapted by LATMOS (France, UMR 8190) and IGE (France, UMR 5001) from:
	  Eventually by HTML5 UP
	  html5up.net | @ajlkn
	  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

    "use strict";

    var	$body = document.querySelector('body');

    // Methods/polyfills.

    // classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
    !function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

    // canUse
    window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

    // window.addEventListener
    (function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

    // Play initial animations on page load.
    window.addEventListener('load', function() {
	window.setTimeout(function() {
	    $body.classList.remove('is-preload');
	}, 100);
    });

    // Slideshow Background.
    (function() {


        var possible_images = [
            {
                "path": "images/Seguinot_meander-melt-water.jpg",
                "alignment": "center",
                "by": "Julien Seguinot",
                "url": "https://imaggeo.egu.eu/view/13610/",
                "license": "CC-BY-SA-3.0",
            },
            {
                "path": "images/Gilbert_clouds-Antarctica.png",
                "alignment": "center",
                "by": "Ella Gilbert",
                "url": "https://imaggeo.egu.eu/view/14065/",
                "license": "CC-BY-SA-3.0",
            },
            {
                "path": "images/USFS_fire_Alaska.jpg",
                "alignment": "center",
                "by": "US Forest Service",
                "url": "https://commons.wikimedia.org/wiki/File:Funny_River_Fire_Alaska.jpg",
                "license": "public domain",
            },
        ];

        var which_image = Math.floor(Math.random() * possible_images.length);

	// Settings.
	var settings = {

	    // Images (in the format of 'url': 'alignment').
	    images: {
		[possible_images[which_image].path]: possible_images[which_image].alignment,
	    },

	    // Delay.
	    delay: 9000

	};

        // Credit for the background image
        var credit = "Background image";
        if (possible_images[which_image].license != "public domain")
            credit += " &copy; ";
        else
            credit += " by ";
        credit += possible_images[which_image].by;
        credit = '<a href="' + possible_images[which_image].url + '">' + credit + "</a>";
        var license = possible_images[which_image].license;
        license = '<a href="https://spdx.org/licenses/' + license + '.html">' + license + "</a>";
        document.getElementById("ID_bg-image-credit").innerHTML = credit + " (" + license + ")";

	// Vars.
	var	pos = 0, lastPos = 0,
	    $wrapper, $bgs = [], $bg,
	    k, v;

	// Create BG wrapper, BGs.
	$wrapper = document.createElement('div');
	$wrapper.id = 'bg';
	$body.appendChild($wrapper);

	for (k in settings.images) {

	    // Create BG.
	    $bg = document.createElement('div');
	    $bg.style.backgroundImage = 'url("' + k + '")';
	    $bg.style.backgroundPosition = settings.images[k];
	    $wrapper.appendChild($bg);

	    // Add it to array.
	    $bgs.push($bg);

	}

	// Main loop.
	$bgs[pos].classList.add('visible');
	$bgs[pos].classList.add('top');

	// Bail if we only have a single BG or the client doesn't support transitions.
	if ($bgs.length == 1
	    ||	!canUse('transition'))
	    return;

	window.setInterval(function() {

	    lastPos = pos;
	    pos++;

	    // Wrap to beginning if necessary.
	    if (pos >= $bgs.length)
		pos = 0;

	    // Swap top images.
	    $bgs[lastPos].classList.remove('top');
	    $bgs[pos].classList.add('visible');
	    $bgs[pos].classList.add('top');

	    // Hide last image after a short delay.
	    window.setTimeout(function() {
		$bgs[lastPos].classList.remove('visible');
	    }, settings.delay / 2);

	}, settings.delay);

    })();

})();
