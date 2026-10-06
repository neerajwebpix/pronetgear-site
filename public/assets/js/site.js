(function(){
  var nav=document.getElementById('site-nav'), tog=document.querySelector('.nav-toggle');
  if(tog&&nav){tog.addEventListener('click',function(){var o=nav.classList.toggle('open');tog.setAttribute('aria-expanded',o?'true':'false');});}
  var dd=document.querySelector('.nav-drop');
  if(dd){
    dd.addEventListener('click',function(e){e.stopPropagation();dd.setAttribute('aria-expanded',dd.getAttribute('aria-expanded')==='true'?'false':'true');});
    document.addEventListener('click',function(e){if(!e.target.closest('.nav-group'))dd.setAttribute('aria-expanded','false');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')dd.setAttribute('aria-expanded','false');});
  }
  /* inventory filter */
  var list=document.getElementById('inv-list');
  if(list){
    var q=document.getElementById('f-q'),c=document.getElementById('f-cat'),k=document.getElementById('f-cond'),out=document.getElementById('f-count'),none=document.getElementById('f-none');
    var cards=[].slice.call(list.querySelectorAll('[data-name]'));
    var params=new URLSearchParams(location.search);
    if(params.get('q'))q.value=params.get('q');
    if(params.get('cat'))c.value=params.get('cat');
    function run(){
      var t=q.value.trim().toLowerCase().split(/\s+/).filter(Boolean),n=0;
      cards.forEach(function(el){
        var ok=t.every(function(w){return el.dataset.name.indexOf(w)>-1;});
        if(ok&&c.value&&el.dataset.cat!==c.value)ok=false;
        if(ok&&k.value&&el.dataset.cond.split(' ').indexOf(k.value)<0)ok=false;
        el.hidden=!ok; if(ok)n++;
      });
      out.textContent=n+' of '+cards.length+' listings';
      none.hidden=n!==0;
    }
    [q,c,k].forEach(function(el){el.addEventListener('input',run);el.addEventListener('change',run);});
    run();
  }
})();
