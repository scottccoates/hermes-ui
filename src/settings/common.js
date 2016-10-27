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
import UserSmartViewsReducer from '../scripts/domain/smart-view/messaging/reducers/user-smart-views-reducer';
import SmartViewEditReducer from '../scripts/domain/smart-view/messaging/reducers/smart-view-edit-reducer';

import SessionActions from '../scripts/apps/session/messaging/actions/session-actions';
import SessionService from '../scripts/apps/session/services/session-service';
import SessionRepository from '../scripts/apps/session/services/session-repository';

import UserActions from '../scripts/domain/user/messaging/actions/user-actions';
import UserService from '../scripts/domain/user/services/user-service';
import UserRepository from '../scripts/domain/user/services/user-repository';
import UserInfoReducer from '../scripts/domain/user/messaging/reducers/user-info-reducer';

import AgreementTypeActions from '../scripts/domain/agreement-type/messaging/actions/agreement-type-actions';
import AgreementTypeService from '../scripts/domain/agreement-type/services/agreement-type-service';
import AgreementTypeRepository from '../scripts/domain/agreement-type/services/agreement-type-repository';
import UserAgreementTypesReducer from '../scripts/domain/agreement-type/messaging/reducers/user-agreement-types-reducer';

import CounterpartyActions from '../scripts/domain/counterparty/messaging/actions/counterparty-actions';
import CounterpartyService from '../scripts/domain/counterparty/services/counterparty-service';
import CounterpartyRepository from '../scripts/domain/counterparty/services/counterparty-repository';
import UserCounterpartiesReducer from '../scripts/domain/counterparty/messaging/reducers/user-counterparties-reducer';

import AgreementActions from '../scripts/domain/agreement/messaging/actions/agreement-actions';
import AgreementService from '../scripts/domain/agreement/services/agreement-service';
import AgreementRepository from '../scripts/domain/agreement/services/agreement-repository';
import AgreementEditReducer from '../scripts/domain/agreement/messaging/reducers/agreement-edit-reducer';
import AgreementDetailReducer from '../scripts/domain/agreement/messaging/reducers/agreement-detail-reducer';
import UserAgreementsReducer from '../scripts/domain/agreement/messaging/reducers/user-agreements-reducer';

import AlertActions from '../scripts/domain/alert/messaging/actions/alert-actions';

import ClientSidePersistenceService from '../scripts/apps/persistence/services/client-side-persistence-service';

import * as constants from './constants';

export default {
  init(){
    const container = Intravenous.create();

    // -- REGISTRATION
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

    container.register(constants.USER_ACTIONS, UserActions);
    container.register(constants.USER_SERVICE, UserService);
    container.register(constants.USER_REPOSITORY, UserRepository);
    container.register(constants.USER_INFO_REDUCER, UserInfoReducer);

    container.register(constants.CLIENT_SIDE_PERSISTENCE_SERVICE, ClientSidePersistenceService);

    container.register(constants.AGREEMENT_ACTIONS, AgreementActions);
    container.register(constants.AGREEMENT_SERVICE, AgreementService);
    container.register(constants.AGREEMENT_REPOSITORY, AgreementRepository);

    container.register(constants.AGREEMENT_TYPE_ACTIONS, AgreementTypeActions);
    container.register(constants.AGREEMENT_TYPE_SERVICE, AgreementTypeService);
    container.register(constants.AGREEMENT_TYPE_REPOSITORY, AgreementTypeRepository);

    container.register(constants.COUNTERPARTY_ACTIONS, CounterpartyActions);
    container.register(constants.COUNTERPARTY_SERVICE, CounterpartyService);
    container.register(constants.COUNTERPARTY_REPOSITORY, CounterpartyRepository);

    container.register(constants.ALERT_ACTIONS, AlertActions);

    // -- DEPENDENCIES
    SessionActions.$inject    = [constants.APP_STORE, constants.SESSION_SERVICE];
    SessionService.$inject    = [constants.SESSION_REPOSITORY, constants.AUTH_SERVICE];
    SessionRepository.$inject = [constants.CLIENT_SIDE_PERSISTENCE_SERVICE];

    AppLayoutComponent.$inject = [constants.SIDEBAR_COMPONENT, constants.HEADER_COMPONENT, constants.FOOTER_COMPONENT];

    HeaderComponent.$inject = [constants.HEADER_SEARCH_COMPONENT, constants.HEADER_NAV_SECTION_COMPONENT];

    HeaderSearchComponent.$inject = [constants.SEARCH_ACTIONS, constants.SEARCH_SERVICE, constants.SMART_VIEW_ACTIONS, constants.SIMPLE_SEARCH_QUERY_INPUT_BOX, constants.SIMPLE_SEARCH_QUERY_LIST, constants.ADVANCED_SEARCH_QUERY_CONTAINER];

    SimpleSearchQueryList.$inject = [constants.SIMPLE_SEARCH_QUERY_LIST_ITEM];

    SearchActions.$inject = [constants.APP_STORE, constants.SEARCH_SERVICE];
    SearchService.$inject = [constants.SEARCH_REPOSITORY];

    SmartViewActions.$inject = [constants.APP_STORE, constants.SMART_VIEW_SERVICE];
    SmartViewService.$inject = [constants.SMART_VIEW_REPOSITORY];

    UserActions.$inject = [constants.APP_STORE, constants.USER_SERVICE];
    UserService.$inject = [constants.USER_REPOSITORY];

    AgreementTypeActions.$inject = [constants.APP_STORE, constants.AGREEMENT_TYPE_SERVICE];
    AgreementTypeService.$inject = [constants.AGREEMENT_TYPE_REPOSITORY];

    AgreementActions.$inject = [constants.APP_STORE, constants.AGREEMENT_SERVICE];
    AgreementService.$inject = [constants.AGREEMENT_REPOSITORY];

    CounterpartyActions.$inject = [constants.APP_STORE, constants.COUNTERPARTY_SERVICE];
    CounterpartyService.$inject = [constants.COUNTERPARTY_REPOSITORY];

    AlertActions.$inject = [constants.APP_STORE];

    return container;
  }
};
