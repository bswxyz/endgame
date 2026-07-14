<!--
  Hand-drawn Staunton-ish piece set, one symbol per type, 44×44 box.
  Colours arrive through CSS custom properties ( - -pf fill, - -ps stroke)
  which inherit through the <use> shadow tree — so one set of paths
  serves both colours and both themes.
-->
<svg class="pdefs" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="pc-p" viewBox="0 0 44 44">
      <circle cx="22" cy="13.5" r="5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
      <path d="M22 17 C18.6 19.6 17.4 22.6 17.2 25.6 L15.4 30.8 H28.6 L26.8 25.6 C26.6 22.6 25.4 19.6 22 17 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <rect x="12.5" y="33.5" width="19" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>

    <symbol id="pc-r" viewBox="0 0 44 44">
      <path d="M14 10.5 H17.6 V13.7 H20.6 V10.5 H23.4 V13.7 H26.4 V10.5 H30 V16.8 L27.6 19.2 V27.6 L30 30.8 H14 L16.4 27.6 V19.2 L14 16.8 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <rect x="11" y="33.5" width="22" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>

    <symbol id="pc-n" viewBox="0 0 44 44">
      <path d="M15.5 30.8 C16.5 26.4 19.4 24.2 19.9 21.4 C17.9 21.9 16.9 21.2 16.6 19.9 C14.9 19.6 13.6 18.3 13.6 16.4 C13.6 15.5 14 14.8 14.7 14.3 C16.4 13.1 18.4 11.5 19.8 9.6 L20.4 6.8 L22.3 9.2 L24.6 7.2 C27.9 9.4 29.6 13.6 29.6 18.2 C29.6 23.4 27.6 26.2 27.6 30.8 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <circle cx="19.2" cy="14.8" r="1" fill="var(--ps)" stroke="none" />
      <path d="M25.4 11.8 C27 14.4 27.7 17.8 27.2 21.4" fill="none" stroke="var(--ps)" stroke-width="1.2" stroke-linecap="round" opacity=".5" />
      <rect x="11" y="33.5" width="22" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>

    <symbol id="pc-b" viewBox="0 0 44 44">
      <circle cx="22" cy="9.2" r="2.4" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.5" />
      <path d="M22 12.6 C26.2 15.6 28.6 19.4 28.6 23.2 C28.6 26.6 25.8 28.8 22 28.8 C18.2 28.8 15.4 26.6 15.4 23.2 C15.4 19.4 17.8 15.6 22 12.6 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M22 16.4 V21.6 M19.7 19 H24.3" fill="none" stroke="var(--ps)" stroke-width="1.4" stroke-linecap="round" />
      <rect x="16.8" y="30" width="10.4" height="2.4" rx="1.2" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.3" />
      <rect x="11.5" y="33.5" width="21" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>

    <symbol id="pc-q" viewBox="0 0 44 44">
      <path d="M13.2 30.8 L16.2 23.6 L12.2 12.8 L17.6 21.4 L22 10.6 L26.4 21.4 L31.8 12.8 L27.8 23.6 L30.8 30.8 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <circle cx="12.2" cy="10.4" r="1.9" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.3" />
      <circle cx="22" cy="8" r="1.9" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.3" />
      <circle cx="31.8" cy="10.4" r="1.9" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.3" />
      <rect x="11" y="33.5" width="22" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>

    <symbol id="pc-k" viewBox="0 0 44 44">
      <path d="M22 4.6 V10.4 M19.3 7.5 H24.7" fill="none" stroke="var(--ps)" stroke-width="1.9" stroke-linecap="round" />
      <path d="M22 11 C19.5 14.4 15 13.9 13.2 17.1 C11.6 20.1 13.3 23.3 16.3 24.5 L15.4 30.8 H28.6 L27.7 24.5 C30.7 23.3 32.4 20.1 30.8 17.1 C29 13.9 24.5 14.4 22 11 Z"
        fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M16.6 25.6 C20 26.8 24 26.8 27.4 25.6" fill="none" stroke="var(--ps)" stroke-width="1.2" opacity=".5" />
      <rect x="11" y="33.5" width="22" height="5" rx="2.5" fill="var(--pf)" stroke="var(--ps)" stroke-width="1.6" />
    </symbol>
  </defs>
</svg>
