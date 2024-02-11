import{S as y,i as m,a as h}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const b=document.querySelector(".js-search-form"),d=document.querySelector(".js-photo-container"),u=document.querySelector(".js-load-more"),o=document.querySelector(".loader");let n=1,v=15,i="";function w(s){return s.hits.map(e=>`<li class="gallery-item"><a class="gallery-link" href="${e.largeImageURL}">
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
  </div></li>`).join("")}const L=new y(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){if(s.hits.length===0)m.show({message:"Sorry, there are no images matching your search query. Please try again!",closeOnClick:!0,closeOnEscape:!0});else{s.total;const e=w(s);d.insertAdjacentHTML("beforeend",e),L.refresh()}}b.addEventListener("submit",async s=>{if(s.preventDefault(),n=1,d.replaceChildren(),i=s.target.elements.query.value.trim(),i.length===0)m.show({message:"Search field cannot be empty!",closeOnClick:!0,closeOnEscape:!0});else{o.style.display="block";const e=await p(i);g(e),o.style.display="none",s.target.reset(),f()}});u.addEventListener("click",async()=>{n+=1,o.style.display="block";const s=await p(i);g(s),o.style.display="none";const r=document.querySelector(".gallery-item").getBoundingClientRect().height*2+48;console.log(r),f(),window.scrollBy({top:r,behavior:"smooth"})});function p(s){const e="https://pixabay.com/api/",r=`?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${v}`,l=e+r;return h.get(l).then(t=>{if(t.data.hits.length===0)throw new Error(t.status);return t.data})}function f(){2<=n?(u.classList.add("hidden"),m.show({message:"We're sorry, but you've reached the end of search results.",closeOnClick:!0,closeOnEscape:!0})):u.classList.remove("hidden")}
//# sourceMappingURL=commonHelpers.js.map
