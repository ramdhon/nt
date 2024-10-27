<template>
  <MobileView>
    <!-- <MobileView class="top-section"> </MobileView> -->
    <CoverHeader
      :src="require('~/assets/images/treatments/treatment1.jpg')"
      :color="themes.light.background"
    ></CoverHeader>
    <MobileView class="mt-16 pa-4">
      <CustomSVG
        class="ml-n4 mb-n2"
        :src="require('~/assets/name.svg')"
        width="19rem"
        height="2.5rem"
        :color="themes.light.primary3"
        cover
      ></CustomSVG>
      <span class="text-caption font-weight-light text-uppercase">{{
        $t('profile.subtitle')
      }}</span>
    </MobileView>
    <v-img
      position="top center"
      :src="require('~/assets/images/profiles/profile.jpg')"
      width="100vw"
      height="100vw"
    ></v-img>
    <MobileView class="content-section">
      <p
        v-for="(text, index) in contentExtractor($t('profile.description[0]'))"
        :key="index"
        class="text-justify font-weight-light"
        v-html="text"
      ></p>
    </MobileView>
    <v-img
      position="top center"
      :src="require('~/assets/images/profiles/profile-2.png')"
      width="100vw"
      height="100vw"
    ></v-img>
    <MobileView class="content-section">
      <p
        v-for="(text, index) in contentExtractor($t('profile.description[1]'))"
        :key="index"
        class="text-justify font-weight-light"
        v-html="text"
      ></p>
    </MobileView>
    <v-img
      :src="require('~/assets/images/treatments/treatment4.jpg')"
      width="100vw"
      height="100vw"
    ></v-img>
    <MobileView class="content-section">
      <p
        v-for="(text, index) in contentExtractor($t('profile.description[2]'))"
        :key="index"
        class="text-justify font-weight-light"
        v-html="text"
      ></p>
    </MobileView>

    <MobileView id="mobile-publication" class="list-section title">
      <span class="font-weight-bold">{{
        $t('profile.publication.label')
      }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.publication" color="primary3">
          <template v-for="index in 9">
            <v-list-item
              :key="`publication-${index}`"
              @click="openDialog('publication', index)"
            >
              <v-list-item-avatar>
                <v-icon>fas fa-file</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="$t(`profile.publication.list.${index - 1}.title`)"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="$t(`profile.publication.list.${index - 1}.subtitle`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 9" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <MobileView id="mobile-books" class="list-section title">
      <span class="font-weight-bold">{{ $t('profile.books.label') }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.books" color="primary3">
          <template v-for="index in 1">
            <v-list-item
              :key="`books-${index}`"
              @click="openDialog('books', index)"
            >
              <v-list-item-avatar>
                <v-icon>fas fa-book</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="$t(`profile.books.list.${index - 1}.title`)"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="$t(`profile.books.list.${index - 1}.author`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 1" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <MobileView id="mobile-summaries" class="list-section title">
      <span class="font-weight-bold">{{ $t('profile.summaries.label') }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.summaries" color="primary3">
          <template v-for="index in 10">
            <v-list-item
              :key="`summaries-${index}`"
              @click="openDialog('summaries', index)"
            >
              <v-list-item-avatar>
                <v-icon>fas fa-file-alt</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="$t(`profile.summaries.list.${index - 1}.title`)"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="$t(`profile.summaries.list.${index - 1}.author`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 10" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <MobileView id="mobile-vita" class="list-section title">
      <span class="font-weight-bold">{{ $t('profile.vita.label') }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.vita" color="primary3">
          <template v-for="index in 7">
            <v-list-item
              :key="`summaries-${index}`"
              @click="openDialog('vita', index)"
            >
              <v-list-item-content>
                <v-list-item-title
                  ><span class="font-weight-bold">{{
                    $t(`profile.vita.list.${index - 1}.year`)
                  }}</span>
                  ::
                  {{
                    $t(`profile.vita.list.${index - 1}.title`)
                  }}</v-list-item-title
                >
                <v-list-item-subtitle
                  v-html="$t(`profile.vita.list.${index - 1}.subtitle`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 7" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <MobileView id="mobile-posters" class="list-section title">
      <span class="font-weight-bold">{{ $t('profile.posters.label') }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.posters" color="primary3">
          <template v-for="index in 12">
            <v-list-item
              :key="`posters-${index}`"
              @click="openDialog('posters', index)"
            >
              <v-list-item-avatar>
                <v-icon>fas fa-portrait</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="$t(`profile.posters.list.${index - 1}.title`)"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="$t(`profile.posters.list.${index - 1}.author`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 12" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <MobileView id="mobile-conferences" class="list-section title">
      <span class="font-weight-bold">{{
        $t('profile.conferences.label')
      }}</span>
    </MobileView>
    <MobileView class="list-section">
      <v-list flat three-line>
        <v-list-item-group v-model="selectedItem.conferences" color="primary3">
          <template v-for="index in 25">
            <v-list-item
              :key="`conferences-${index}`"
              @click="openDialog('conferences', index)"
            >
              <v-list-item-avatar>
                <v-icon>fas fa-comment-alt</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="$t(`profile.conferences.list.${index - 1}.title`)"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="$t(`profile.conferences.list.${index - 1}.author`)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index !== 24" :key="index" inset></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </MobileView>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary3">
          <v-btn icon dark @click="dialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('profile.details') }}</v-toolbar-title>
        </v-toolbar>
        <MobileView v-if="detailList === 'publication'" class="section">
          <p class="text-h6 font-weight-bold">
            "{{
              $t(`profile.publication.list.${selectedItem.publication}.title`)
            }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{
              $t(
                `profile.publication.list.${selectedItem.publication}.subtitle`
              )
            }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.publication.list.${selectedItem.publication}.detail`)
          }}</span>
        </MobileView>
        <MobileView v-if="detailList === 'books'" class="section">
          <p class="text-h6 font-weight-bold">
            "{{ $t(`profile.books.list.${selectedItem.books}.title`) }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{ $t(`profile.books.list.${selectedItem.books}.author`) }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.books.list.${selectedItem.books}.detail`)
          }}</span>
        </MobileView>
        <MobileView v-if="detailList === 'summaries'" class="section">
          <p class="text-h6 font-weight-bold">
            "{{ $t(`profile.summaries.list.${selectedItem.summaries}.title`) }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{
              $t(`profile.summaries.list.${selectedItem.summaries}.author`)
            }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.summaries.list.${selectedItem.summaries}.detail`)
          }}</span>
        </MobileView>
        <MobileView v-if="detailList === 'vita'" class="section">
          <p class="text-h4 font-weight-bold text-center">
            {{ $t(`profile.vita.list.${selectedItem.vita}.year`) }}
          </p>
          <p class="text-h6 font-weight-bold">
            "{{ $t(`profile.vita.list.${selectedItem.vita}.title`) }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{ $t(`profile.vita.list.${selectedItem.vita}.subtitle`) }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.vita.list.${selectedItem.vita}.place`)
          }}</span>
        </MobileView>
        <MobileView v-if="detailList === 'posters'" class="section">
          <p class="text-h6 font-weight-bold">
            "{{ $t(`profile.posters.list.${selectedItem.posters}.title`) }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{
              $t(`profile.posters.list.${selectedItem.posters}.author`)
            }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.posters.list.${selectedItem.posters}.detail`)
          }}</span>
        </MobileView>
        <MobileView v-if="detailList === 'conferences'" class="section">
          <p class="text-h6 font-weight-bold">
            "{{
              $t(`profile.conferences.list.${selectedItem.conferences}.title`)
            }}"
          </p>
          <span class="font-weight-light font-italic mb-3"
            >--{{
              $t(`profile.conferences.list.${selectedItem.conferences}.author`)
            }}</span
          >
          <span class="font-weight-light">{{
            $t(`profile.conferences.list.${selectedItem.conferences}.detail`)
          }}</span>
        </MobileView>
      </v-card>
    </v-dialog>
  </MobileView>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import CoverHeader from '~/components/Mobile/CoverHeader'
import CustomSVG from '~/components/Global/CustomSVG'

import { contentExtractor, finalpath } from '~/helpers'

export default {
  components: {
    MobileView,
    CoverHeader,
    CustomSVG,
  },
  data() {
    return {
      selectedItem: {
        publication: -1,
        books: -1,
        summaries: -1,
        vita: -1,
        posters: -1,
        conferences: -1,
      },
      detailList: '',
      dialog: false,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
  },
  methods: {
    contentExtractor(input) {
      return contentExtractor(input)
    },
    openDialog(item, selected) {
      this.dialog = true
      this.detailList = item
      if (selected) {
        // this helps undefined click for selected list
        this.$nextTick(() => {
          this.selectedItem[item] = selected - 1
        })
      }
    },
    goto(link) {
      window.open(link, '_blank')
    },
    gotoContact() {
      this.$router.push({
        path: finalpath(this.locale, 'contact'.true),
        hash: '#contact-form',
      })
    },
  },
}
</script>

<style>
.top-section {
  padding: 64px 0px;
}
.section {
  padding: 10vh 5vw;
}
.content-section {
  padding: 5vw;
  padding-bottom: 5vh;
}
.list-section {
  padding: 5vh 0px;
  padding-top: 0px;
}
.list-section.title {
  padding: 5vh 5vw;
  padding-bottom: 0px;
}
</style>
