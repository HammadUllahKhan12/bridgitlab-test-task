<script setup lang="ts">
import { ref } from 'vue';

// const cities = [
//   { name: "New York", code: "NY" },
//   { name: "Rome", code: "RM" },
//   { name: "London", code: "LDN" },
//   { name: "Istanbul", code: "IST" },
//   { name: "Paris", code: "PRS" },
// ];
const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Hobart', 'Daerwin'];
const selectedCity = ref(null);

const selectedCountry = ref();
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
]);

const selected = ref();
const options = {
  syd: 'Sydney',
  mel: 'Melbourne',
  brs: 'Brisbane',
};
const opts = Object.entries(options).map(([code, name]) => ({ code, name }));
</script>

<template>
  <Story title="BDropdown">
    <Variant title="Default">
      <div class="p-2">
        <div>
          <BDropdown v-model="selectedCity" :options="cities" placeholder="Select a City" />
          <!-- <BDropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" /> -->
        </div>
        <div class="mt-4">
          {{ selectedCity }}
        </div>
        <div class="mt-8">
          <BDropdown
            v-model="selectedCountry"
            :options="countries"
            option-label="name"
            placeholder="Select a Country"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <span>{{ slotProps.value.code }} ---</span>

                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <span>{{ slotProps.option.code }} | &nbsp; </span>
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </BDropdown>
        </div>
        <div class="mt-8">
          <BDropdown
            v-model="selected"
            :options="opts"
            option-label="name"
            option-value="code"
            placeholder="Select a City"
          />
        </div>
        <div class="mt-8">
          <BDropdown
            v-model="selected"
            :options="opts"
            option-label="name"
            option-value="code"
            placeholder="Select a City"
            variant="success"
          />
        </div>
        <div class="mt-8">
          <BDropdown
            v-model="selected"
            :options="opts"
            option-label="name"
            option-value="code"
            placeholder="Select a City"
            variant="danger"
          />
        </div>
        <div class="mt-4">
          {{ selected }}
        </div>
      </div>
    </Variant>
  </Story>
</template>
