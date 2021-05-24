<template>
  <div>
    <div class="col-sm-12">
      <h1 class="title mb-3">{{ T.wordsContests }}</h1>
    </div>
    <b-card no-body>
      <b-tabs
        v-model="activeTab"
        class="sidebar"
        pills
        card
        vertical
        nav-wrapper-class="contest-list-nav col-sm-4 col-md-2"
      >
        <b-tab
          ref="currentContestTab"
          :title="T.contestListCurrent"
          :title-link-class="titleLinkClass(ContestTab.Current)"
          active
        >
          <b-card 
            v-for="contest in contests.current"
            :key="contest.contest_id"
            class="mb-3"
            no-body
          >
            <b-card-body>
              <b-row>
                <b-col cols="9">
                  <b-link :href="`/arena/${contest.alias}`">{{contest.title}}</b-link>
                  <span>{{contest.organizer}}</span>
                </b-col>
                <b-col cols="3">
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="9">
                  <a :href="getTimeLink(contest.start_time.iso())">{{contest.start_time.long()}}</a>
                  <span>{{time.toDDHHMM(contest.duration)}}</span>
                  <span>{{contest.contestants}}</span>
                </b-col>
                <b-col cols="3">
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-tab>
        <b-tab
          ref="futureContestTab"
          :title="T.contestListFuture"
          :title-link-class="titleLinkClass(ContestTab.Future)"
        >
          {{ contests.future }}
        </b-tab>
        <b-tab
          ref="pastContestTab"
          :title="T.contestListPast"
          :title-link-class="titleLinkClass(ContestTab.Past)"
        >
          <b-card 
            v-for="contest in contests.past"
            class="mb-3"
          >
            <b-card-title>{{contest.title}}</b-card-title>
            <b-card-text>{{contest}}</b-card-text>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { types } from '../../api_types';
import T from '../../lang';
import * as time from '../../time';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Only Required Plugins
import { TabsPlugin, CardPlugin, LinkPlugin, LayoutPlugin } from 'bootstrap-vue';
Vue.use(TabsPlugin);
Vue.use(CardPlugin);
Vue.use(LinkPlugin);
Vue.use(LayoutPlugin);

export enum ContestTab {
  Current = 0,
  Future = 1,
  Past = 2,
}

@Component({
  components: {},
})
export default class ArenaContestList extends Vue {
  @Prop() contests!: types.ContestList;
  T = T;
  time = time;
  ContestTab = ContestTab;
  activeTab: ContestTab = ContestTab.Current;

  titleLinkClass(tab: ContestTab) {
    if (this.activeTab === tab) {
      return ['text-center', 'active-title-link'];
    } else {
      return ['text-center', 'title-link'];
    }
  }

  getTimeLink(time: string): string {
    return `http://timeanddate.com/worldclock/fixedtime.html?iso=${time}`;
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../sass/main.scss';

.sidebar {
  /deep/ .contest-list-nav {
    background-color: var(
      --arena-contest-list-sidebar-tab-list-background-color
    );

    .active-title-link {
      background-color: var(
        --arena-contest-list-sidebar-tab-list-link-background-color--active
      ) !important;
    }

    .title-link {
      color: var(
        --arena-contest-list-sidebar-tab-list-link-font-color
      ) !important;
    }
  }
}
</style>
