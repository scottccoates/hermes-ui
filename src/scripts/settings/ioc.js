/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from '../libs/react-js/components/file-upload';

import RoutingService from 'src/scripts/libs/routing/services/routing-service';

import NprogressBar from 'src/scripts/apps/feedback/components/loading/nprogress-bar';

import AppLayoutComponent from 'src/scripts/apps/app-layout/components/app-layout';

import SidebarComponent from 'src/scripts/apps/app-layout/components/sidebar/sidebar';

import HeaderComponent from 'src/scripts/apps/app-layout/components/header/header-component';
import HeaderNavSectionComponent from 'src/scripts/apps/app-layout/components/header/header-nav-section-component';
import HeaderSearchComponent from 'src/scripts/apps/app-layout/components/header/header-search-component';

import SessionRepository from 'src/scripts/apps/session/services/session-repository';
import SessionService from 'src/scripts/apps/session/services/session-service';
import SessionActions from 'src/scripts/apps/session/messaging/actions/session-actions';
import SessionReducer from 'src/scripts/apps/session/messaging/reducers/session-reducer';

import LogoutComponent from 'src/scripts/apps/session/components/logout-component';

import AgreementNewCreateComponent from '../domain/agreement/components/agreement-new/agreement-new-create-component';
import AgreementEditContainerComponent from '../domain/agreement/components/agreement-edit/agreement-edit-container-component';
import AgreementEditFormComponent from '../domain/agreement/components/agreement-edit/agreement-edit-form-component';
import AgreementListComponent from '../domain/agreement/components/agreement-list/agreement-list-component';
import AgreementListItemComponent from '../domain/agreement/components/agreement-list/agreement-list-item-component';
import AgreementDetailContainerComponent from '../domain/agreement/components/agreement-detail/agreement-detail-container-component';
import AgreementDetailGeneralInfoComponent from '../domain/agreement/components/agreement-detail/agreement-detail-general-info-component';
import AgreementDetailLengthComponent from '../domain/agreement/components/agreement-detail/agreement-detail-length-component';
import AgreementDetailArtifactsComponent from '../domain/agreement/components/agreement-detail/agreement-detail-artifacts-component';

import AgreementActions from '../domain/agreement/messaging/actions/agreement-actions';
import AgreementService from '../domain/agreement/services/agreement-service';
import AgreementRepository from '../domain/agreement/services/agreement-repository';
import AgreementEditReducer from 'src/scripts/domain/agreement/messaging/reducers/agreement-edit-reducer';
import AgreementDetailReducer from 'src/scripts/domain/agreement/messaging/reducers/agreement-detail-reducer';
import UserAgreementsReducer from 'src/scripts/domain/agreement/messaging/reducers/user-agreements-reducer';

import AgreementTypeActions from '../domain/agreement-type/messaging/actions/agreement-type-actions';
import AgreementTypeService from '../domain/agreement-type/services/agreement-type-service';
import AgreementTypeRepository from '../domain/agreement-type/services/agreement-type-repository';
import UserAgreementTypesReducer from 'src/scripts/domain/agreement-type/messaging/reducers/user-agreement-types-reducer';

import CounterpartyActions from '../domain/counterparty/messaging/actions/counterparty-actions';
import CounterpartyService from '../domain/counterparty/services/counterparty-service';
import CounterpartyRepository from '../domain/counterparty/services/counterparty-repository';
import UserCounterpartiesReducer from 'src/scripts/domain/counterparty/messaging/reducers/user-counterparties-reducer';

import SmartViewEditFormComponent from '../domain/smart-view/components/smart-view-edit/smart-view-edit-form-component';

import SmartViewActions from '../domain/smart-view/messaging/actions/smart-view-actions';
import SmartViewService from '../domain/smart-view/services/smart-view-service';
import SmartViewRepository from '../domain/smart-view/services/smart-view-repository';
import UserSmartViewsReducer from 'src/scripts/domain/smart-view/messaging/reducers/user-smart-views-reducer';
import SmartViewEditReducer from 'src/scripts/domain/smart-view/messaging/reducers/smart-view-edit-reducer';

