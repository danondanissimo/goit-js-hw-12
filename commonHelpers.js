import{S as b,i as m,a as v}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const w=document.querySelector(".js-search-form"),d=document.querySelector(".js-photo-container"),u=document.querySelector(".js-load-more"),i=document.querySelector(".loader");let c=1,g=15,o="",p=0;function L(s){return s.hits.map(e=>`<li class="gallery-item"><a class="gallery-link" href="${e.largeImageURL}">
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
  </div></li>`).join("")}const S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function f(s){if(s.hits.length===0)m.show({message:"Sorry, there are no images matching your search query. Please try again!",closeOnClick:!0,closeOnEscape:!0});else{p=s.total;const e=L(s);d.insertAdjacentHTML("beforeend",e),S.refresh()}}w.addEventListener("submit",async s=>{s.preventDefault(),c=1,d.replaceChildren(),o=s.target.elements.query.value.trim();try{if(o.length===0)m.show({message:"Search field cannot be empty!",closeOnClick:!0,closeOnEscape:!0});else{i.style.display="block";const e=await y(o);f(e),i.style.display="none",s.target.reset(),h()}}catch(e){console.log(e)}});u.addEventListener("click",async()=>{c+=1,i.style.display="block";const s=await y(o);try{f(s),i.style.display="none";const r=document.querySelector(".gallery-item").getBoundingClientRect().height*2;h(),window.scrollBy({top:r,behavior:"smooth"})}catch(e){console.log(e)}});function y(s){const e="https://pixabay.com/api/",r=`?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${c}&per_page=${g}`,l=e+r;return v.get(l).then(t=>{if(t.data.hits.length===0)throw new Error(t.status);return t.data})}function h(){Math.ceil(p/g)<=c?(u.classList.add("hidden"),m.show({message:"We're sorry, but you've reached the end of search results.",closeOnClick:!0,closeOnEscape:!0})):u.classList.remove("hidden")}
//# sourceMappingURL=commonHelpers.js.map
