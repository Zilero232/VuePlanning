<template>
<div class="omitted__block">
    <a class="omitted__close" v-if="admin" @click="deleteSitebar"><i class="material-icons">close</i></a>
    <div class="omitted__title">{{ title }}</div>
    <div class="omitted__img">
        <img :src="url" alt="" loading="lazy">
    </div>
    <div class="omitted__subtitle">{{ name }}</div>
</div>
</template>

<script>
export default {
    props: ['title', 'url', 'name', 'admin'],
    methods: {
        deleteSitebar() {
            this.$emit('deleteSitebar')
        }
    },
}
</script>
