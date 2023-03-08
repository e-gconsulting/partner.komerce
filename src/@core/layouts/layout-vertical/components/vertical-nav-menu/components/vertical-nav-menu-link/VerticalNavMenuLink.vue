<!-- eslint-disable vue/no-v-html -->
<template>
  <li
    v-if="canViewVerticalNavMenuLink(item) && item.visible"
    class="nav-item"
    :class="{
      active: isActive,
      disabled: item.disabled,
    }"
  >
    <b-link
      v-if="item.title !== 'Inbox'"
      v-bind="linkProps"
      class="d-flex align-items-center"
      :class="{ 'childtitlestyle': Boolean(item.hasParent) }"
    >
      <div
        v-if="item.customicon"
        v-html="item.customicon"
      />
      <feather-icon
        v-else
        :icon="item.icon || (!Boolean(item.hasParent) ? 'CircleIcon' : '')"
      />
      <span
        class="menu-title text-truncate font-weight-bold"
        :class="{ 'text-black': !Boolean(item.hasParent) }"
      >{{ t(item.title) }}</span>
      <b-badge
        v-if="item.title === 'Kendala' && followUp!==0"
        pill
        :variant="'primary'"
        class="mr-1 ml-auto"
      >
        {{ followUp }}
      </b-badge>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
    <b-link
      v-if="item.title === 'Inbox' && inboxItems.length > 0"
      v-bind="linkProps"
      class="d-flex align-items-center"
      :class="{ 'childtitlestyle': Boolean(item.hasParent) }"
    >
      <div
        v-if="item.customicon"
        v-html="item.customicon"
      />
      <feather-icon
        v-else
        :icon="item.icon || (!Boolean(item.hasParent) ? 'CircleIcon' : '')"
      />
      <span
        class="menu-title text-truncate font-weight-bold"
        :class="{ 'text-black': !Boolean(item.hasParent) }"
      >{{ t(item.title) }}</span>
      <b-badge
        v-if="item.title === 'Kendala' && followUp!==0"
        pill
        :variant="'primary'"
        class="mr-1 ml-auto"
      >
        {{ followUp }}
      </b-badge>
      <b-badge
        v-if="item.title === 'Inbox'"
        pill
        :variant="'primary'"
        class="mr-1 ml-auto"
        :style="isActive ? 'background: white!important; color: #F95031!important;' : ''"
      >
        {{ countInbox.length }}
      </b-badge>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from '@core/libs/acl'
import { BLink, BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useVerticalNavMenuLink from './useVerticalNavMenuLink'
import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followUp: 0,
      inboxItems: [],
      countInbox: 0,
    }
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(
      props.item,
    )
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()

    return {
      isActive,
      linkProps,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to?.meta.resource !== from?.meta.resource && this.item.title === 'Kendala') {
          this.$http_komship.get('/v1/ticket-partner/count/need-followup').then(response => {
            this.followUp = response.data.data.need_followup ?? 0
          })
        }
        if (to?.meta.resource !== from?.meta.resource && this.item.title === 'Inbox') {
          this.$http_komship.get('/v1/partner-inbox/list').then(response => {
            this.countInbox = response.data.data.filter(item => item.is_read === 0)
            this.inboxItems = response.data.data
          })
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
