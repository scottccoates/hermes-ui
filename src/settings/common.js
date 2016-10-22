import Intravenous from 'intravenous';

import AppLayoutComponent from '../scripts/apps/app-layout/components/app-layout';

import SidebarComponent from '../scripts/apps/app-layout/components/sidebar/sidebar';

import FooterComponent from '../scripts/apps/app-layout/components/footer/footer';

import HeaderComponent from '../scripts/apps/app-layout/components/header/header-component';
import HeaderNavSectionComponent from '../scripts/apps/app-layout/components/header/header-nav-section-component';
import HeaderSearchComponent from '../scripts/apps/app-layout/components/header/header-search-component';

import SimpleSearchQueryList from '../scripts/apps/search/components/query/simple-search-query-list';
import SimpleSearchQueryListItem from '../scripts/apps/search/components/query/simple-search-query-list-item';
import SimpleSearchQueryInputBox from '../scripts/apps/search/components/query/simple-search-query-input-box';
import AdvancedSearchQueryContainer from '../scripts/apps/search/components/query/advanced-search-query-container';

import SessionActions from '../scripts/apps/session/messaging/actions/session-actions';

import * as constants from './constants';

export default {
  init(){
    const container = Intravenous.create();

    container.register(constants.APP_LAYOUT_COMPONENT, AppLayoutComponent);

    container.register(constants.SIDEBAR_COMPONENT, SidebarComponent);

    container.register(constants.FOOTER_COMPONENT, FooterComponent);

    container.register(constants.HEADER_COMPONENT, HeaderComponent);
    container.register(constants.HEADER_NAV_SECTION_COMPONENT, HeaderNavSectionComponent);
    container.register(constants.HEADER_SEARCH_COMPONENT, HeaderSearchComponent);

    container.register(constants.SIMPLE_SEARCH_QUERY_LIST, SimpleSearchQueryList);

    container.register(constants.SIMPLE_SEARCH_QUERY_LIST_ITEM, SimpleSearchQueryListItem);
    container.register(constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, SimpleSearchQueryInputBox);
    container.register(constants.ADVANCED_SEARCH_QUERY_CONTAINER, AdvancedSearchQueryContainer);

    container.register(constants.SESSION_ACTIONS, SessionActions);
    container.register(constants.SESSION_SERVICE, ()=>({
      // todo replace me with real service
      async resumeSession(){
        throw new Error('error');
      }
    }));

    SessionActions.$inject = [constants.APP_STORE, constants.SESSION_SERVICE];

    AppLayoutComponent.$inject = [constants.SIDEBAR_COMPONENT, constants.HEADER_COMPONENT, constants.FOOTER_COMPONENT];

    HeaderComponent.$inject = [constants.HEADER_SEARCH_COMPONENT, constants.HEADER_NAV_SECTION_COMPONENT];

    // todo use me HeaderSearchComponent.$inject = [constants.SEARCH_ACTIONS, constants.SEARCH_SERVICE, constants.SMART_VIEW_ACTIONS, constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, constants.SIMPLE_SEARCH_QUERY_LIST, constants.ADVANCED_SEARCH_QUERY_CONTAINER];
    HeaderSearchComponent.$inject = [constants.SESSION_SERVICE, constants.SESSION_SERVICE, constants.SESSION_SERVICE, constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, constants.SIMPLE_SEARCH_QUERY_LIST, constants.ADVANCED_SEARCH_QUERY_CONTAINER];

    SimpleSearchQueryList.$inject = [constants.SIMPLE_SEARCH_QUERY_LIST_ITEM];

    return container;
  }
};
