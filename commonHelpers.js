import{S as f,a as y,i as h}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function l(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=l(t);fetch(t.href,a)}})();const b=document.querySelector(".js-search-form"),m=document.querySelector(".js-photo-container"),o=document.querySelector(".js-load-more"),i=document.querySelector(".loader");let u=1,L=15,c="";function v(s){return s.hits.map(e=>`<li class="gallery-item"><a class="gallery-link" href="${e.largeImageURL}">
    <img
      src="${e.webformatURL}"
      data-source="${e.largeImageURL}"
      alt="${e.tags}"
      class="gallery-image"
      
    /></a>  

  <div class="image-stats-block">
<ul class="image-stats-list">
  <li class="image-stats-item"><p class="image-stats-text">Likes:<br><span class="image-stats-value">${e.likes}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Views:<br><span class="image-stats-value">${e.views}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Comments:<br><span class="image-stats-value">${e.comments}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Downloads:<br><span class="image-stats-value">${e.downloads}</span></p>
</li>
</ul>
  </div></li>`).join("")}const P=new f(".gallery a",{captionsData:"alt",captionDelay:250});function d(s){if(s.hits.length,s.hits.length===0)h.show({message:"Sorry, there are no images matching your search query. Please try again!",closeOnClick:!0,closeOnEscape:!0});else{const e=v(s);m.insertAdjacentHTML("beforeend",e),P.refresh()}}b.addEventListener("submit",s=>{s.preventDefault(),m.replaceChildren(),c=s.target.elements.query.value,i.style.display="block",g(c).then(e=>{d(e)}).finally(()=>i.style.display="none"),s.target.reset(),p()});o.addEventListener("click",()=>{u+=1,i.style.display="block",g(c).then(s=>{d(s)}).finally(()=>i.style.display="none"),p()});function g(s){const e="https://pixabay.com/api/",l=`?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${u}&per_page=${L}`,r=e+l;return y.get(r).then(t=>t.data)}function p(){u===2?(o.classList.add("hidden"),console.log("Yes, it is")):o.classList.remove("hidden")}
//# sourceMappingURL=commonHelpers.js.map
