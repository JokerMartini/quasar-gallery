<template>
  <q-page class="q-pa-sm">
    <div class="row items-start justify-start q-col-gutter-sm">
      <div v-for="item in items" :key="item.id" class="col-3">
        <q-card>
          <q-card-section>
            <q-img :ratio="16 / 9" :src="item.thumbnail" fit="cover" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-card-title>{{ item.text }}</q-card-title>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const items = ref([
      {
        id: 1,
        text: "Item 1",
        thumbnail: "https://picsum.photos/200/300?image=10",
      },
      {
        id: 2,
        text: "Item 2",
        thumbnail: "https://picsum.photos/200/300?image=20",
      },
      {
        id: 3,
        text: "Item 3",
        thumbnail: "https://picsum.photos/200/300?image=30",
      },
      {
        id: 4,
        text: "Item 4",
        thumbnail: "https://picsum.photos/200/300?image=40",
      },
      {
        id: 5,
        text: "Item 5",
        thumbnail: "https://picsum.photos/200/300?image=50",
      },
      {
        id: 6,
        text: "Item 6",
        thumbnail: "https://picsum.photos/200/300?image=60",
      },
    ]);
    return {
      items,
    };
  },
});
</script>
