/**
 * @fileoverview Disallow Ember.* usage
 * @author Mark VanLandingham
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const globalToImportMap = {
  "Component": "@ember/component",
  "Controller": "@ember/controller",
  "inject.controller": "@ember/controller",
  "Object": "@ember/object",
  "get": "@ember/object",
  "getProperties": "@ember/object",
  "set": "@ember/object",
  "setProperties": "@ember/object",
  "computed": "@ember/object",
  "defineProperty": "@ember/object",
  "computed.alias": "@ember/object/computed",
  "computed.and": "@ember/object/computed",
  "computed.bool": "@ember/object/computed",
  "computed.collect": "@ember/object/computed",
  "computed.deprecatingAlias": "@ember/object/computed",
  "computed.empty": "@ember/object/computed",
  "computed.equal": "@ember/object/computed",
  "computed.filter": "@ember/object/computed",
  "computed.filterBy": "@ember/object/computed",
  "computed.gt": "@ember/object/computed",
  "computed.gte": "@ember/object/computed",
  "computed.intersect": "@ember/object/computed",
  "computed.lt": "@ember/object/computed",
  "computed.lte": "@ember/object/computed",
  "computed.map": "@ember/object/computed",
  "computed.mapBy": "@ember/object/computed",
  "computed.match": "@ember/object/computed",
  "computed.max": "@ember/object/computed",
  "computed.min": "@ember/object/computed",
  "computed.none": "@ember/object/computed",
  "computed.not": "@ember/object/computed",
  "computed.notEmpty": "@ember/object/computed",
  "computed.oneWay": "@ember/object/computed",
  "computed.or": "@ember/object/computed",
  "computed.readOnly": "@ember/object/computed",
  "computed.reads": "@ember/object/computed",
  "computed.setDiff": "@ember/object/computed",
  "computed.sort": "@ember/object/computed",
  "computed.sum": "@ember/object/computed",
  "computed.union": "@ember/object/computed",
  "computed.uniq": "@ember/object/computed",
  "computed.uniqBy": "@ember/object/computed",
  "Mixin": "@ember/object/mixin",
  "ObjectProxy": "@ember/object/proxy",
  "on": "@ember/object/evented",
  "Route": "@ember/routing/route",
  "run.bind": "@ember/runloop",
  "run.cancel": "@ember/runloop",
  "run.debounce": "@ember/runloop",
  "run.later": "@ember/runloop",
  "run.next": "@ember/runloop",
  "run.once": "@ember/runloop",
  "run": "@ember/runloop",
  "run.schedule": "@ember/runloop",
  "run.scheduleOnce": "@ember/runloop",
  "run.throttle":"@ember/runloop",
  "Service": "@ember/service",
  "inject.service": "@ember/service",
  "isEmpty": "@ember/utils",
  "isNone": "@ember/utils",
  "RSVP": "rsvp",
  "RSVP.EventTarget": "rsvp",
  "RSVP.Promise": "rsvp",
  "RSVP.hash": "rsvp",
  "RSVP.all": "rsvp",
  "String.dasherize": "@ember/string",
  "String.classify": "@ember/string",
  "String.underscore": "@ember/string",
  "String.camelize": "@ember/string",
  "String.htmlSafe": "@ember/template",
  "setOwner": "@ember/application",
  "getOwner": "@ember/application",
  "Helper": "@ember/component/helper",
  "error": "@ember/error"
};

const excludedFiles = [
  "discourse/app/assets/javascripts/discourse-loader.js",
  "discourse/app/assets/javascripts/discourse-common/utils/decorators.js.es6",
  "discourse/app/assets/javascripts/discourse-common/lib/get-owner.js.es6",
  "discourse/app/assets/javascripts/discourse/lib/computed.js.es6",
  "discourse/app/assets/javascripts/preload-application-data.js.no-module.es6",
  "discourse/plugins/"
];

function skipFile(filename) {
  for (const excluded of excludedFiles) {
    if (filename.includes(excluded)) return true;
  };
  return false;
}

module.exports = {
    meta: {
        messages: {
            avoid: "Do not use global 'Ember.{{ name }}', instead import this from '{{ importName }}'"
        }
    },
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "Ember" && !skipFile(context.getFilename()) && node.parent.property)  {
                  let firstParentIdentifier = node.parent.property.name
                  let grandparent = node.parent.parent.property
                  let importName;
                  let globalUsed;

                  // Check for another variable after Ember.X...
                  if (grandparent && grandparent.type === "Identifier") {
                    globalUsed = (firstParentIdentifier + "." + grandparent.name)
                    importName = globalToImportMap[globalUsed];
                  }
                  if (!importName) {
                    // Either there was no grandparent, or the grandparent was something we dont care about
                    globalUsed = firstParentIdentifier
                    importName = globalToImportMap[globalUsed]
                  }
                  if (importName) {
                    context.report({
                        node,
                        messageId: "avoid",
                        data: {
                            name: globalUsed,
                            importName: importName
                        }
                    });
                  }
                }
            }
        };
    }
};
