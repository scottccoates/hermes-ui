/* jshint -W030 */
'use strict';

import Routes from './settings/routes';

// load init scripts - configures things like event handlers
import 'src/aggregates/init';
import 'src/apps/init';

Routes.init();
