import{S as c,i as m}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const u=document.querySelector(".js-search-form"),n=document.querySelector(".js-photo-container"),o=document.querySelector(".loader");u.addEventListener("submit",s=>{s.preventDefault();const t=s.target.elements.query.value;o.style.display="block",f(t).then(r=>{d(r)}).finally(()=>o.style.display="none"),s.target.reset()});function f(s){const t="https://pixabay.com/api/",r=`?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`,i=t+r;return fetch(i).then(e=>{if(e.ok)return e.json();throw new Error(e.status)})}function g(s){return s.hits.map(t=>`<li class="gallery-item"><a class="gallery-link" href="${t.largeImageURL}">
    <img
      src="${t.webformatURL}"
      data-source="${t.largeImageURL}"
      alt="${t.tags}"
      class="gallery-image"
      
    /></a>  

  <div class="image-stats-block">
<ul class="image-stats-list">
  <li class="image-stats-item"><p class="image-stats-text">Likes:<br><span class="image-stats-value">${t.likes}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Views:<br><span class="image-stats-value">${t.views}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Comments:<br><span class="image-stats-value">${t.comments}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Downloads:<br><span class="image-stats-value">${t.downloads}</span></p>
</li>
</ul>
  </div></li>`).join("")}const p=new c(".gallery a",{captionsData:"alt",captionDelay:250});function d(s){if(n.replaceChildren(),s.hits.length===0)m.show({message:"Sorry, there are no images matching your search query. Please try again!",closeOnClick:!0,closeOnEscape:!0});else{const t=g(s);n.insertAdjacentHTML("afterbegin",t),p.refresh()}}
//# sourceMappingURL=commonHelpers.js.map
