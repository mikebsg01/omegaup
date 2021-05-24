<template>
	<b-card
		class="contest-card mb-3"
		no-body
	>
		<b-card-body>
			<b-row class="mb-4">
				<b-col cols="9">
					<b-link 
            :href="`/arena/${contest.alias}`"
            class="contest-card-title"
          >
            {{contest.title}}
          </b-link>
					<div class="d-inline-block contest-card-organizer">
            <img 
              src="/media/contestlist/organize.svg"
              class="d-inline-block icon-organize"
            />
            <span>
              {{contest.organizer}}
            </span>
          </div>
				</b-col>
				<b-col cols="3">
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="9">
          <div class="d-inline-block contest-card-date">
            <img 
              src="/media/contestlist/schedule.svg"
              class="d-inline-block icon-schedule"
            />
            <span>
              <b>Termina: </b>
              <a :href="getTimeLink(contest.finish_time.iso())">{{contest.finish_time | datetime}}</a>
            </span>
          </div>
          <div class="d-inline-block contest-card-duration">
            <img 
              src="/media/contestlist/chronometer.svg"
              class="d-inline-block icon-chronometer"
            />
					  <span>{{time.toDDHHMM(contest.duration)}} hrs</span>
          </div>
          <div class="d-inline-block contest-card-contestants">
            <img 
              src="/media/contestlist/multiple-users.svg"
              class="d-inline-block icon-multiple-users"
            />
					  <span>{{contest.contestants}}</span>
          </div>
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
import * as moment from 'moment';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


// Import Only Required Plugins
import { TabsPlugin, CardPlugin, LinkPlugin, LayoutPlugin } from 'bootstrap-vue';
Vue.use(TabsPlugin);
Vue.use(CardPlugin);
Vue.use(LinkPlugin);
Vue.use(LayoutPlugin);

@Component({
  filters: {
    datetime(dt: Date) {
      return moment(dt).format('DD/MM/YYYY HH:mm:ss');
    },
    duration(seconds: number) {
      return moment({}).seconds(seconds).format('H:mm');
    }
  }
})
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

.contest-card {
  box-shadow: 4px 6px 8px 2px rgba(175, 175, 175, 0.125);
  border: 1px solid rgba(125, 125, 125, 0.125);

  /deep/ {
    .contest-card-title {
      font-size: 22px;
    }

    .contest-card-organizer {
      margin-left: 20px;

      & > .icon-organize {
        height: 20px;
      }

      & > span {
        margin-left: 6px;
        font-size: 16px;
      }
    }

    .contest-card-date {
      & > .icon-schedule {
        height: 20px;
      }

      & > span {
        margin-left: 6px;

        a {
          color: var(--contest-card-date-link);
        }
      }
    }

    .contest-card-duration {
      margin-left: 15px;

      & > .icon-chronometer {
        height: 20px;
      }

      & > span {
        margin-left: 6px;
      }
    }

    .contest-card-contestants {
      margin-left: 15px;

      & > .icon-multiple-users {
        height: 20px;
      }

      & > span {
        margin-left: 6px;
      }
    }
  }
}
</style>
