<template>
<div class="wrapper">
    <vue-headful title="Расписание" />
    <Loader v-show="Loader" />
    <ModelGroup :modelGroup="isOpenGroup" :groupArray="schedule.group" @selectingAgroup="selectingAgroup" :groupName="group.name" />
    <div v-show="!Loader">
        <Navbar :admin="admin" :time="date" />
        <div class="wrapper__group">
            <div class="wrapper__group-version">Группа: <span>{{ group.name }}</span></div>

            <button class="btn waves-effect waves-light" type="submit" name="action" @click="isOpenGroup = !isOpenGroup">
                <i class="material-icons right">assignment</i>
                Выбрать группу
            </button>
        </div>

        <Sidebar :admin="admin" />

        <Loader v-show="!LoaderTable" />
        <div class="wrapper__block" v-show="LoaderTable">
            <h1 class="title">{{ group.title  }} <br> {{ group.subtitle }}</h1>
            <ul class="tabs tabs-fixed-width tab-demo z-depth-1" ref="tabs">
                <li class="tab"><a :class="{active: alternationDate.count}" href="#test1">Чётная неделя</a></li>
                <li class="tab"><a :class="{active: !alternationDate.count}" href="#test2">Нечётная неделя</a></li>
            </ul>
            <div id="test1" :class="{'active': alternationDate.count}">
                <Planning :planning="group.plan_even" :group="group.name" :time="schedule.time" @changeDatabase="changeDatabase" :admin="admin" />
            </div>
            <div id="test2" :class="{'active': !alternationDate.count}">
                <Planning :planning="group.plan_odd" :group="group.name" :time="schedule.time" @changeDatabase="changeDatabase" :admin="admin" />
            </div>
        </div>

        <Model v-if="!Loader" :count="alternationDate.count" />
        <div class="developer">
            <a class="btn-floating btn-large pulse" href="https://vk.com/sashaganster" target="_blank">Саня</a>
        </div>
    </div>
</div>
</template>

<script>
import Planning from '@/components/home/Planning.vue'
import Navbar from '@/components/home/Navbar.vue'
import Sidebar from '@/components/home/Sidebar.vue'
import Model from '@/components/home/Model.vue'
import ModelGroup from '@/components/home/ModelGroup.vue'

export default {
    data() {
        return {
            schedule: [],
            group: [],
            alternationDate: {
                date: '',
                count: ''
            },
            Loader: true,
            admin: false,
            uid: '',
            date: '',
            isOpenGroup: false,
            LoaderTable: true,
        }
    },
    components: {
        Planning,
        Navbar,
        Sidebar,
        Model,
        ModelGroup
    },
    methods: {
        async checkAdmin() {
            this.uid = await this.$store.dispatch('getUid')
            if (this.uid === 'FuS1diMo1EPiFcpidp1Wmf4xlwD3') {
                this.admin = true
            }
        },
        checkDate() {
            const currentDate = this.$date(new Date(), 'date'),
                D = new Date(this.alternationDate.date);
            D.setDate(D.getDate() + 7);

            const alternationDate = this.$date(D);
            if (currentDate == alternationDate) {
                this.alternationDate.count = !this.alternationDate.count
                const obg = {
                    date: D,
                    count: this.alternationDate.count
                }
                this.$store.dispatch('setDate', obg)
            }
        },
        async selectingAgroup(group) {
            this.LoaderTable = false
            this.group = await this.$store.dispatch('getPlanningGroup', group);
            localStorage.setItem('group', group);
            this.LoaderTable = true
            this.Loader = false;
        }
    },
    async mounted() {
        try {
            this.schedule = await this.$store.dispatch('getSchedule');

            this.alternationDate.date = await this.schedule.alternation_date.date;
            this.alternationDate.count = await this.schedule.alternation_date.count;
            this.date = await this.schedule.last_time;

            await this.checkAdmin();
            await this.checkDate();

            M.Tabs.init(this.$refs.tabs);

            if (localStorage.getItem('group')) {
                this.group = await this.$store.dispatch('getPlanningGroup', localStorage.getItem('group'));
                this.Loader = false;
            } else {
                this.LoaderTable = false
                this.isOpenGroup = true
            }
        } catch (e) {}
    }
}
</script>
