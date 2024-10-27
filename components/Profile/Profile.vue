<template>
  <div :id="id" class="wrapper">
    <CoverPicture :src="require('~/assets/images/treatments/treatment1.jpg')">
      <CoverScroll target="#top-profile" />
    </CoverPicture>
    <div id="top-profile" class="profile__container">
      <div class="profile__body">
        <div class="section">
          <Section title right>
            <p
              v-for="(text, index) in contentExtractor(
                $t('profile.description[0]')
              )"
              :key="index"
              class="text-h6 text-justify font-weight-light"
              :class="{ 'my-16': index === 0 }"
              v-html="text"
            ></p>
          </Section>
          <div class="image-left main">
            <ProfilePicture
              :src="require('~/assets/images/profiles/profile.jpg')"
              height="78vh"
              width="52vh"
              horizontal
            ></ProfilePicture>
          </div>
        </div>
        <div class="section" :style="lightBackground">
          <Section>
            <p
              v-for="(text, index) in contentExtractor(
                $t('profile.description[1]')
              )"
              :key="index"
              class="text-h6 text-justify font-weight-light my-6"
              v-html="text"
            ></p>
          </Section>
          <div class="image-right">
            <ProfilePicture
              :src="ProfileImage"
              height="50vh"
              width="40vh"
              horizontal
              :border="themes.light.lightBackground"
            ></ProfilePicture>
          </div>
        </div>
        <div class="section">
          <Section right>
            <span class="apposthrope font-weight-bold font-italic">"</span>
            <p
              v-for="(text, index) in contentExtractor(
                $t('profile.description[2]')
              )"
              :key="index"
              class="text-h6 text-justify font-weight-light mb-8"
              v-html="text"
            ></p>
            <span class="apposthrope font-weight-bold font-italic">"</span>
          </Section>
          <div class="image-left">
            <ProfilePicture
              :src="require('~/assets/images/treatments/treatment4.jpg')"
              height="81vh"
              width="54vh"
              horizontal
            ></ProfilePicture>
          </div>
        </div>

        <div class="section" :style="lightBackground">
          <Section width="100%">
            <div class="history-header text-h3 font-weight-bold">
              <div class="history-title">
                {{ $t('profile.publication.label') }}
              </div>
            </div>
            <div>
              <ProfilePublicationItem
                v-for="index in 9"
                :key="`publication-${index}`"
                :title="$t(`profile.publication.list.${index - 1}.title`)"
                :subtitle="$t(`profile.publication.list.${index - 1}.subtitle`)"
                :detail="$t(`profile.publication.list.${index - 1}.detail`)"
                :index="index < 10 ? `0${index}` : `${index}`"
              />
            </div>
          </Section>
        </div>

        <div class="section">
          <Section right width="70%">
            <div class="history-header text-h3 font-weight-bold">
              <div class="history-title">{{ $t('profile.books.label') }}</div>
            </div>
            <div>
              <ProfileBookItem
                :title="$t(`profile.books.list[0].title`)"
                :author="$t(`profile.books.list[0].author`)"
                :detail="$t(`profile.books.list[0].detail`)"
              />
            </div>
            <div class="image-left">
              <ProfilePicture
                :src="require('~/assets/images/treatments/treatment7.jpg')"
                height="50vh"
                width="33vh"
                horizontal
              ></ProfilePicture>
            </div>
          </Section>
        </div>

        <div class="section" :style="lightBackground">
          <Section width="100%">
            <div class="history-header text-h3 font-weight-bold">
              <div class="history-title">
                {{ $t('profile.summaries.label') }}
              </div>
            </div>
            <div>
              <ProfilePublishedSummary
                v-for="index in 10"
                :key="`published-summary-${index}`"
                :title="$t(`profile.summaries.list.${index - 1}.title`)"
                :author="$t(`profile.summaries.list.${index - 1}.author`)"
                :detail="$t(`profile.summaries.list.${index - 1}.detail`)"
                :index="index < 10 ? `0${index}` : `${index}`"
              />
            </div>
          </Section>
        </div>

        <div class="section">
          <Section width="60%">
            <div class="vita__header">
              <div class="vita__title text-h3 font-weight-bold">
                {{ $t('profile.vita.label') }}
              </div>
            </div>
            <div>
              <ProfileVitaItem
                v-for="index in 7"
                :key="`vita-${index}`"
                :title="$t(`profile.vita.list.${index - 1}.title`)"
                :subtitle="$t(`profile.vita.list.${index - 1}.subtitle`)"
                :year="$t(`profile.vita.list.${index - 1}.year`)"
                :place="$t(`profile.vita.list.${index - 1}.place`)"
              />
            </div>
          </Section>
          <div class="image-right">
            <ProfilePicture
              :src="require('~/assets/images/treatments/treatment2.jpg')"
              height="60vh"
              width="40vh"
              horizontal
            ></ProfilePicture>
          </div>
        </div>
        <!-- <div class="vita__container">
          <div>
            <ProfilePicture
              :src="require('~/assets/images/treatments/treatment2.jpg')"
              height="100%"
              width="33vw"
              horizontal
            ></ProfilePicture>
          </div>
          <div class="vita__subcontainer">
            <div class="vita__header">
              <div class="vita__title text-h3 font-weight-bold">
                {{ $t('profile.vita.label') }}
              </div>
            </div>
            <div>
              <ProfileVitaItem
                v-for="index in 7"
                :key="`vita-${index}`"
                :title="$t(`profile.vita.list.${index - 1}.title`)"
                :subtitle="$t(`profile.vita.list.${index - 1}.subtitle`)"
                :year="$t(`profile.vita.list.${index - 1}.year`)"
                :place="$t(`profile.vita.list.${index - 1}.place`)"
              />
            </div>
          </div>
        </div> -->

        <div class="section" :style="lightBackground">
          <Section width="100%">
            <div class="history-header text-h3 font-weight-bold">
              <div class="history-title">{{ $t('profile.posters.label') }}</div>
            </div>
            <div>
              <ProfileBookItem
                v-for="index in 12"
                :key="`posters-${index}`"
                :title="$t(`profile.posters.list.${index - 1}.title`)"
                :author="$t(`profile.posters.list.${index - 1}.author`)"
                :detail="$t(`profile.posters.list.${index - 1}.detail`)"
              />
            </div>
          </Section>
        </div>
        <div class="section">
          <Section width="100%">
            <div class="history-header text-h3 font-weight-bold">
              <div class="history-title">
                {{ $t('profile.conferences.label') }}
              </div>
            </div>
            <div>
              <ProfilePublicationItem
                v-for="index in 25"
                :key="`conferences-${index}`"
                :title="$t(`profile.conferences.list.${index - 1}.title`)"
                :subtitle="$t(`profile.conferences.list.${index - 1}.detail`)"
                :detail="$t(`profile.conferences.list.${index - 1}.author`)"
                :index="index < 10 ? `0${index}` : `${index}`"
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
    <!-- <FooterComponent /> -->
  </div>
