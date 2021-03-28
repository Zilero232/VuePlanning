<template>
<div class="form__block">
     <vue-headful title="Авторизация" />
    <form class="col s12" @submit.prevent="submitHandler">
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
            <button class="btn waves-effect waves-light auth-submit" type="submit">
                Войти
                <i class="material-icons right">send</i>
            </button>
            <div class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
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
            password: ''
        }
    },
    methods: {
        async submitHandler() {
            const user = {
                email: this.email,
                password: this.password
            }

            try {
                await this.$store.dispatch('login', user);
                this.$message('Авторизация прошла успешно!')
                this.$router.push('/')
            } catch (e) {
                 this.$message('Данные введены не верно!')
            }
        }
    },
}
</script>
