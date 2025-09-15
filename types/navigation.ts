export interface NavItem {
  label: string;
  href: string;
  active_path?: string;
  icon?: string;
  badge?: string;
  submenu?: NavItem[];
}

export interface NavigationData {
  navigation_config: {
    main_navigation: NavItem[];
    mobile_navigation: {
      hamburger_style: string;
      overlay_background: string;
      text_color: string;
      close_icon: string;
      animation: string;
    };
    navigation_styling: {
      desktop: {
        header_height: string;
        background: string;
        border_bottom: string;
        logo_height: string;
        menu_item_color: string;
        menu_item_hover: string;
        active_item_color: string;
        dropdown_background: string;
        dropdown_shadow: string;
        dropdown_border_radius: string;
      };
      mobile: {
        background: string;
        text_color: string;
        active_color: string;
        border_color: string;
      };
    };
    navigation_behavior: {
      sticky_header: boolean;
      dropdown_animation: string;
      dropdown_delay: number;
      active_state_indicator: string;
      hover_effect: string;
      mobile_breakpoint: string;
      submenu_max_depth: number;
    };
    // Other properties can be added here if needed
  };
}
