/* global describe */
/* global it */
import { shallow, createLocalVue } from 'vue-test-utils';
import TrustedDeviceRequestCard from './TrustedDeviceRequestCard';
import Vuex from 'vuex';
import store from '@/store';
import preferencesTypes from '@/app/data/store/preferences/types';
import { preferenceDataStore } from '@/app/data/localForage/PreferenceDataStore';

describe.only('TrustedDeviceRequestCard.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TrustedDeviceRequestCard, { store, localVue });
  });
  describe('methods', () => {
    describe('yesClicked', () => {
      it('should set the store state to trusted', async () => {
        await wrapper.vm.yesClicked();
        expect(wrapper.vm.$store.getters[preferencesTypes.getters.isTrustedDevice]).to.be.true;
      });
      it('should set ask trusted to false', async () => {
        await wrapper.vm.yesClicked();
        expect(wrapper.vm.$store.getters[preferencesTypes.getters.doAskTrusted]).to.be.false;
      });
      it('should persist the trusted state', async () => {
        await wrapper.vm.yesClicked();
        expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device')).to.be.true;
      });
      it('should persist the trusted state', async () => {
        await wrapper.vm.yesClicked();
        expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted')).to.not.exist;
      });
    });
    describe('noClicked', () => {
      it('should set trusted to false');
      it('should set ask to true when ask is not ticked');
      it('should set ask to false when ask is ticked');
      it('should not set asked to false when it is not ticked');
    });
  });
});

