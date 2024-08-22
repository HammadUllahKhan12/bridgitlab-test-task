<script setup lang="ts"></script>

<template>
  <footer>
    <div class="footer">
      <div class="footer__logo">
        <BSvgIcon class="logo" name="bridgit" />
      </div>
      <div class="footer__info">
        <p>
          Eligibility and approval is subject to standard credit assessment and not all amounts, term lengths or rates
          will be available to all applicants. Fees, terms and conditions apply.
        </p>
        <p>We use bank level encryption and security across our platform.</p>
      </div>
      <div class="footer__links">
        <a href="https://bridgit.com.au/terms-conditions/" target="_blank">Terms & Conditions</a>
        <a href="https://bridgit.com.au/privacy-policy/" target="_blank">Privacy Policy</a>
        <span>Copyright &#169; 2023 TechLend. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.logo {
  width: 150px;
  height: 50px;
}

footer {
  width: 100%;

  color: color(blue-700);

  background-image: linear-gradient(#f1f6fb, white, #f1f6fb);
}

.footer {
  display: grid;
  grid-template-areas:
    'logo'
    'info'
    'links';
  grid-template-columns: 1fr;
  gap: 0.5rem;
  align-items: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;

  color: color(grey-500);
  font-size: $font-xs;

  &__logo {
    grid-area: logo;
  }

  &__info {
    grid-area: info;

    p {
      max-width: 500px;

      @media (min-width: 768px) {
        max-width: 700px;
      }
    }
  }

  &__links {
    grid-area: links;

    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;

    a {
      color: color(blue-700);
      font-weight: $font-weight-bold;
      font-size: $font-sm;
      text-decoration: none;

      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (min-width: 768px) {
    grid-template-areas: 'logo info links';
    grid-template-columns: 150px 12fr minmax(250px, 4fr);
    gap: 1rem 2rem;

    padding: 2rem;
  }
}
</style>
