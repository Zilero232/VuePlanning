<template>
<div>
    <ul id="slide-out" class="sidenav omitted" ref="sidebar">
        <h5 class="title">Доска опущения
            <a v-if="admin" class="btn-floating btn-large waves-effect waves-light red" @click="openModal"><i class="material-icons">add</i></a>
        </h5>
        <SitebarBlock :admin="admin" v-for="info in sitebar" :key="info.id" :title="info.title" :url="info.url" :name="info.description" @deleteSitebar="deleteSitebar(info.id)" />
    </ul>
    <div class="arrow-down sidenav-trigger" data-target="slide-out">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div id="modal1" class="modal modalSidebar" ref="modal">
        <div class="modal-content">
            <h4>Введите информацию о обьявлении</h4>
            <form class="col s12" @submit.prevent="addSitebar">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="title" type="text" class="validate" v-model="info.title">
                        <label for="title">Заголовок</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="url" type="text" class="validate" v-model="info.url">
                        <label for="url">URL - изображения</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="description" type="text" class="validate" v-model="info.description">
                        <label for="description">Описание</label>
                    </div>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light auth-submit" type="submit">
                        Добавить обьявление
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="modal-close waves-effect waves-green btn-flat">Закрыть</button>
        </div>
    </div>
</div>
</template>

<script>
import SitebarBlock from './SitebarBlock'

export default {
    props: ['admin'],
    data() {
        return {
            sitebar: [],
            modal: '',
            info: {
                title: '',
                url: '',
                description: '',
            }
        }
    },
    methods: {
        deleteSitebar(id) {
            this.sitebar = this.sitebar.filter(item => item.id != id)
            this.$store.dispatch('deleleteBoard', id)
        },
        openModal() {
            this.modal.open()
        },
        async addSitebar() {
            const newSitebar = {
                title: this.info.title,
                url: this.info.url,
                description: this.info.description
            }

            const info = await this.$store.dispatch('pushBoard', newSitebar)
            newSitebar.id = info
            if (!this.sitebar) this.sitebar = [];
            this.sitebar.unshift(newSitebar);
            this.modal.close()
        }
    },
    async mounted() {
        M.Sidenav.init(this.$refs.sidebar)
        this.modal = M.Modal.init(this.$refs.modal)
        try {
            this.sitebar = await this.$store.dispatch('getBoard')
        } catch (e) {}
    },
    components: {
        SitebarBlock,
    }
}
</script>
