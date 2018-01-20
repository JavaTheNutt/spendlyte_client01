/* global describe */
/* global it */
import { shallow, createLocalVue } from 'vue-test-utils';
import TrustedDeviceRequestCard from './TrustedDeviceRequestCard';
import Vuex from 'vuex';
import store from '@/store';
import preferencesTypes from '@/app/data/store/preferences/types';
import { preferenceDataStore } from '@/app/data/localForage/PreferenceDataStore';

describe('TrustedDeviceRequestCard.vue', () => {
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
      it('should emit a revertState event', async () => {
        await wrapper.vm.yesClicked();
        expect(wrapper.emitted()['revert-state'].length).to.eql(1);
      });
    });
    describe('noClicked', () => {
      describe('do not ask ticked', () => {
        beforeEach(() => wrapper.vm.noAskTrusted = true);
        it('should set trusted to false locally', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.vm.$store.getters[preferencesTypes.getters.isTrustedDevice]).to.be.false;
        });
        it('should set trusted to false persistent', async () => {
          await wrapper.vm.noClicked();
          expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device')).to.not.exist;
        });
        it('should set ask to false locally when ask is ticked', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.vm.$store.getters[preferencesTypes.getters.doAskTrusted]).to.be.false;
        });
        it('should set ask to false persistently when ask is ticked', async () => {
          await wrapper.vm.noClicked();
          expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted')).to.be.false;
        });
        it('should emit a revertState event', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.emitted()['revert-state'].length).to.eql(1);
        });
      });
      describe('do not ask not ticked', () => {
        before(() => wrapper.vm.noAskTrusted = false);
        it('should set ask to true locally when ask is not ticked', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.vm.$store.getters[preferencesTypes.getters.doAskTrusted]).to.be.true;
        });
        it('should set ask to true persistently when ask is not ticked', async () => {
          await wrapper.vm.noClicked();
          expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted')).to.be.true;
        });
        it('should set trusted to false locally when it is not ticked', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.vm.$store.getters[preferencesTypes.getters.isTrustedDevice]).to.be.false;
        });
        it('should set trusted to false persistently when it is not ticked', async () => {
          await wrapper.vm.noClicked();
          expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device')).to.not.exist;
        });
        it('should emit a revertState event', async () => {
          await wrapper.vm.noClicked();
          expect(wrapper.emitted()['revert-state'].length).to.eql(1);
        });
      });
    });
    describe('closeClicked', () => {
      it('should emit a close event to the parent', () => {
        wrapper.vm.closeClicked();
        expect(wrapper.emitted()['dialog-closed'].length).to.eql(1);
      });
    });
  });
});

