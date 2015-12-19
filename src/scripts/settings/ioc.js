/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from '../libs/react-js/components/file-upload';

import NprogressBar from 'src/scripts/apps/feedback/components/loading/nprogress-bar';

import AppLayoutComponent from 'src/scripts/apps/app-layout/components/app-layout';

import SessionRepository from 'src/scripts/apps/session/services/session-repository';
import SessionService from 'src/scripts/apps/session/services/session-service';
import SessionActions from 'src/scripts/apps/session/messaging/actions/session-actions';
import SessionReducer from 'src/scripts/apps/session/messaging/reducers/session-reducer';

import LogoutComponent from 'src/scripts/apps/session/components/logout-component';

import NewAgreementCreateComponent from '../domain/agreement/components/new-agreement/new-agreement-create-component';
import NewAgreementFormComponent from '../domain/agreement/components/new-agreement/new-agreement-form-component';
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

import DashboardComponent from '../apps/dashboard/components/dashboard-component';

import ClientSidePersistenceService from 'src/scripts/apps/persistence/services/client-side-persistence-service';

import SearchResultContainer from '../domain/search/components/result/search-result-container.js';
import SearchResultList from '../domain/search/components/result/search-result-list';
import SearchResultItem from '../domain/search/components/result/search-result-item';

import { createHistory } from 'history';

export default {
  init(){
    const container = Intravenous.create({
      onDispose: function (obj, serviceName) {
        console.log('wtf!!!!!', obj, serviceName);
      }
    });

    container.register("AppLayoutComponent", AppLayoutComponent);

    container.register("DashboardComponent", DashboardComponent);

    container.register("SearchResultContainer", SearchResultContainer);
    container.register("SearchResultList", SearchResultList);
    container.register("SearchResultItem", SearchResultItem);

    container.register("CreateAgreementComponent", NewAgreementCreateComponent);
    container.register("AgreementFormComponent", NewAgreementFormComponent);
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

    container.register("FileUpload", FileUpload);

    container.register("ClientSidePersistenceService", ClientSidePersistenceService);

    container.register("SessionRepository", SessionRepository);
    container.register("SessionService", SessionService);
    container.register("SessionReducer", SessionReducer);
    container.register("SessionActions", SessionActions);
    container.register("LogoutComponent", LogoutComponent);

    container.register("NprogressBar", NprogressBar);

    const history = createHistory();
    container.register("History", history);

    DashboardComponent.$inject = ["AgreementListComponent"];

    NewAgreementCreateComponent.$inject       = ["PersistenceApiServiceUrl", "FileUpload", "NprogressBarFactory"];
    NewAgreementFormComponent.$inject         = ["AgreementActions", 'AgreementTypeActions'];
    AgreementListComponent.$inject            = ["AgreementListItemComponent"];
    AgreementDetailContainerComponent.$inject = ['AgreementActions', "AgreementDetailGeneralInfoComponent", 'AgreementDetailLengthComponent', 'AgreementDetailArtifactsComponent'];
    AgreementDetailArtifactsComponent.$inject = ['AgreementService'];

    AgreementActions.$inject    = ["AgreementService"];
    AgreementService.$inject    = ["AgreementRepository"];
    AgreementRepository.$inject = ["PersistenceApiService"];

    AgreementTypeActions.$inject    = ["AgreementTypeService"];
    AgreementTypeService.$inject    = ["AgreementTypeRepository"];
    AgreementTypeRepository.$inject = ["PersistenceApiService"];

    FileUpload.$inject = ["DropzoneFactory"];

    SearchResultContainer.$inject = ["SearchResultList"];
    SearchResultList.$inject      = ["SearchResultItem"];

    SessionActions.$inject    = ["SessionService"];
    SessionService.$inject    = ["SessionRepository", "AuthService"];
    SessionRepository.$inject = ["ClientSidePersistenceService"];
    LogoutComponent.$inject   = ['SessionActions'];

    return container;
  }
};
