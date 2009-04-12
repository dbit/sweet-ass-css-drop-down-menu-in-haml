// search
searchini = function() {
  var frm = document.getElementById('wwwsearch');
  var ser = document.getElementById('go');
  var wrd = document.getElementById('words');
  var h = document.getElementsByTagName('span');
  wrd.value = ser.title;
  frm.onsubmit=function() {
    if(this.words.value=='Search www.opera.com'||this.words.value=='') {
      alert('Please enter a search term.');
      this.words.focus();
      return false;
    }
  }
  ser.onmousedown=function() {this.src='/bitmaps/common/search/input-icon2.gif';}
  ser.onmouseout=function() {this.src='/bitmaps/common/search/input-icon.gif';}
  wrd.onfocus=function() {if(this.value=='Search www.opera.com'){this.value=''};}
  wrd.onblur=function() {if(this.value==''){this.value='Search www.opera.com'};}
  for (var i=0;i<h.length;i++) { 
    if (h[i].className=='noscript') {h[i].className = 'yank';}
  }
}

// IE hover fix
sfHover = function() {
  var sfEls = document.getElementById('mainmenu').getElementsByTagName('LI');
  for (var i=0; i<sfEls.length; i++) {
    sfEls[i].onmouseover=function() {
      this.className+=(this.className.length>0? " ": "") + "sfhover";
    }
    sfEls[i].onmouseout=function() {
      this.className=this.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
    }
  }
}

// accessibility script
mcAccessible = function() {
  var mcEls = document.getElementById('mainmenu').getElementsByTagName('A');
  for (var i=0; i<mcEls.length; i++) {
    mcEls[i].onfocus=function() {
      this.className+=(this.className.length>0? " ": "") + "sffocus"; //a:focus
      this.parentNode.className+=(this.parentNode.className.length>0? " ": "") + "sfhover"; //li < a:focus
      if(this.parentNode.parentNode.parentNode.nodeName == 'LI') {
        this.parentNode.parentNode.parentNode.className+=(this.parentNode.parentNode.parentNode.className.length>0? " ": "") + "sfhover"; //li < ul < li < a:focus
      }
    }
    mcEls[i].onblur=function() {
      this.className=this.className.replace(new RegExp("( ?|^)sffocus\\b"), "");
      this.parentNode.className=this.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
      if(this.parentNode.parentNode.parentNode.nodeName == 'LI') {
        this.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
      }
    }
    mcEls[i].onclick=function() {
      this.className=this.className.replace(new RegExp("( ?|^)sffocus\\b"), "");
      this.parentNode.className=this.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
      if(this.parentNode.parentNode.parentNode.nodeName == 'LI') {
        this.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
      }
    }
  }
  searchini();
}

// cookies
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
  //alert('cookie written: ' + name + '=' + value);
}
 
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// event listener
if(window.addEventListener) window.addEventListener('load', mcAccessible, false); // gecko, safari, konqueror and standard
else if(document.addEventListener) document.addEventListener('load', mcAccessible, false); // opera 7
else if(window.attachEvent) { // win/ie
  window.attachEvent('onload', sfHover);
  window.attachEvent('onload', mcAccessible);
} else { // mac/ie5
  if(typeof window.onload == 'function') {
    var existing = onload;
    window.onload = function() {
      existing();
      sfHover();
      mcAccessible();
    }
  } else {
    window.onload = function() {
      sfHover();
      mcAccessible();
    }
  }
}

// email scrambler
mail = function(name,domain,text,subject) {
  if (!domain) {domain='opera.com'}
  if (!text) {text=name+'&#64;'+domain}
  if (!subject) {document.write('<a href="mailto:'+name+'&#64;'+domain+'">'+text+'</a>');}
    else {document.write('<a href="mailto:'+name+'&#64;'+domain+'?subject='+escape(subject)+'">'+text+'</a>');}
}
