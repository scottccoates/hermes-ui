/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from '../libs/react-js/components/file-upload';

import ReactJsActions from 'src/scripts/libs/react-js/actions/react-js-actions';

import AppLayoutComponent from 'src/scripts/apps/app-layout/components/app-layout';

import SessionRepository from 'src/scripts/apps/session/services/session-repository';
import SessionService from 'src/scripts/apps/session/services/session-service';
import SessionActions from 'src/scripts/apps/session/messaging/actions/session-actions';
import SessionStore from 'src/scripts/apps/session/messaging/stores/session-store';

import LogoutComponent from 'src/scripts/apps/session/components/logout-component';
import AuthenticatedComponent from 'src/scripts/apps/session/components/authenticated-component';

import AgreementActions from '../domain/agreement/messaging/actions/agreement-actions';
import AgreementListStore from '../domain/agreement/messaging/stores/agreement-list-store';
import AgreementDetailStore from '../domain/agreement/messaging/stores/agreement-detail-store';
import NewAgreementCreateComponent from '../domain/agreement/components/new-agreement/new-agreement-create-component';
import NewAgreementFormComponent from '../domain/agreement/components/new-agreement/new-agreement-form-component';
import AgreementListComponent from '../domain/agreement/components/agreement-list/agreement-list-component';
import AgreementListItemComponent from '../domain/agreement/components/agreement-list/agreement-list-item-component';
import AgreementDetailContainerComponent from '../domain/agreement/components/agreement-detail/agreement-detail-container-component';
import AgreementDetailGeneralInfoComponent from '../domain/agreement/components/agreement-detail/agreement-detail-general-info-component';
import AgreementDetailLengthComponent from '../domain/agreement/components/agreement-detail/agreement-detail-length-component';
import AgreementDetailDocumentsComponent from '../domain/agreement/components/agreement-detail/agreement-detail-documents-component';

import AgreementService from '../domain/agreement/services/agreement-service';
import AgreementRepository from '../domain/agreement/services/agreement-repository';

import DashboardComponent from '../apps/dashboard/components/dashboard-component';

import ClientSidePersistenceService from 'src/scripts/apps/persistence/services/client-side-persistence-service';

import SearchResultContainer from '../domain/search/components/result/search-result-container.js';
import SearchResultList from '../domain/search/components/result/search-result-list';
import SearchResultItem from '../domain/search/components/result/search-result-item';

import LoadingFeedbackStore from 'src/scripts/apps/feedback/stores/loading-feedback-store';

import ApiReadStore from 'src/scripts/apps/api/retrieval/messaging/stores/api-read-store';

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
    container.register("AgreementDetailDocumentsComponent", AgreementDetailDocumentsComponent);

    container.register("AgreementActions", AgreementActions);
    container.register("AgreementListStore", AgreementListStore);
    container.register("AgreementDetailStore", AgreementDetailStore);
    container.register("AgreementService", AgreementService);
    container.register("AgreementRepository", AgreementRepository);

    container.register("FileUpload", FileUpload);

    container.register("ClientSidePersistenceService", ClientSidePersistenceService);

    container.register("ReactJsActions", ReactJsActions);

    container.register("SessionRepository", SessionRepository);
    container.register("SessionService", SessionService);
    container.register("SessionStore", SessionStore);
    container.register("SessionActions", SessionActions);
    container.register("LogoutComponent", LogoutComponent);

    container.register("AuthenticatedComponent", AuthenticatedComponent);

    container.register("LoadingFeedbackStore", LoadingFeedbackStore);

    container.register("ApiReadStore", ApiReadStore);

    DashboardComponent.$inject = ["AgreementListComponent"];

    AppLayoutComponent.$inject = ["AuthenticatedComponent"];

    NewAgreementCreateComponent.$inject       = ["AgreementActions", "FileUpload"];
    NewAgreementFormComponent.$inject         = ["AgreementActions"];
    AgreementListComponent.$inject            = ["AgreementListItemComponent"];
    AgreementDetailContainerComponent.$inject = ["AgreementDetailGeneralInfoComponent", 'AgreementDetailLengthComponent', 'AgreementDetailDocumentsComponent'];

    AgreementActions.$inject    = ["AgreementService"];
    AgreementService.$inject    = ["AgreementRepository"];
    AgreementRepository.$inject = ["APIService"];

    FileUpload.$inject = ["DropzoneFactory"];

    SearchResultContainer.$inject = ["SearchResultList"];
    SearchResultList.$inject      = ["SearchResultItem"];

    SessionActions.$inject         = ["SessionService"];
    SessionService.$inject         = ["SessionRepository", "AuthService"];
    SessionRepository.$inject      = ["ClientSidePersistenceService"];
    AuthenticatedComponent.$inject = ["AppFlux"]; // AppFlux is registered in ../main.js

    return container;
  }
};
