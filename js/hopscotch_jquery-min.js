(function(b,c){var m,e,j,i,g,h="undefined",l=b[c],a=false,k=(typeof window.sessionStorage!==h),f=document.body.style,d=(typeof f.MozTransition!==h||typeof f.MsTransition!==h||typeof f.webkitTransition!==h||typeof f.OTransition!==h||typeof f.transition!==h);if(l){return}$(window).load(function(){if(a){l.startTour()}});i={getPixelValue:function(o){var n=typeof o;if(n==="number"){return o}if(n==="string"){return parseInt(o,10)}return 0},valOrDefault:function(o,n){return typeof o!==h?o:n},invokeCallbacks:function(r,o){var q=g[r],p=0,n=q.length;for(;p<n;++p){q[p].cb.apply(this,o)}},getScrollTop:function(){if(typeof window.pageYOffset!==h){return window.pageYOffset}else{return document.documentElement.scrollTop}},getScrollLeft:function(){if(typeof window.pageXOffset!==h){return window.pageXOffset}else{return document.documentElement.scrollLeft}},extend:function(o,n){var p;for(p in n){if(n.hasOwnProperty(p)){o[p]=n[p]}}},getStepTarget:function(n){if(typeof n.target==="string"){return $("#"+n.target)}return $(n.target)},setState:function(p,q,r){var n="",o;if(k){sessionStorage.setItem(p,q)}else{if(r){o=new Date();o.setTime(o.getTime()+(r*24*60*60*1000));n="; expires="+o.toGMTString()}document.cookie=p+"="+q+n+"; path=/"}},getState:function(o){var q=o+"=",n=document.cookie.split(";"),p,r;if(k){return sessionStorage.getItem(o)}else{for(p=0;p<n.length;p++){r=n[p];while(r.charAt(0)===" "){r=r.substring(1,r.length)}if(r.indexOf(q)===0){return r.substring(q.length,r.length)}}return null}},clearState:function(n){if(k){sessionStorage.removeItem(n)}else{this.setState(n,"",-1)}}};g={next:[],prev:[],start:[],end:[],show:[],error:[],close:[]};j={stepNums:null,nextBtn:"Next",prevBtn:"Back",doneBtn:"Done",skipBtn:"Skip",closeTooltip:"Close"};e=function(s){var o=false,n,r=function(v,u){var t=$("<input>");t.attr({id:v,type:"button",value:u});t.addClass("hopscotch-nav-button");if(v.indexOf("prev")>=0){t.addClass("prev")}else{t.addClass("next")}return t},p=function(u,t,w){var v=w?"hide-all":"hide";if(typeof t===h){t=true}if(t){u.removeClass(v)}else{u.addClass(v)}},q=function(A,v){var D,t,B,u,C,w,z=6,F=i.getStepTarget(v)[0],G=A.$element,x=A.$arrowEl,E=i.getPixelValue(v.arrowOffset),y=v.fixedElement?"fixed":"absolute";D=i.getPixelValue(v.width)||s.bubbleWidth;B=i.valOrDefault(v.padding,s.bubblePadding);G.removeClass("fade-in-down fade-in-up fade-in-left fade-in-right");u=F.getBoundingClientRect();if(v.orientation==="top"){t=G.height();C=(u.top-t)-s.arrowWidth;w=u.left}else{if(v.orientation==="bottom"){C=u.bottom+s.arrowWidth;w=u.left}else{if(v.orientation==="left"){C=u.top;w=u.left-D-2*B-2*z-s.arrowWidth}else{if(v.orientation==="right"){C=u.top;w=u.right+s.arrowWidth}}}}if(!E){x.css({top:"",left:""})}else{if(v.orientation==="top"||v.orientation==="bottom"){x.css({left:E+"px",top:""})}else{if(v.orientation==="left"||v.orientation==="right"){x.css({top:E+"px",left:""})}}}w+=i.getPixelValue(v.xOffset);C+=i.getPixelValue(v.yOffset);if(!v.fixedElement){C+=i.getScrollTop();w+=i.getScrollLeft()}if(s.animate&&!d){G.animate({top:C+"px",left:w+"px"}).css("position",y)}else{G.css({top:C+"px",left:w+"px",position:y})}};this.init=function(){var w=$("<div>"),u=$("<div>"),x=$("<div>"),v=this,y=false,t;this.$element=w;this.$containerEl=u;this.$titleEl=$("<h3>");this.$numberEl=$("<span>");this.$contentEl=$("<p>");this.$numberEl.attr("id","hopscotch-bubble-number");x.append(this.$titleEl,this.$contentEl).attr("id","hopscotch-bubble-content");u.attr("id","hopscotch-bubble-container").append(this.$numberEl,x);w.attr("id","hopscotch-bubble").addClass("animated").append(u);this.initNavButtons();this.initCloseButton();this.initArrow();$(window).on("resize",function(){if(y||!o){return}y=true;t=setTimeout(function(){q(v,n,false);y=false},200)});this.hide(false);$("body").append(w);return this};this.initNavButtons=function(){var t=$("<div>");this.$prevBtnEl=r("hopscotch-prev",j.prevBtn);this.$nextBtnEl=r("hopscotch-next",j.nextBtn);this.$doneBtnEl=r("hopscotch-done",j.doneBtn);this.$doneBtnEl.addClass("hide");this.$prevBtnEl.click(function(u){l.prevStep()});this.$nextBtnEl.click(function(u){l.nextStep()});this.$doneBtnEl.click(l.endTour);t.attr("id","hopscotch-actions").append(this.$prevBtnEl,this.$nextBtnEl,this.$doneBtnEl);this.buttonsEl=t;this.$containerEl.append(t);return this};this.initCloseButton=function(){var t=$("<a>");t.text(j.closeTooltip).attr({id:"hopscotch-bubble-close",href:"#",title:j.closeTooltip}).click(function(v){var u=l.getCurrStepNum(),w=l.getCurrTour(),x=(u===w.steps.length-1);i.invokeCallbacks("close",[w.id,u]);l.endTour(true,x);if(v.preventDefault){v.preventDefault()}else{if(event){event.returnValue=false}}});this.closeBtnEl=t;this.$containerEl.append(t);return this};this.initArrow=function(){var u,t;this.$arrowEl=$("<div>").attr("id","hopscotch-bubble-arrow-container");t=$("<div>").addClass("hopscotch-bubble-arrow-border");u=$("<div>").addClass("hopscotch-bubble-arrow");this.$arrowEl.append(t,u);this.$element.append(this.$arrowEl);return this};this.renderStep=function(v,A,w,x,B){var C=this,u=i.valOrDefault(v.showNextButton,s.showNextButton),t=i.valOrDefault(v.showPrevButton,s.showPrevButton),z,y;n=v;this.setTitle(v.title?v.title:"");this.setContent(v.content?v.content:"");this.setNum(A);this.orientation=v.orientation;this.showPrevButton(this.$prevBtnEl&&t&&(A>0||w>0));this.showNextButton(this.$nextBtnEl&&u&&!x);this.$nextBtnEl.val(v.showSkip?j.skipBtn:j.nextBtn);if(x){this.$doneBtnEl.removeClass("hide")}else{this.$doneBtnEl.addClass("hide")}this.setArrow(v.orientation);z=i.getPixelValue(v.width)||s.bubbleWidth;y=i.valOrDefault(v.padding,s.bubblePadding);this.$containerEl.css({width:z+"px",padding:y+"px"});this.$element.css("zIndex",v.zindex?v.zindex:"");if(v.orientation==="top"){setTimeout(function(){q(C,v);if(B){if(!v.fixedElement){B()}else{C.show()}}},5)}else{q(this,v);if(B){if(!v.fixedElement){B()}else{C.show()}}}return this};this.setTitle=function(t){if(t){this.$titleEl.html(t).removeClass("hide")}else{this.$titleEl.addClass("hide")}return this};this.setContent=function(t){if(t){this.$contentEl.html(t).removeClass("hide")}else{this.$contentEl.addClass("hide")}return this};this.setNum=function(t){if(j.stepNums&&t<j.stepNums.length){t=j.stepNums[t]}else{t=t+1}this.$numberEl.html(t)};this.setArrow=function(t){if(t==="top"){this.$arrowEl.removeClass().addClass("down")}else{if(t==="bottom"){this.$arrowEl.removeClass().addClass("up")}else{if(t==="left"){this.$arrowEl.removeClass().addClass("right")}else{if(t==="right"){this.$arrowEl.removeClass().addClass("left")}}}}};this.getArrowDirection=function(){if(this.orientation==="top"){return"down"}if(this.orientation==="bottom"){return"up"}if(this.orientation==="left"){return"right"}if(this.orientation==="right"){return"left"}};this.show=function(){var t=this,u="fade-in-"+this.getArrowDirection(),v=1000;this.$element.removeClass("hide");if(s.animate){setTimeout(function(){t.$element.addClass("animate")},50)}else{this.$element.addClass(u);setTimeout(function(){t.$element.removeClass("invisible")},50);setTimeout(function(){t.$element.removeClass(u)},v)}o=true;return this};this.hide=function(t){t=i.valOrDefault(t,true);this.$element.removeClass("animate fade-in-up fade-in-down fade-in-right fade-in-left").css({top:"",left:""});if(t){this.$element.addClass("hide").removeClass("invisible")}else{this.$element.addClass("invisible").removeClass("hide")}o=false;return this};this.showPrevButton=function(t,u){p(this.$prevBtnEl,t,u)};this.showNextButton=function(t,u){p(this.$nextBtnEl,t,u)};this.showCloseButton=function(t,u){p(this.closeBtnEl,t,u)};this.initAnimate=function(){var t=this;setTimeout(function(){t.$element.addClass("animate")},50)};this.removeAnimate=function(){this.$element.removeClass("animate")};this.init()};m=function(o){var z="hopscotch.tour.state",y,q,u,p,A,D,t,v,r,s=function(){if(!y){y=new e(q)}return y},C=function(){var E=u.steps[p];return(E.length>0)?E[A]:E},n=function(){return u.steps[p].length>0},B=function(){var E=u.steps[p].length;if(A<E-1){++A;return true}else{if(p<u.steps.length-1){++p;A=n()?0:undefined;return true}}return false},x=function(){var E;if(A>0){--A;return true}else{if(p>0){E=u.steps[--p].length;if(E){A=E-1}else{A=undefined}return true}}return false},w=function(E){var J=s().$element,F=i.getPixelValue(J.css("top")),K=i.getStepTarget(C())[0],I=K.getBoundingClientRect(),L=I.top+i.getScrollTop(),H=(F<L)?F:L,G=H-q.scrollTopMargin;$("body, html").animate({scrollTop:G},q.scrollDuration,E)};this.init=function(){if(o){this.configure(o)}return this};this.loadTour=function(J){var H={},F,K,E,I,G;u=J;for(K in J){if(J.hasOwnProperty(K)&&K!=="id"&&K!=="steps"){H[K]=J[K]}}this.resetDefaultOptions();r.call(this,H,true);E=i.getState(q.cookieName);if(E){I=E.split(":");D=I[0];t=I[1];v=undefined;G=t.split("-");if(G.length>1){t=parseInt(G[0],10);v=parseInt(G[1],10)}else{t=parseInt(t,10)}if(I.length>2&&I[2]==="mp"){if(v&&v<u.steps[t].length-1){++v}else{if(t<u.steps.length-1){++t;if(u.steps[t].length>0){v=0}else{v=undefined}}}}}F=s();F.showPrevButton(q.showPrevButton,true);F.showNextButton(q.showNextButton,true);return this};this.startTour=function(H,G){var E,F;if(!u){throw"Need to load a tour before you start it!"}if(document.readyState!=="complete"){a=true;return this}if(typeof H!==h){p=H;A=G}else{if(u.id===D&&typeof t!==h){p=t;A=v;F=C();if(!i.getStepTarget(F)){x();F=C();if(!i.getStepTarget(F)){this.endTour(false,false);return this}}}else{p=0}}if(!A&&n()){A=0}i.invokeCallbacks("start",[u.id,p]);E=s();this.isActive=true;if(q.animate){E.initAnimate()}if(!i.getStepTarget(C())){i.invokeCallbacks("error",[u.id,p]);if(q.skipIfNoElement){this.nextStep(false)}}else{this.showStep(p,A)}return this};this.showStep=function(M,F){var H=u.steps,G=H[M],E=H.length,L=u.id+":"+M,K=s(),J=i.valOrDefault(G.delay,0),I;p=M;A=F;if(typeof F!==h&&n()){G=G[F];L+="-"+F}I=(M===E-1)||(F>=G.length-1);setTimeout(function(){K.renderStep(G,M,F,I,function(){w(function(){K.show.call(K)})});i.invokeCallbacks("show",[u.id,p])},J);if(G.multipage){L+=":mp"}i.setState(q.cookieName,L,1);return this};this.prevStep=function(){var F=C(),E=[];if(F.onPrev){F.onPrev()}i.invokeCallbacks("prev",[u.id,p]);if(q.skipIfNoElement){while(E.length===0&&x()){F=C();E=i.getStepTarget(F);if(E.length===0){i.invokeCallbacks("error",[u.id,p])}}if(E.length===0){return this.endTour(true,false)}}else{if(x()){F=C();if(!i.getStepTarget(F)){i.invokeCallbacks("error",[u.id,p]);return this.endTour(true,false)}}}y.hide(false);this.showStep(p,A);return this};this.nextStep=function(H){var G=C(),F=p,E=[];H=i.valOrDefault(H,true);if(q.skipIfNoElement){while(E.length===0&&B()){G=C();E=i.getStepTarget(G);if(E.length===0){i.invokeCallbacks("error",[u.id,p])}}if(!E.length){return this.endTour(true,false)}}else{if(B()){G=C();if(!i.getStepTarget(G)){i.invokeCallbacks("error",[u.id,p]);return this.endTour(true,false)}}}if(H){if(G.onNext){G.onNext()}i.invokeCallbacks("next",[u.id,F])}y.hide(false);this.showStep(p,A);return this};this.endTour=function(G,F){var E=s();G=i.valOrDefault(G,true);F=i.valOrDefault(F,true);p=0;A=undefined;t=undefined;E.hide();if(G){i.clearState(q.cookieName)}l.isActive=false;if(F){i.invokeCallbacks("end",[u.id])}l.removeCallbacks(true);return this};this.getCurrTour=function(){return u};this.getCurrStepNum=function(){return p};this.getCurrSubstepNum=function(){return A};this.hasTakenTour=function(E){if(k){i.getState(q.cookieName+"_history")}return false};this.setHasTakenTour=function(F){var E;if(k&&!this.hasTakenTour(F)){E=i.getState(q.cookieName+"_history");if(E){E+=";"+F}else{E=F}}};this.clearHasTakenTour=function(K){var J,I,F,E,G=q.cookieName+"_history",H=false;if(k){J=i.getState(G);if(J){I=J.split(";");for(F=0,E=I.length;F<E;++F){if(I[F]===K){I.splice(F,1);H=true;break}}if(H){i.setState(G,I.join(";"))}}}};this.addCallback=function(G,E,F){if(E){g[G].push({cb:E,fromTour:F})}return this};this.removeCallbacks=function(F){var I,G,E,H;for(H in g){if(F){I=g[H];for(G=0,E=I.length;G<E;++G){if(I[G].fromTour){I.splice(G--,1);--E}}}else{g[H]=[]}}return this};this.setCookieName=function(E){z=E;q.cookieName=E};this.resetDefaultOptions=function(){q={animate:false,smoothScroll:true,scrollDuration:1000,scrollTopMargin:200,showCloseButton:true,showPrevButton:false,showNextButton:true,bubbleWidth:280,bubblePadding:15,arrowWidth:20,skipIfNoElement:true,cookieName:z}};r=function(F,G){var E;if(!q){this.resetDefaultOptions()}i.extend(q,F);if(F){i.extend(j,F.i18n)}this.addCallback("next",F.onNext,G).addCallback("prev",F.onPrev,G).addCallback("start",F.onStart,G).addCallback("end",F.onEnd,G).addCallback("show",F.onShow,G).addCallback("error",F.onError,G).addCallback("close",F.onClose,G);E=s();if(q.animate){E.initAnimate()}else{E.removeAnimate()}E.showPrevButton(q.showPrevButton,true);E.showNextButton(q.showNextButton,true);E.showCloseButton(q.showCloseButton,true);return this};this.configure=function(E){return r.call(this,E,false)};this.init(o)};l=new m();b[c]=l}(window,"hopscotch"));