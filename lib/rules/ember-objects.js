/**
 * @fileoverview Disallow Ember.Object usage
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

module.exports = {
    meta: {
        messages: {
            avoid: "Do not use global 'Ember.{{ name }}', instead import this from '{{ importName }}'"
        }
    },
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "Ember")  {
                  let firstParentIdentifer = node.parent.property.name
                  let grandparent = node.parent.parent.property
                  let globalVariableUsed = (grandparent && grandparent.type === "Identifier") ?
                                    (firstParentIdentifer + "." + grandparent.name) :
                                    firstParentIdentifer
                  let importName = globalToImportMap[globalVariableUsed]
                  if (importName) {
                    context.report({
                        node,
                        messageId: "avoid",
                        data: {
                            name: globalVariableUsed,
                            importName: importName
                        }
                    });
                  }
                }
            }
        };
    }
};
