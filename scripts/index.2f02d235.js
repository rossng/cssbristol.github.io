var navOpen=$("#nav-open"),navClose=$("#nav-close"),collapsedNav=$("#collapsed-header");navOpen.on("click",function(){navOpen.fadeOut(),collapsedNav.fadeIn()}),navClose.on("click",function(){collapsedNav.fadeOut(),navOpen.fadeIn().css("display","")}),$(window).resize(function(){$(window).width()>1050&&(navOpen.css("display",""),collapsedNav.fadeOut())});var options={particleColor:"#999",background:"images/header-bg.833a0944.jpg",interactive:!1,speed:"none",density:"high"},particleCanvas=new ParticleNetwork(document.getElementById("header"),options);