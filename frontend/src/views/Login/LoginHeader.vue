<script setup lang="ts"></script>

<template>
  <header>
    <BSvgIcon class="logo" name="bridgit" />
    <a href="tel:1300141161" class="contact-details">
      <BSvgIcon name="phone" size="3rem" />
      <div href="tel:1300141161">
        <h1>1300 141 161</h1>
        <div>Weekdays 8:30am - 6pm</div>
      </div>
    </a>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0.5rem 0.75rem;

  background-color: #fff;
}

.logo {
  width: 120px;
  height: 50px;
}

.contact-details {
  display: flex;
  align-items: center;

  color: color(blue-800);
  font-size: $font-sm;
  text-decoration: none;

  h1 {
    margin: 0;

    font-weight: $font-weight-semi;
  }
}

@media (min-width: 640px) {
  header {
    padding: 1rem 2rem;
  }

  .logo {
    width: 150px;
    height: 50px;
  }

  .contact-details {
    font-size: $font-md;
  }
}
</style>
