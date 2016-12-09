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

import AgreementNewCreateComponent from '../scripts/domain/agreement/components/agreement-new/agreement-new-create-component';
import AgreementEditContainerComponent from '../scripts/domain/agreement/components/agreement-edit/agreement-edit-container-component';
import AgreementEditFormComponent from '../scripts/domain/agreement/components/agreement-edit/agreement-edit-form-component';
import AgreementListContainerComponent from '../scripts/domain/agreement/components/agreement-list/agreement-list-container-component';
import AgreementListComponent from '../scripts/domain/agreement/components/agreement-list/agreement-list-component';
import AgreementListItemComponent from '../scripts/domain/agreement/components/agreement-list/agreement-list-item-component';
import AgreementDetailContainerComponent from '../scripts/domain/agreement/components/agreement-detail/agreement-detail-container-component';
import AgreementDetailGeneralInfoComponent from '../scripts/domain/agreement/components/agreement-detail/agreement-detail-general-info-component';
import AgreementDetailLengthComponent from '../scripts/domain/agreement/components/agreement-detail/agreement-detail-length-component';
import AgreementDetailArtifactsComponent from '../scripts/domain/agreement/components/agreement-detail/agreement-detail-artifacts-component';

import AlertListComponent from '../scripts/domain/alert/components/alert-list/alert-list-component';
import AlertListItemComponent from '../scripts/domain/alert/components/alert-list/alert-list-item-component';

import ClientSidePersistenceService from '../scripts/apps/persistence/services/client-side-persistence-service';

import NprogressBar from '../scripts/apps/feedback/components/loading/nprogress-bar';

import DashboardComponent from '../scripts/apps/dashboard/components/dashboard-component';

import * as constants from './constants';
import TMP from '../scripts/domain/agreement/components/agreement-detail/tmp';

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

    container.register(constants.AGREEMENT_NEW_CREATE_COMPONENT, AgreementNewCreateComponent);
    container.register(constants.AGREEMENT_EDIT_CONTAINER_COMPONENT, AgreementEditContainerComponent);
    container.register(constants.AGREEMENT_EDIT_FORM_COMPONENT, AgreementEditFormComponent);
    container.register(constants.AGREEMENT_LIST_CONTAINER_COMPONENT, AgreementListContainerComponent);
    container.register(constants.AGREEMENT_LIST_ITEM_COMPONENT, AgreementListItemComponent);
    container.register(constants.AGREEMENT_LIST_COMPONENT, AgreementListComponent);
    container.register(constants.AGREEMENT_DETAIL_CONTAINER_COMPONENT, AgreementDetailContainerComponent);
    container.register(constants.AGREEMENT_DETAIL_GENERAL_INFO_COMPONENT, AgreementDetailGeneralInfoComponent);
    container.register(constants.AGREEMENT_DETAIL_LENGTH_COMPONENT, AgreementDetailLengthComponent);
    container.register(constants.AGREEMENT_DETAIL_ARTIFACTS_COMPONENT, AgreementDetailArtifactsComponent);


    container.register(constants.AGREEMENT_TYPE_ACTIONS, AgreementTypeActions);
    container.register(constants.AGREEMENT_TYPE_SERVICE, AgreementTypeService);
    container.register(constants.AGREEMENT_TYPE_REPOSITORY, AgreementTypeRepository);

    container.register(constants.COUNTERPARTY_ACTIONS, CounterpartyActions);
    container.register(constants.COUNTERPARTY_SERVICE, CounterpartyService);
    container.register(constants.COUNTERPARTY_REPOSITORY, CounterpartyRepository);

    container.register(constants.ALERT_ACTIONS, AlertActions);

    container.register(constants.ALERT_LIST_COMPONENT, AlertListComponent);
    container.register(constants.ALERT_LIST_ITEM_COMPONENT, AlertListItemComponent);

    container.register(constants.DASHBOARD_COMPONENT, DashboardComponent);

    container.register(constants.PROGRESS_BAR, NprogressBar);

    container.register('TMP',TMP);
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

    AgreementListComponent.$inject            = [constants.AGREEMENT_LIST_ITEM_COMPONENT];
    AgreementNewCreateComponent.$inject       = [constants.PERSISTENCE_API_SERVICE_URL, constants.FILE_UPLOAD, constants.PROGRESS_BAR + '!'];
    AgreementEditContainerComponent.$inject   = [constants.AGREEMENT_ACTIONS, constants.AGREEMENT_TYPE_SERVICE, constants.AGREEMENT_EDIT_FORM_COMPONENT];
    AgreementListContainerComponent.$inject   = [constants.AGREEMENT_LIST_COMPONENT];
    AgreementListComponent.$inject            = [constants.AGREEMENT_LIST_ITEM_COMPONENT];
    AgreementDetailContainerComponent.$inject = [constants.AGREEMENT_ACTIONS, constants.AGREEMENT_DETAIL_GENERAL_INFO_COMPONENT, constants.AGREEMENT_DETAIL_LENGTH_COMPONENT, constants.AGREEMENT_DETAIL_ARTIFACTS_COMPONENT];
    AgreementDetailArtifactsComponent.$inject = [constants.AGREEMENT_SERVICE, constants.PERSISTENCE_API_SERVICE_URL, constants.FILE_UPLOAD];


    CounterpartyActions.$inject = [constants.APP_STORE, constants.COUNTERPARTY_SERVICE];
    CounterpartyService.$inject = [constants.COUNTERPARTY_REPOSITORY];

    AlertActions.$inject = [constants.APP_STORE];

    AlertListComponent.$inject = [constants.ALERT_LIST_ITEM_COMPONENT];

    DashboardComponent.$inject = [constants.ALERT_LIST_COMPONENT, constants.ALERT_LIST_ITEM_COMPONENT];

    return container;
  }
};
