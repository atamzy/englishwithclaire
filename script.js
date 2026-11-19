(function(){
    var $=function(i){return document.getElementById(i)},R=document.documentElement,mem={},WA='79056776274',EM='englishwithclaire@gmail.com';
    function st(k,v){try{if(v===undefined)return localStorage.getItem(k);v===null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){if(v===undefined)return mem[k]||null;mem[k]=v}}
    function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
    function mail(s,b){return 'mailto:'+EM+'?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(b)}
    function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
    function json(k,d){try{return JSON.parse(st(k)||'')||d}catch(e){return d}}
    
    /* theme + menu + whatsapp links */
    var t=st('ewc-theme');if(t)R.setAttribute('data-theme',t);
    document.querySelectorAll('[data-tg]').forEach(function(b){b.onclick=function(){var d=R.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),n=d==='dark'?'light':'dark';R.setAttribute('data-theme',n);st('ewc-theme',n)}});
    var nv=$('nv'),bgb=$('bg');
    function menu(o){nv.classList.toggle('open',o);bgb.classList.toggle('open',o);bgb.setAttribute('aria-expanded',o)}
    bgb.onclick=function(e){e.stopPropagation();menu(!nv.classList.contains('open'))};
    function away(e){if(nv.classList.contains('open')&&!nv.contains(e.target)&&!bgb.contains(e.target))menu(false)}
    document.addEventListener('click',away);document.addEventListener('touchstart',away,{passive:true});
    addEventListener('scroll',function(){if(nv.classList.contains('open'))menu(false)},{passive:true});
    addEventListener('resize',function(){if(innerWidth>900)menu(false)});
    addEventListener('hashchange',function(){menu(false)});
    document.querySelectorAll('#nv a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
    document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa(a.getAttribute('data-wa'));a.target='_blank';a.rel='noopener'});
    document.querySelectorAll('[data-goal]').forEach(function(a){a.addEventListener('click',function(){$('bgl').value=a.getAttribute('data-goal')})});
    
    /* accounts */
    function users(){return json('ewc-users',{})}
    function sha256(str){var b=unescape(encodeURIComponent(str)),l=b.length,w=[],i,j,K=[],H=[],p=2,n=0;
    function isP(x){for(var d=2;d*d<=x;d++)if(x%d===0)return 0;return 1}
    for(;n<64;p++)if(isP(p)){if(n<8)H[n]=(Math.pow(p,.5)%1)*4294967296|0;K[n++]=(Math.pow(p,1/3)%1)*4294967296|0}
    for(i=0;i<l;i++)w[i>>2]|=b.charCodeAt(i)<<(24-(i%4)*8);
    w[l>>2]|=0x80<<(24-(l%4)*8);w[(((l*8+64)>>9)<<4)+15]=l*8;
    for(j=0;j<w.length;j+=16){var a=H.slice(0,8),W=[];
    for(i=0;i<64;i++){if(i<16)W[i]=w[j+i]|0;else{var x=W[i-15],y=W[i-2];W[i]=(((x>>>7|x<<25)^(x>>>18|x<<14)^(x>>>3))+W[i-7]+((y>>>17|y<<15)^(y>>>19|y<<13)^(y>>>10))+W[i-16])|0}
    var e=a[4],t1=(a[7]+((e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7))+((e&a[5])^(~e&a[6]))+K[i]+W[i])|0,q=a[0],t2=(((q>>>2|q<<30)^(q>>>13|q<<19)^(q>>>22|q<<10))+((q&a[1])^(q&a[2])^(a[1]&a[2])))|0;
    a=[(t1+t2)|0,a[0],a[1],a[2],(a[3]+t1)|0,a[4],a[5],a[6]]}
    for(i=0;i<8;i++)H[i]=(H[i]+a[i])|0}
    return H.map(function(v){return ('00000000'+(v>>>0).toString(16)).slice(-8)}).join('')}
    function hash(p,s){var m=s+':'+p;
    if(window.crypto&&crypto.subtle&&window.isSecureContext){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(m)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}).catch(function(){return sha256(m)})}
    return Promise.resolve(sha256(m))}
    function sess(){var e=st('ewc-session'),u=users();return e&&u[e]?{email:e,name:u[e].name}:null}
    var mode='signin';
    function auth(m){mode=m;var up=m==='signup';$('tin').className=up?'':'on';$('tup').className=up?'on':'';
    $('at').textContent=up?'Create your account':'Welcome back';$('as').textContent=up?'Sign up to open your dashboard and save your progress.':'Sign in to open your dashboard.';
    $('ln').style.display=up?'grid':'none';$('lc').style.display=up?'grid':'none';$('sb').textContent=up?'Create account':'Sign in';
    $('pw').autocomplete=up?'new-password':'current-password';$('er').className='err'}
    function err(m){$('er').textContent=m;$('er').className='err on'}
    function go(){location.hash='#dashboard';route()}
    $('af').onsubmit=function(e){e.preventDefault();var em=$('em').value.trim().toLowerCase(),pw=$('pw').value,u=users();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return err('Please enter a valid email address.');
    if(mode==='signup'){var nm=$('nm').value.trim();
    if(nm.length<2)return err('Please enter your full name.');
    if(u[em])return err('An account with this email already exists. Please sign in.');
    if(pw.length<8)return err('Password must be at least 8 characters.');
    if(pw!==$('pc').value)return err('Passwords do not match.');
    var salt=Math.random().toString(36).slice(2)+Date.now();
    hash(pw,salt).then(function(h){u[em]={name:nm,salt:salt,hash:h};st('ewc-users',JSON.stringify(u));st('ewc-session',em);go()})
    }else{
    if(!u[em])return err('No account found for this email. Please sign up first.');
    if(!pw)return err('Please enter your password.');
    hash(pw,u[em].salt).then(function(h){if(h!==u[em].hash)return err('Incorrect email or password.');st('ewc-session',em);go()})}};
    $('lo').onclick=function(){st('ewc-session',null);location.hash='#top';route()};
    
    /* booking + contact forms */
    function done(f,name,text,subj){var d=document.createElement('div');d.className='done';
    d.innerHTML='<h3>Thank you, '+esc(name)+'!</h3><p>Your request is ready. Send it to Claire to confirm:</p><div class="row" style="margin-bottom:0"><a class="btn" target="_blank" rel="noopener" href="'+wa(text)+'">Send on WhatsApp</a><a class="btn g" href="'+mail(subj,text)+'">Send by email</a></div>';
    f.style.display='none';f.parentNode.insertBefore(d,f.nextSibling)}
    var FT='Hello Claire! I’d like to book a free trial class.';
    var okm=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    $('bf').onsubmit=function(e){e.preventDefault();var n=$('bn').value.trim(),em=$('be').value.trim().toLowerCase(),w=$('bw').value.trim(),b=$('bb').value.trim(),g=$('bgl').value,x=$('bx');
    function bad(m){x.textContent=m;x.className='err on'}
    if(n.length<2)return bad('Please enter your name.');if(!okm.test(em))return bad('Please enter a valid email address.');
    var all=json('ewc-bookings',[]);all.push({name:n,email:em,wa:w,baby:b,goal:g,date:new Date().toISOString()});st('ewc-bookings',JSON.stringify(all));
    var msg='Hello Claire! I’d like to book a free trial class.\nName: '+n+'\nEmail: '+em+'\nWhatsApp: '+(w||'-')+'\nBaby’s age: '+(b||'-')+'\nGoal: '+g;window.open(wa(msg),'_blank');done(this,n,msg,'Free trial class request')};
    $('cf').onsubmit=function(e){e.preventDefault();var n=$('cn').value.trim(),em=$('ce').value.trim(),m=$('cm').value.trim(),x=$('cx');
    function bad(t){x.textContent=t;x.className='err on'}
    if(n.length<2)return bad('Please enter your name.');if(!okm.test(em))return bad('Please enter a valid email address.');if(m.length<5)return bad('Please write a short message.');
    done(this,n,'Hello Claire!\n'+m+'\n\nFrom: '+n+' ('+em+')','Message from the website')};
    
    /* level test */
    var Q=[['She ___ a teacher.',['am','is','are'],1],['I ___ coffee every morning.',['drink','drinks','drinking'],0],['We ___ to the park yesterday.',['go','went','gone'],1],['I haven’t seen him ___ Monday.',['for','since','from'],1],['If it rains tomorrow, we ___ at home.',['stay','will stay','would stay'],1],['She asked me where ___.',['I lived','did I live','I did live'],0],['He suggested ___ earlier.',['to leave','leaving','leave'],1],['Had I known, I ___ differently.',['would act','will act','would have acted'],2]];
    var LV=[['A1','Beginner'],['A2','Elementary'],['B1','Intermediate'],['B2','Upper-intermediate'],['C1','Advanced']],tq=$('tq'),qi=0,sc=0;
    function tshow(){if(qi>=Q.length)return tres();var q=Q[qi];
    tq.innerHTML='<div class="bar"><i style="width:'+qi/Q.length*100+'%"></i></div><p class="mut" style="margin:6px 0">Question '+(qi+1)+' of '+Q.length+'</p><h3 style="font-size:1.3rem">'+q[0]+'</h3><div class="opts">'+q[1].map(function(o,i){return '<button class="opt" data-i="'+i+'">'+o+'</button>'}).join('')+'</div>';
    tq.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(+b.getAttribute('data-i')===q[2])sc++;qi++;tshow()}})}
    function tres(){var i=sc<=1?0:sc<=3?1:sc<=5?2:sc<=7?3:4,l=LV[i],s=sess();
    if(s)st('ewc-level-'+s.email,JSON.stringify({score:sc,total:Q.length,level:l[0],name:l[1]}));
    tq.innerHTML='<p class="mut">Your result</p><div class="lv">'+l[0]+'</div><h3 style="font-size:1.3rem;margin-top:6px">'+l[1]+' · '+sc+' of '+Q.length+' correct</h3><p class="mut">Great work! Book a free trial class and Claire will place you in the right group.</p><div class="row"><a class="btn gold" target="_blank" rel="noopener" href="'+wa(FT)+'">Book a free trial class</a><a class="btn g" target="_blank" rel="noopener" href="'+wa('Hello Claire! I took the level test on your website. My result: '+l[0]+' ('+l[1]+'), '+sc+'/'+Q.length+'.')+'">Send my result on WhatsApp</a></div><p style="margin:0"><a href="#level-test" id="rt2" style="font-weight:700;color:var(--p)">Retake the test</a>'+(s?'':' · <a href="#signup" style="font-weight:700;color:var(--p)">Create an account to save your result</a>')+'</p>';
    $('rt2').onclick=function(e){e.preventDefault();qi=0;sc=0;tshow()}}
    
    /* dashboard */
    var courses=[['Beginner to Advanced','trend','#8e6bf0','#b49bff'],['Conversation Club','msg','#2cb5b0','#4fd1c5'],['Everyday English for Mums','heart','#ef5b5b','#ff9a6b'],['Career Comeback English','brief','#4a5be0','#7a8cff']];
    $('cs').innerHTML=courses.map(function(c){return '<div class="cc"><div class="art" style="--c:'+c[2]+';--c2:'+c[3]+'"><svg class="i"><use href="#'+c[1]+'"/></svg></div><div class="b"><h3>'+c[0]+'</h3><p>with Claire</p><div class="bar"><i></i></div><p style="margin-bottom:12px">Not started</p><a class="btn s" target="_blank" rel="noopener" href="'+wa('Hello Claire, I’d like to join '+c[0]+'.')+'">Enrol</a></div></div>'}).join('');
    function dashboard(s){var n=s.name.split(' ')[0];$('un').textContent=n;$('av').textContent=n.charAt(0).toUpperCase();
    var L=json('ewc-level-'+s.email,null),p=L?Math.round(L.score/L.total*100):0;
    $('rg').setAttribute('stroke-dasharray',(p*3.14)+' 314');$('rt').textContent=L?L.level:'0%';
    $('lt').textContent=L?'Your level is '+L.level+' ('+L.name+'). Great start!':'Take the free level test so we can recommend your first class.';$('lb').textContent=L?'Retake the test':'Take the level test';
    var b=json('ewc-bookings',[]).filter(function(x){return x.email===s.email});
    $('ub').innerHTML=b.length?b.map(function(x){return '<div class="li"><div>Free trial class requested<small>'+esc(x.goal)+' · we’ll confirm your time</small></div><a class="btn s g" target="_blank" rel="noopener" href="'+wa('Hello Claire, I booked a free trial class on the website ('+x.email+'). Please confirm my class time.')+'">Confirm</a></div>'}).join(''):'<div class="li"><div>No classes booked yet<small>Choose a time that fits your baby’s routine</small></div><a class="btn s gold" target="_blank" rel="noopener" href="'+wa(FT)+'">Book a free trial class</a></div>'}
    
    /* router */
    function route(){var h=location.hash,s=sess(),v='land';
    if(h==='#dashboard'||h==='#signin'||h==='#signup')v=s?'dash':'auth';
    else if(h==='#level-test')v='test';else if(h==='#privacy'||h==='#terms')v='legal';
    ['land','auth','dash','test','legal'].forEach(function(k){$(k).style.display=k===v?(k==='auth'?'grid':'block'):'none'});
    if(v==='auth'){auth(h==='#signup'?'signup':'signin');$('af').reset()}
    if(v==='dash'){dashboard(s);if(h!=='#dashboard'){location.hash='#dashboard';return}}
    if(v==='test'){qi=0;sc=0;tshow()}
    var el=h.length>1?$(h.slice(1)):null;
    if((v==='land'||v==='legal')&&el)el.scrollIntoView();else if(v!=='land')scrollTo(0,0)}
    addEventListener('hashchange',route);route();
    })();
    
    /* scroll reveal */
    (function(){
    if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    var sel='#land .hero .w>div:first-child>*,#land .hd,#land .grid>*,#land .two>*,#land .cta,#land details,#land .w>.row,#land .ticks li';
    var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e,i,a){return a.indexOf(e)===i});
    els.forEach(function(e){var i=[].indexOf.call(e.parentNode.children,e);e.style.setProperty('--d',Math.min(i,5)*.09+'s');e.classList.add('rv')});
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var e=x.target;e.classList.add('in');io.unobserve(e);setTimeout(function(){e.classList.remove('rv','in');e.style.removeProperty('--d')},1200)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
    })();