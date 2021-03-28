<template>
<div id="modal1" class="modal" ref="modal">
    <div class="modal-content">
        <h4>Текущая неделя: <span v-if="count">Чётная</span> <span v-if="!count">Нечётная</span></h4>
    </div>
    <div class="modal-footer">
        <button href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</button>
    </div>
</div>
</template>

<script>
export default {
    props: ['count'],
    mounted() {
        M.Modal.init(this.$refs.modal).open();
    },
}
</script>
