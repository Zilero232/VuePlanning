<template>
<nav>
    <div class="nav-wrapper">
        <img class="logo" :src="require(`@/assets/logo.gif`)">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-if="!name">
                <router-link to="/login">Войти</router-link>
            </li>
            <li v-if="name">
                <a @click.prevent="logout">Выйти</a>
            </li>
            <li>
                <i class="material-icons">access_time</i>
                <p>Последние изменение: {{ time }} </p>

            </li>
            <li v-if="name">
                <i class="material-icons">face</i>
                <p><b>{{ name }}</b></p>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    props: ['admin', 'time'],
    data() {
        return {
            name: ''
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout');
            this.$message('Вы вышли!')
            location.reload()
        },
    },
    async mounted() {
        this.name = await this.$store.dispatch('getName')
    },
}
</script>
