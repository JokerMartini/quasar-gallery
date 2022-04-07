<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Gallery </q-toolbar-title>

        <q-btn icon="add" flat @click="handleNewItem">Add</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import NewItemDialog from "components/NewItemDialog.vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const $q = useQuasar();

    const handleNewItem = () => {
      $q.dialog({
        component: NewItemDialog,

        // props forwarded to your custom component
        componentProps: {
          text: "something",
          // ...more..props...
        },
      }).onOk(() => {
        console.log("OK");
      });
    };
    return {
      handleNewItem,
    };
  },
});
</script>
