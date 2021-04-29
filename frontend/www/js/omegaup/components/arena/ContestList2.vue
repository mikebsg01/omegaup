<template>
  <div>
    <h1>Concursos</h1>
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="col-2">
        <b-tab title="Actuales" title-link-class="text-center" active>
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
        <b-tab title="Próximos" title-link-class="text-center">
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
        <b-tab title="Pasados" title-link-class="text-center">
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
}
</script>