</template>

<script>
import ProfileVitaItem from './ProfileVitaItem'
import ProfileBookItem from './ProfileBookItem'
import ProfilePicture from './ProfilePicture'
import Section from './PSection'
import ProfilePublicationItem from './ProfilePublicationItem'
import ProfilePublishedSummary from './ProfilePublishedSummary'
import CoverPicture from '~/components/Global/CoverPicture'
import CoverScroll from '~/components/Global/CoverScroll'
import ProfileImage from '~/assets/images/profiles/profile-2.png'

import { contentExtractor } from '~/helpers'

export default {
  components: {
    ProfileVitaItem,
    ProfileBookItem,
    ProfilePicture,
    ProfilePublicationItem,
    ProfilePublishedSummary,
    CoverPicture,
    CoverScroll,
    Section,
  },
  data() {
    return {
      id: 'profile',
      ProfileImage,
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    backgroundComponentStyle() {
      return {
        background: this.themes.light.primary3,
      }
    },
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
  },
  methods: {
    contentExtractor(input) {
      return contentExtractor(input)
    },
  },
}
</script>

<style scoped>
.section {
  position: relative;
}

.image-left {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 200px;
  z-index: 1;
}
.image-left.main {
  transform: translateY(10%) !important;
  top: auto !important;
  bottom: 0px !important;
}

.image-right {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 200px;
  z-index: 1;
}

@media only screen and (max-width: 1584px) {
  .image-left {
    left: 80px;
  }
  .image-right {
    right: 80px;
  }
}

@media only screen and (max-width: 1368px) {
  .image-left {
    left: 40px;
  }
  .image-right {
    right: 40px;
  }
}
.apposthrope {
  font-size: 75px;
  font-family: Avenir;
  color: #868686;
}

.history-header {
  margin-bottom: 40px;
}
.history-title {
  /* font-weight: 800;
  font-size: 48px; */
  line-height: 66px;
  text-align: justify;
}

.vita__container {
  display: flex;
  align-items: stretch;
  padding: 0px;
}
.vita__subcontainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 160px;
}
.vita__header {
  display: flex;
  align-items: center;
}
.vita__title {
  /* font-weight: 800;
  font-size: 48px; */
  line-height: 66px;
  text-align: justify;
}

.wrapper {
  margin-top: -48px;
}
</style>
