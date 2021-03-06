import { shallowMount } from '@vue/test-utils';
import { types } from '../../api_types';

import T from '../../lang';

import common_Requests from './Requests.vue';

describe('Requests.vue', () => {
  const data: types.IdentityRequest[] = [
    {
      accepted: false,
      admin: {
        username: 'test_user',
      },
      last_update: new Date(),
      request_time: new Date(),
      username: 'test_user',
      classname: 'user-rank-unranked',
    },
  ];

  const propsData = {
    data,
    textAddParticipant: T.contestAdduserAddContestant,
  };

  it('Should handle initital props', () => {
    const wrapper = shallowMount(common_Requests, { propsData });

    expect(wrapper.text()).toContain(T.contestAdduserAddContestant);
  });

  it('Should handle deny request event', async () => {
    const wrapper = shallowMount(common_Requests, { propsData });

    await wrapper.find('button.text-danger').trigger('click');
    expect(wrapper.emitted('deny-request')).toBeDefined();
    expect(wrapper.emitted('deny-request')).toEqual([
      [{ username: 'test_user' }],
    ]);
  });

  it('Should handle accept request event', async () => {
    const wrapper = shallowMount(common_Requests, { propsData });

    await wrapper.find('button.text-success').trigger('click');
    expect(wrapper.emitted('accept-request')).toBeDefined();
    expect(wrapper.emitted('accept-request')).toEqual([
      [{ username: 'test_user' }],
    ]);
  });
});
