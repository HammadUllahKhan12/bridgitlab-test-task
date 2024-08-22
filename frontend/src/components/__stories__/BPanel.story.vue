@@ -0,0 +1,54 @@
<script setup lang="ts"></script>

<template>
  <Story title="BPanel">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4 panel">
          <BPanel title="This is the new header">
            <!-- <template #header>This is the header</template> -->
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis pharetra semper. Sed vitae sodales
                ex, et rutrum tortor. Ut ligula lorem, lacinia quis posuere id, rutrum nec purus. Praesent quis congue
                augue, et porttitor neque. Proin tincidunt eleifend nulla, ut varius eros. Mauris lacinia consequat
                risus, a imperdiet nisl rhoncus vitae.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur felis sed sem tempor, ut
                porta diam luctus. In hendrerit accumsan dui, et tincidunt arcu luctus eget. Suspendisse nec laoreet
                lectus. Suspendisse potenti. Maecenas id accumsan erat. Nunc ullamcorper volutpat lacus in malesuada.
              </p>
              <p>
                Cras turpis nibh, suscipit quis ultrices at, tincidunt aliquet justo. Etiam condimentum, orci id rutrum
                facilisis, neque odio lobortis augue, viverra dictum leo mauris id lectus. Nullam vel diam justo. Nullam
                quis orci mauris. Proin rutrum augue in justo egestas, id consequat nunc gravida. Integer aliquam tellus
                ut dictum laoreet. Aenean semper ultricies massa at finibus.
              </p>
            </div>
          </BPanel>
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
