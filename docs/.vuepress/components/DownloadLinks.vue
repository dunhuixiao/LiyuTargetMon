<script setup lang="ts">
import { release } from "../data/release";

const downloadItems = release.downloads.map((item) => ({
  ...item,
  href: `${release.cdnBase}/targetmon/${encodeURIComponent(item.fileName)}`,
}));
</script>

<template>
  <p v-for="item in downloadItems" :key="item.fileName">
    <a :href="item.href" :download="item.fileName">{{ item.label }}</a>
  </p>
</template>
