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

        let isAvailableMenu = isAvailableMenuFilter[0]
        isAvailableMenu = { ...isAvailableMenu, visible: !!isAvailableMenu }

        // level 2
        if (isAvailableMenu.children) {
          isAvailableMenu.children.forEach((child, index) => {
            isAvailableMenu.children[index].visible = !!menu.childrens.filter(
              val => val.name === child.title,
            )

            // level 3
            if (child.children) {
              child.children.forEach((child2, index2) => {
                isAvailableMenu.children[index].children[
                  index2
                ].visible = !!menu.childrens.filter(
                  val2 => val2.name === child2.title,
                )
              })
            }
          })
        }
        return isAvailableMenu
      })

      return this.user.role_name === 'Management'
        ? visibleMenus
        : this.items.map(item => ({
          ...item,
          // level 2
          children: item.children?.map(child => ({
            ...child,
            visible: true,
            // level 3
            children: child.children?.map(child2 => ({
              ...child2,
              visible: true,
            })),
          })),
          visible: true,
        }))
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
