```bash
    <div class="navbar">
      <!-- <img class="logo_nav logo" src="logo_nav.webp" alt="logo"/> -->
      
        <picture class="...." alt="....">
          <!-- AVIF  -->
          <source srcset="wereld-500.avif 500w, wereld-750.avif 750w" type="image/avif">
          <!-- WebP  -->
          <source srcset="wereld-500.webp 500w, wereld-750.webp 750w" type="image/webp">
          <!-- Fallback -->
          <img class="logo_nav logo" src="wereld-750.jpg" alt="logo">
        </picture>

      
    <picture class="drukker" alt="drukker">
          <source srcset="/img/drukker/drukker-300.avif 300w,
/img/drukker/drukker-721.avif 721w,
/img/drukker/drukker-900.avif 900w,
/img/drukker/drukker-1080.avif 1080w,
/img/drukker/drukker-1240.avif 1240w,
/img/drukker/drukker-1500.avif 1500w,
/img/drukker/drukker-1720.avif 1720w" type="image/avif">
          <source srcset="/img/drukker/drukker-300.webp 300w,
/img/drukker/drukker-721.webp 721w,
/img/drukker/drukker-900.webp 900w,
/img/drukker/drukker-1080.webp 1080w,
/img/drukker/drukker-1240.webp 1240w,
/img/drukker/drukker-1500.webp 1500w,
/img/drukker/drukker-1720.webp 1720w" type="image/webp">
      <img class="drukker" src="/img/drukker/drukker.png" alt="drukker">
          </picture>



```


1) kijk naar de extension om te zien welke size
2) ga naar de code en pas aan
    * zorg dat de img op de bovenste layer staat
    * pas de sizes en file naam aan
3) pak de src en zet ze in een picture tag
4) zet de originele afbeelding in comentaar
5) naam de alt en class over in de picture tag