import DashboardComponent from '../apps/dashboard/components/dashboard-component';

import ClientSidePersistenceService from 'src/scripts/apps/persistence/services/client-side-persistence-service';

import SimpleSearchQueryList from '../apps/search/components/query/simple-search-query-list';
import SimpleSearchQueryListItem from '../apps/search/components/query/simple-search-query-list-item.js';
import SimpleSearchQueryInputBox from '../apps/search/components/query/simple-search-query-input-box';
import AdvancedSearchQueryContainer from '../apps/search/components/query/advanced-search-query-container';

import SearchService from 'src/scripts/apps/search/services/search-service';
import SearchRepository from 'src/scripts/apps/search/services/search-repository';
import SearchActions from 'src/scripts/apps/search/messaging/actions/search-actions';
import AdvancedSearchReducer from 'src/scripts/apps/search/messaging/reducers/advanced-search-reducer';

import SearchResultContainer from '../apps/search/components/result/search-result-container';
import SearchResultList from '../apps/search/components/result/search-result-list';
import SearchResultItem from '../apps/search/components/result/search-result-item';

import { createHistory , useQueries} from 'history';

export default {
  init(){
    const container = Intravenous.create({
      onDispose: function (obj, serviceName) {
        console.log('wtf!!!!!', obj, serviceName);
      }
    });

    container.register("AppLayoutComponent", AppLayoutComponent);

    container.register("SidebarComponent", SidebarComponent);

    container.register("HeaderComponent", HeaderComponent);
    container.register("HeaderNavSectionComponent", HeaderNavSectionComponent);
    container.register("HeaderSearchComponent", HeaderSearchComponent);

    container.register("DashboardComponent", DashboardComponent);

    container.register("SimpleSearchQueryList", SimpleSearchQueryList);
    container.register("SimpleSearchQueryListItem", SimpleSearchQueryListItem);
    container.register("SimpleSearchQueryInputBox", SimpleSearchQueryInputBox);
    container.register("AdvancedSearchQueryContainer", AdvancedSearchQueryContainer);

    container.register("SearchResultContainer", SearchResultContainer);
    container.register("SearchResultList", SearchResultList);
    container.register("SearchResultItem", SearchResultItem);

    container.register("SearchService", SearchService);
    container.register("SearchRepository", SearchRepository);
    container.register("SearchActions", SearchActions);
    container.register("AdvancedSearchReducer", AdvancedSearchReducer);

    container.register("AgreementNewCreateComponent", AgreementNewCreateComponent);
    container.register("AgreementEditContainerComponent", AgreementEditContainerComponent);
    container.register("AgreementEditFormComponent", AgreementEditFormComponent);
    container.register("AgreementListComponent", AgreementListComponent);
    container.register("AgreementListItemComponent", AgreementListItemComponent);
    container.register("AgreementDetailContainerComponent", AgreementDetailContainerComponent);
    container.register("AgreementDetailGeneralInfoComponent", AgreementDetailGeneralInfoComponent);
    container.register("AgreementDetailLengthComponent", AgreementDetailLengthComponent);
    container.register("AgreementDetailArtifactsComponent", AgreementDetailArtifactsComponent);

    container.register("AgreementActions", AgreementActions);
    container.register("AgreementService", AgreementService);
    container.register("AgreementRepository", AgreementRepository);
    container.register("AgreementEditReducer", AgreementEditReducer);
    container.register("AgreementDetailReducer", AgreementDetailReducer);
    container.register("UserAgreementsReducer", UserAgreementsReducer);

    container.register("AgreementTypeActions", AgreementTypeActions);
    container.register("AgreementTypeService", AgreementTypeService);
    container.register("AgreementTypeRepository", AgreementTypeRepository);
    container.register("UserAgreementTypesReducer", UserAgreementTypesReducer);

    container.register("SmartViewEditFormComponent", SmartViewEditFormComponent);

    container.register("SmartViewActions", SmartViewActions);
    container.register("SmartViewService", SmartViewService);
    container.register("SmartViewRepository", SmartViewRepository);
    container.register("UserSmartViewsReducer", UserSmartViewsReducer);
    container.register("SmartViewEditReducer", SmartViewEditReducer);

    container.register("CounterpartyActions", CounterpartyActions);
    container.register("CounterpartyService", CounterpartyService);
    container.register("CounterpartyRepository", CounterpartyRepository);
    container.register("UserCounterpartiesReducer", UserCounterpartiesReducer);

    container.register("FileUpload", FileUpload);

    container.register("RoutingService", RoutingService);

    container.register("ClientSidePersistenceService", ClientSidePersistenceService);

    container.register("SessionRepository", SessionRepository);
    container.register("SessionService", SessionService);
    container.register("SessionReducer", SessionReducer);
    container.register("SessionActions", SessionActions);
    container.register("LogoutComponent", LogoutComponent);

    container.register("NprogressBar", NprogressBar);

    // https://github.com/rackt/history/blob/master/docs/QuerySupport.md
    const history = useQueries(createHistory)();
    container.register("History", history);

    AppLayoutComponent.$inject = ['SidebarComponent', 'HeaderComponent'];

    SidebarComponent.$inject = ['SmartViewActions'];

    HeaderComponent.$inject       = ['HeaderSearchComponent', 'HeaderNavSectionComponent'];
    HeaderSearchComponent.$inject = ['SearchActions', 'SearchService', 'SmartViewActions', 'SimpleSearchQueryInputBox', 'SimpleSearchQueryList', 'AdvancedSearchQueryContainer'];
    DashboardComponent.$inject    = ["AgreementListComponent"];

    AgreementNewCreateComponent.$inject       = ["PersistenceApiServiceUrl", "FileUpload", "NprogressBarFactory"];
    AgreementEditContainerComponent.$inject   = ["AgreementActions", 'AgreementEditFormComponent'];
    AgreementListComponent.$inject            = ["AgreementListItemComponent"];
    AgreementDetailContainerComponent.$inject = ['AgreementActions', "AgreementDetailGeneralInfoComponent", 'AgreementDetailLengthComponent', 'AgreementDetailArtifactsComponent'];
    AgreementDetailArtifactsComponent.$inject = ['AgreementService'];

    AgreementActions.$inject    = ['AppStore', "AgreementService"];
    AgreementService.$inject    = ["AgreementRepository"];
    AgreementRepository.$inject = ["PersistenceApiService"];

    AgreementTypeActions.$inject    = ['AppStore', "AgreementTypeService"];
    AgreementTypeService.$inject    = ["AgreementTypeRepository"];
    AgreementTypeRepository.$inject = ["PersistenceApiService"];

    CounterpartyActions.$inject = ["AppStore"];

    FileUpload.$inject = ["DropzoneFactory"];

    RoutingService.$inject = ["History"];

    SimpleSearchQueryInputBox.$inject = ["SearchService"];
    SimpleSearchQueryList.$inject     = ['SimpleSearchQueryListItem'];

    SearchResultContainer.$inject = ['SearchActions', 'SmartViewActions', "AgreementListComponent", 'SmartViewEditFormComponent'];
    SearchResultList.$inject      = ["SearchResultItem"];

    SearchActions.$inject    = ["AppStore", 'SearchService'];
    SearchService.$inject    = ["SearchRepository", 'RoutingService'];
    SearchRepository.$inject = ["PersistenceApiService"];

    SmartViewActions.$inject    = ["AppStore", 'SmartViewService'];
    SmartViewService.$inject    = ["SmartViewRepository"];
    SmartViewRepository.$inject = ["PersistenceApiService"];

    SessionActions.$inject    = ['AppStore', "SessionService"];
    SessionService.$inject    = ["SessionRepository", "AuthService"];
    SessionRepository.$inject = ["ClientSidePersistenceService"];
    LogoutComponent.$inject   = ['SessionActions'];

    return container;
  }
};
