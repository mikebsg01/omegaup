import { OmegaUp } from '../omegaup';
import * as time from '../time';
import { types } from '../api_types';
import Vue from 'vue';
import arena_ContestList from '../components/arena/ContestList2.vue';

OmegaUp.on('ready', () => {
  time.setSugarLocale();
  const payload = types.payloadParsers.ContestListPayload();
  new Vue({
    el: '#main-container',
    components: { 'omegaup-arena-contestlist': arena_ContestList },
    data: () => ({
      initialQuery: payload.query,
      isLogged: payload.isLogged,
      contests: payload.contests,
    }),
    render: function (createElement) {
      return createElement('omegaup-arena-contestlist', {
        props: {
          initialQuery: this.initialQuery,
          contests: this.contests,
          isLogged: this.isLogged,
        },
      });
    },
  });
});
