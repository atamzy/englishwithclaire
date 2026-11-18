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
    $('bg').onclick=function(){$('nv').classList.toggle('open')};
    document.querySelectorAll('#nv a').forEach(function(a){a.onclick=function(){$('nv').classList.remove('open')}});
    document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa(a.getAttribute('data-wa'));a.target='_blank';a.rel='noopener'});
    document.querySelectorAll('[data-goal]').forEach(function(a){a.addEventListener('click',function(){$('bgl').value=a.getAttribute('data-goal')})});
    
    /* accounts */
    function users(){return json('ewc-users',{})}
    function hash(p,s){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+':'+p)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')})}
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
    if(!window.crypto||!crypto.subtle)return err('Your browser does not support secure sign-in.');
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
    tq.innerHTML='<p class="mut">Your result</p><div class="lv">'+l[0]+'</div><h3 style="font-size:1.3rem;margin-top:6px">'+l[1]+' · '+sc+' of '+Q.length+' correct</h3><p class="mut">Great work! Book a free trial class and Claire will place you in the right group.</p><div class="row"><a class="btn" target="_blank" rel="noopener" href="'+wa(FT)+'">Book a free trial class</a><a class="btn g" target="_blank" rel="noopener" href="'+wa('Hello Claire! I took the level test on your website. My result: '+l[0]+' ('+l[1]+'), '+sc+'/'+Q.length+'.')+'">Send my result on WhatsApp</a></div><p style="margin:0"><a href="#level-test" id="rt2" style="font-weight:700;color:var(--p)">Retake the test</a>'+(s?'':' · <a href="#signup" style="font-weight:700;color:var(--p)">Create an account to save your result</a>')+'</p>';
    $('rt2').onclick=function(e){e.preventDefault();qi=0;sc=0;tshow()}}
    
    /* dashboard */
    var courses=[['Beginner to Advanced','trend','#8e6bf0','#b49bff'],['Conversation Club','msg','#2cb5b0','#4fd1c5'],['Everyday English for Mums','heart','#ef5b5b','#ff9a6b'],['Career Comeback English','brief','#4a5be0','#7a8cff']];
    $('cs').innerHTML=courses.map(function(c){return '<div class="cc"><div class="art" style="--c:'+c[2]+';--c2:'+c[3]+'"><svg class="i"><use href="#'+c[1]+'"/></svg></div><div class="b"><h3>'+c[0]+'</h3><p>with Claire</p><div class="bar"><i></i></div><p style="margin-bottom:12px">Not started</p><a class="btn s" target="_blank" rel="noopener" href="'+wa('Hello Claire, I’d like to join '+c[0]+'.')+'">Enrol</a></div></div>'}).join('');
    function dashboard(s){var n=s.name.split(' ')[0];$('un').textContent=n;$('av').textContent=n.charAt(0).toUpperCase();
    var L=json('ewc-level-'+s.email,null),p=L?Math.round(L.score/L.total*100):0;
    $('rg').setAttribute('stroke-dasharray',(p*3.14)+' 314');$('rt').textContent=L?L.level:'0%';
    $('lt').textContent=L?'Your level is '+L.level+' ('+L.name+'). Great start!':'Take the free level test so we can recommend your first class.';$('lb').textContent=L?'Retake the test':'Take the level test';
    var b=json('ewc-bookings',[]).filter(function(x){return x.email===s.email});
    $('ub').innerHTML=b.length?b.map(function(x){return '<div class="li"><div>Free trial class requested<small>'+esc(x.goal)+' · we’ll confirm your time</small></div><a class="btn s g" target="_blank" rel="noopener" href="'+wa('Hello Claire, I booked a free trial class on the website ('+x.email+'). Please confirm my class time.')+'">Confirm</a></div>'}).join(''):'<div class="li"><div>No classes booked yet<small>Choose a time that fits your baby’s routine</small></div><a class="btn s" target="_blank" rel="noopener" href="'+wa(FT)+'">Book a free trial class</a></div>'}
    
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