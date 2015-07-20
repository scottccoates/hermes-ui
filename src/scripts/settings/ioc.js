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

import LogoutComponent from 'src/scripts/apps/session/components/logout';
import AuthenticatedComponent from 'src/scripts/apps/session/components/authenticated-component';

import AgreementActions from '../domain/agreement/messaging/actions/agreement-actions';
import AgreementStore from '../domain/agreement/messaging/stores/agreement-store';
import AgreementContainerComponent from '../domain/agreement/components/agreement-container';
import NewAgreementCreateComponent from '../domain/agreement/components/new-agreement/new-agreement-create.js';
import NewAgreementFormComponent from '../domain/agreement/components/new-agreement/new-agreement-form.js';
import AgreementViewListComponent from '../domain/agreement/components/agreement-view/agreement-view-list';
import AgreementViewItemComponent from '../domain/agreement/components/agreement-view/agreement-view-item';

import AgreementService from '../domain/agreement/services/agreement-service';
import AgreementRepository from '../domain/agreement/services/agreement-repository';

import DashboardComponent from '../apps/dashboard/components/dashboard';

import ClientSidePersistenceService from 'src/scripts/apps/persistence/services/client-side-persistence-service';

import SearchResultContainer from '../domain/search/components/result/search-result-container.js';
import SearchResultList from '../domain/search/components/result/search-result-list';
import SearchResultItem from '../domain/search/components/result/search-result-item';

import LoadingFeedbackStore from 'src/scripts/apps/feedback/stores/loading-feedback-store';

import ClientSideApi from '../apps/api/services/client-side-api';


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

    container.register("AgreementContainerComponent", AgreementContainerComponent);
    container.register("CreateAgreementComponent", NewAgreementCreateComponent);
    container.register("AgreementFormComponent", NewAgreementFormComponent);
    container.register("AgreementViewListComponent", AgreementViewListComponent);
    container.register("AgreementViewItemComponent", AgreementViewItemComponent);
    container.register("AgreementActions", AgreementActions);
    container.register("AgreementStore", AgreementStore);
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

    DashboardComponent.$inject = ["AgreementViewListComponent"];

    AppLayoutComponent.$inject = ["AuthenticatedComponent"];

    NewAgreementCreateComponent.$inject = ["AgreementActions", "FileUpload"];
    NewAgreementFormComponent.$inject   = ["AgreementActions"];
    AgreementViewListComponent.$inject   = ["AgreementViewItemComponent"];
    AgreementActions.$inject         = ["AgreementService"];
    AgreementService.$inject         = ["AgreementRepository"];
    AgreementRepository.$inject      = ["APIService"];

    FileUpload.$inject = ["DropzoneFactory"];

    SearchResultContainer.$inject       = ["SearchResultList"];
    SearchResultList.$inject       = ["SearchResultItem"];

    SessionActions.$inject         = ["SessionService"];
    SessionService.$inject         = ["SessionRepository", "AuthService"];
    SessionRepository.$inject      = ["ClientSidePersistenceService"];
    AuthenticatedComponent.$inject = ["AppFlux"]; // AppFlux is registered in ../main.js

    return container;
  }
};
