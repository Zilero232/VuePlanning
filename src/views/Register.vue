<template>
<div class="form__block">
    <vue-headful title="Регистрация" />
    <form class="col s12" @submit.prevent="submitHandler">
        <div class="row">
            <div class="input-field col s12">
                <input id="name" type="text" class="validate" v-model="name">
                <label for="name">Name</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="email" type="email" class="validate" v-model="email">
                <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
            </div>
        </div>
        <div class="row card-action">
            <button class="btn waves-effect waves-light auth-submit register" type="submit">
                Зарегистрироваться
                <i class="material-icons right">send</i>
            </button>
            <div class="center">
                Есть аккаунт?
                <router-link to="/login">Войти</router-link>
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            name: ''
        }
    },
    methods: {
        async submitHandler() {
            try {
                const user = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }
                await this.$store.dispatch('register', user)
                this.$message('Регистрация прошла успешно!')
                this.$router.push('/login')
            } catch (e) {

            }

        }
    },
}
</script>
