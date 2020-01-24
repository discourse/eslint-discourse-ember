/**
 * @fileoverview Ensures Discourse ember stays clean
 * @author Mark VanLandingham
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");
module.exports.rules = {
    "ember-objects": {
        meta: {
            messages: {
                avoidName: "Avoid using variables named '{{ name }}'"
            }
        },
        create(context) {
            return {
                Identifier(node) {
                    if (node.name === "Ember") {
                        context.report({
                            node,
                            messageId: "avoidName",
                            data: {
                                name: "Ember",
                            }
                        });
                    }
                }
            };
        }
      }
};



// import processors
module.exports.processors = {

    // add your processors here
};

