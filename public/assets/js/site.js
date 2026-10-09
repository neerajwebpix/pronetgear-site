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

/* image viewer: click a product photo to enlarge */
(function(){
  var imgs=[].slice.call(document.querySelectorAll('img.zoom'));
  if(!imgs.length)return;
  var ov=document.createElement('div');ov.className='lb';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Enlarged photo');
  ov.innerHTML='<button class="lb-x" type="button" aria-label="Close">&times;</button><button class="lb-p" type="button" aria-label="Previous photo">&#8249;</button><img alt=""><button class="lb-n" type="button" aria-label="Next photo">&#8250;</button><p class="lb-c"></p>';
  document.body.appendChild(ov);
  var big=ov.querySelector('img'),cap=ov.querySelector('.lb-c'),cur=0;
  function show(i){
    cur=(i+imgs.length)%imgs.length;var im=imgs[cur],src=im.parentNode.querySelector('source');
    big.src=src?src.getAttribute('srcset'):im.src;big.alt=im.alt;cap.textContent=im.alt+(imgs.length>1?'  ('+(cur+1)+' / '+imgs.length+')':'');
    ov.classList.toggle('single',imgs.length<2);
  }
  function open(i){show(i);ov.hidden=false;document.body.style.overflow='hidden';ov.querySelector('.lb-x').focus();}
  function close(){ov.hidden=true;big.removeAttribute('src');document.body.style.overflow='';}
  imgs.forEach(function(im,i){im.addEventListener('click',function(){open(i);});im.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i);}});});
  ov.addEventListener('click',function(e){if(e.target===ov||e.target.classList.contains('lb-x'))close();else if(e.target.classList.contains('lb-p'))show(cur-1);else if(e.target.classList.contains('lb-n'))show(cur+1);});
  document.addEventListener('keydown',function(e){if(ov.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);});
})();
