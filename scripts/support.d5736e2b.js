var navOpen=$("#nav-open"),navClose=$("#nav-close"),collapsedNav=$("#collapsed-header");navOpen.on("click",function(){navOpen.fadeOut(),collapsedNav.fadeIn()}),navClose.on("click",function(){collapsedNav.fadeOut(),navOpen.fadeIn().css("display","")}),$(window).resize(function(){$(window).width()>1050&&(navOpen.css("display",""),collapsedNav.fadeOut())});