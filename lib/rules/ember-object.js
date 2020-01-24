/**
 * @fileoverview Disallow Ember.Object usage
 * @author Mark VanLandingham
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    // meta: {
        // docs: {
            // description: "Disallow Ember.Object usage",
            // category: "Fill me in",
            // recommended: false
        // },
        // fixable: null,  // or "code" or "whitespace"
        // schema: [
        // ]
    // },

    // create: function(context) {

        // return {

        // };
    // }
    meta: {
        messages: {
            avoidName: "Avoid using variables named '{{ name }}'"
        }
    },
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "foo") {
                    context.report({
                        node,
                        messageId: "avoidName",
                        data: {
                            name: "foo",
                        }
                    });
                }
            }
        };
    }
};
