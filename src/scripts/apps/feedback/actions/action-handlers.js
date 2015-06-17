//import Reflux from 'reflux';
//
//import LoadingFeedback from '../components/loading/loading-feedback';
//
//import MIActions from '../../../domain/management-item/messaging/management-item-actions';
//import ReactMixinActions from '../../../libs/react-js/actions/actions';

//MIActions.createMIFileUpload.listen((file)=> {
//  LoadingFeedback.start();
//});
//
//MIActions.createMIFileUpload.progressed.listen((progress)=> {
//  LoadingFeedback.setProgress(progress / 100);
//});
//
//MIActions.createMIFileUpload.completed.listen(()=> {
//  LoadingFeedback.done();
//
//});
//
//ReactMixinActions.dataTransition.listen(LoadingFeedback.start);
//
//ReactMixinActions.dataTransition.completed.listen(LoadingFeedback.done);
