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

import SearchActions from '../scripts/apps/search/messaging/actions/search-actions';
import SearchService from '../scripts/apps/search/services/search-service';
import SearchRepository from '../scripts/apps/search/services/search-repository';

import SmartViewActions from '../scripts/domain/smart-view/messaging/actions/smart-view-actions';
import SmartViewService from '../scripts/domain/smart-view/services/smart-view-service';
import SmartViewRepository from '../scripts/domain/smart-view/services/smart-view-repository';

import SessionActions from '../scripts/apps/session/messaging/actions/session-actions';
import SessionService from '../scripts/apps/session/services/session-service';
import SessionRepository from '../scripts/apps/session/services/session-repository';

import ClientSidePersistenceService from '../scripts/apps/persistence/services/client-side-persistence-service';

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

    container.register(constants.SEARCH_ACTIONS, SearchActions);
    container.register(constants.SEARCH_SERVICE, SearchService);
    container.register(constants.SEARCH_REPOSITORY, SearchRepository);

    container.register(constants.SMART_VIEW_ACTIONS, SmartViewActions);
    container.register(constants.SMART_VIEW_SERVICE, SmartViewService);
    container.register(constants.SMART_VIEW_REPOSITORY, SmartViewRepository);

    container.register(constants.SIMPLE_SEARCH_QUERY_LIST, SimpleSearchQueryList);
    container.register(constants.SIMPLE_SEARCH_QUERY_LIST_ITEM, SimpleSearchQueryListItem);
    container.register(constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, SimpleSearchQueryInputBox);
    container.register(constants.ADVANCED_SEARCH_QUERY_CONTAINER, AdvancedSearchQueryContainer);

    container.register(constants.SESSION_ACTIONS, SessionActions);
    container.register(constants.SESSION_SERVICE, SessionService);
    container.register(constants.SESSION_REPOSITORY, SessionRepository);

    container.register(constants.CLIENT_SIDE_PERSISTENCE_SERVICE, ClientSidePersistenceService);

    SessionActions.$inject = [constants.APP_STORE, constants.SESSION_SERVICE];
    SessionService.$inject = [constants.SESSION_REPOSITORY, constants.AUTH_SERVICE];
    SessionRepository.$inject = [constants.CLIENT_SIDE_PERSISTENCE_SERVICE];

    AppLayoutComponent.$inject = [constants.SIDEBAR_COMPONENT, constants.HEADER_COMPONENT, constants.FOOTER_COMPONENT];

    HeaderComponent.$inject = [constants.HEADER_SEARCH_COMPONENT, constants.HEADER_NAV_SECTION_COMPONENT];

    HeaderSearchComponent.$inject = [constants.SEARCH_ACTIONS, constants.SEARCH_SERVICE, constants.SMART_VIEW_ACTIONS, constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, constants.SIMPLE_SEARCH_QUERY_LIST, constants.ADVANCED_SEARCH_QUERY_CONTAINER];

    SimpleSearchQueryList.$inject = [constants.SIMPLE_SEARCH_QUERY_LIST_ITEM];

    SearchActions.$inject = [constants.APP_STORE, constants.SEARCH_SERVICE];
    SearchService.$inject = [constants.SEARCH_REPOSITORY];

    SmartViewActions.$inject = [constants.APP_STORE, constants.SMART_VIEW_SERVICE];
    SmartViewService.$inject = [constants.SMART_VIEW_REPOSITORY];

    return container;
  }
};
