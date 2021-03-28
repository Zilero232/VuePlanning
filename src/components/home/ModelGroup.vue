<template>
<div id="modal1" class="modal modal__group" ref="modal">
    <div class="modal-content">
        <h4>Выберите группу</h4>
        <div class="modal__group-wrapper">
            <button class="modal__group-link" v-for="item in groupArray" :key="item" @click="selectingAgroup(item)" :class="{'active__group': item == groupName}">{{ item }}</button>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
    </div>
</div>
</template>

<script>
export default {
    props: ['modelGroup', 'groupArray', 'groupName'],
    data() {
        return {
            modal: '',
        }
    },
    watch: {
        modelGroup() {
            this.modal.open()
        }
    },
    methods: {
        selectingAgroup(group) {
            this.modal.close()
            this.$emit('selectingAgroup', group)
        }
    },
    mounted() {
        this.modal = M.Modal.init(this.$refs.modal)
    }
}
</script>
