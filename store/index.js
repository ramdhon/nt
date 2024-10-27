export const state = () => ({
  locales: ['en', 'de'],
  locale: 'en',

  tab: 0,
  labels: ['welcome', 'ivtherapies', 'procedures', 'profile', 'contact'],

  mobileLabels: [
    {
      icon: 'fas fa-heart',
      label: 'mobileHome',
      active: true,
    },
    {
      icon: 'fas fa-smile',
      label: 'ivtherapies',
      active: false,
    },
    {
      icon: 'fas fa-user-md',
      label: 'procedures',
      active: false,
    },
    {
      icon: 'fas fa-id-card-alt',
      label: 'mobileProfile',
      active: false,
    },
    {
      icon: 'fas fa-map-pin',
      label: 'contact',
      active: false,
    },
  ],
  sideNav: false,

  path: 'welcome',
  userAgent: '',
  ready: false,

  maxScrollDeltaSpeedBetweenSection: 70,
  currentID: '#welcome',
  fromID: '',
  sectionID: [
    '#welcome',
    // 'treatments',
    // '#practices',
    '#infoDesk',
    '#drNidalToman',
    '#contact',
  ],

  // treatment details
  activeTab: 'general',
  visibleTreatmentDetail: false,
  figurePart: '',
  figureSubpart: 0,
  outpatientDetail: false,
})

export const mutations = {
  SET_READY(state, val) {
    state.ready = val
  },
  SET_TAB(state, val) {
    state.tab = val
  },
  SET_LOCALE(state, val) {
    state.locale = val
  },
  SET_ACTIVE_TAB_TREATMENT_DETAIL(state, { activeTab }) {
    state.activeTab = activeTab
  },
  SET_CURRENT_ID(state, val) {
    state.currentID = val
  },
  SET_FROM_ID(state, val) {
    state.fromID = val
  },
  SET_PATH(state, val) {
    state.path = val
  },
  SET_USERAGENT(state, val) {
    state.userAgent = val
  },
  SET_VISIBLE_TREATMENT_DETAIL(state, val) {
    state.visibleTreatmentDetail = val
  },
  SET_FIGURE_PART(state, val) {
    state.figurePart = val
  },
  SET_FIGURE_SUBPART(state, val) {
    state.figureSubpart = val
  },
  SET_OUTPATIENTDETAIL(state, val) {
    state.outpatientDetail = val
  },
  SET_SIDENAV(state, val) {
    state.sideNav = val
  },
}
