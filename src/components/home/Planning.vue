<template>
<div class="table">
    <div class="table__wrapper table__thead">
        <div class="table__wrapper-day table__thead-column">ДЕНЬ НЕДЕЛИ</div>
        <div class="table__wrapper-row">
            <div class="table__wrapper-work table__thead-column" ref="field" :contenteditable="admin">
                ВРЕМЯ УРОКА
            </div>
            <div class="table__wrapper-work table__thead-column" ref="field" :contenteditable="admin">
                № УРОКА
            </div>
            <div class="table__wrapper-office table__thead-column" ref="field" :contenteditable="admin">
                № КАБ.
            </div>
            <div class="table__wrapper-couple table__thead-column" ref="field" :contenteditable="admin">
                {{ group }}
            </div>
        </div>
    </div>
    <div class="table__wrapper table__body" v-for="(val, count) in planning" :key="count">
        <div class="table__wrapper-day" :contenteditable="admin" @blur="changeDatabase(count, index, $event)">{{ val.day }}</div>
        <div class="table__wrapper-row" v-for="(plan, index) in val.planning" :key="plan">
            <div class="table__wrapper-time" :contenteditable="admin" @blur="changeDatabase(count, index, $event)">
                {{ time[index] }}
            </div>
            <div class="table__wrapper-work table__column">
                <p>{{ plan.count }}</p>
                <p>{{ plan.count + 1 }}</p>
            </div>
            <div class="table__wrapper-office table__column" :contenteditable="admin" @blur="changeDatabase(count, index, $event)"><span>{{ plan.office }}</span></div>
            <div class="table__wrapper-couple table__column" :contenteditable="admin" @blur="changeDatabase(count, index, $event)"><span>{{ plan.plan }}</span></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['planning', 'time', 'admin', 'group'],
    methods: {
        changeDatabase(count, index, event) {
            const date = this.$date(new Date(), 'datetime');

            const element = {
                name: this.planning[0].name,
                tag: event.target.className,
                text: event.target.textContent,
                index,
                count,
                date,
                group: this.group,
            }
            this.$store.dispatch('changeDatabase', element)
        }
    },
}
</script>
