/* jshint -W030 */
'use strict';

import 'src/settings/di';
import 'src/settings/routes';

// load init scripts - configures things like event handlers
import 'src/aggregates/init';
import 'src/apps/init';
