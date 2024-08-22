@@ -0,0 +1,54 @@
<script setup lang="ts"></script>

<template>
  <Story title="BCard">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4 panel">
          <BCard align-footer="center">
            <template #title> Advanced Card </template>
            <template #subtitle> Card subtitle </template>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
              cupiditate neque quas!
            </p>
            <template #footer>
              <BButton variant="primary" icon="pi pi-check" label="Save" />
              <BButton icon="pi pi-times" label="Cancel" severity="secondary" />
            </template>
          </BCard>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 2rem;

  margin: 2rem;
}

.panel {
  width: 500px;
}
</style>
