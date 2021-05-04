<template>
  <div>
    <div class="col-sm-12">
      <h1 class="title">Concursos</h1>
    </div>
    <b-card no-body>
      <b-tabs
        v-model="tabIndex"
        pills
        card
        vertical
        nav-wrapper-class="custom-nav col-2"
      >
        <b-tab title="Actuales" :title-link-class="titleLinkClass(0)" active>
          <b-card-text>
            <b-card
              v-for="contest of contests.current"
              :key="contest.contest_id"
              :title="contest.title"
            >
              <b-card-text>
                {{ contest.description }}
              </b-card-text>
            </b-card>
          </b-card-text>
        </b-tab>
        <b-tab title="Próximos" :title-link-class="titleLinkClass(1)">
          <b-card-text>
            <b-card
              v-for="contest of contests.future"
              :key="contest.contest_id"
              :title="contest.title"
            >
              <b-card-text>
                {{ contest.description }}
              </b-card-text>
            </b-card>
          </b-card-text>
        </b-tab>
        <b-tab title="Pasados" :title-link-class="titleLinkClass(2)">
          <b-card-text>
            <b-card
              v-for="contest of contests.past"
              :key="contest.contest_id"
              :title="contest.title"
            >
              <b-card-text>
                {{ contest.description }}
              </b-card-text>
            </b-card>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { omegaup } from '../../omegaup';
import T from '../../lang';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { TabsPlugin, CardPlugin } from 'bootstrap-vue';
Vue.use(TabsPlugin);
Vue.use(CardPlugin);

@Component({
  components: {},
})
export default class ArenaContestList extends Vue {
  @Prop() contests!: omegaup.ArenaContests;
  @Prop() isLogged!: boolean;
  T = T;
  tabIndex = 0;

  titleLinkClass(idx) {
    if (this.tabIndex === idx) {
      return ['text-center', 'active-title-link'];
    } else {
      return ['text-center', 'title-link'];
    }
  }
}
</script>

<style type="text/css">
.title {
  font-size: 32px;
  margin-bottom: 30px;
}

.custom-nav {
  background-color: #efefef;
}

.custom-nav .active-title-link {
  background-color: #5588dd !important;
}

.custom-nav .title-link {
  color: #5588dd !important;
}
</style>
