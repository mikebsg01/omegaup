<template>
	<b-card
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { types } from '../../api_types';
import T from '../../lang';
import * as ui from '../../ui';
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

@Component
export default class FilteredList extends Vue {
  @Prop() contest: types.ContestListItem;
  T = T;
  ui = ui;
  time = time;

  getTimeLink(time: string): string {
    return `http://timeanddate.com/worldclock/fixedtime.html?iso=${time}`;
  }

  mounted() {
    window.console.log(this.contest);
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../sass/main.scss';
</style>
