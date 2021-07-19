<template>
  <ul>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in filteredItems"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      menus: [],
    }
  },
  computed: {
    filteredItems() {
      const visibleMenus = this.menus.map(menu => {
        const isAvailableMenuFilter = this.items.filter(
          item => item.title === menu.name,
        )

        const isAvailableMenu = isAvailableMenuFilter[0]
        isAvailableMenu.visible = !!isAvailableMenu

        isAvailableMenu.children.forEach((child, index) => {
          isAvailableMenu.children[index].visible = !!menu.childrens.filter(
            val => val.name === child.title,
          )
        })
        return isAvailableMenu
      })

      return this.user.role_name === 'Management'
        ? visibleMenus
        : this.items.map(item => ({ ...item, visible: true }))
    },
  },
  created() {
    this.user = this.$store.state.auth.userData
    const positionId = this.user.position_id
    this.$http
      .get(
        `menu/getMyMenuAndAccess?komerce_application_id=4&position_id=${positionId}`,
      )
      .then(({ data }) => {
        this.menus = data.data
      })
  },
  setup() {
    provide('openGroups', ref([]))
    return {
      resolveNavItemComponent,
    }
  },
}
</script>
