module.exports = {
    "defaultSeverity": "error",
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-recommended-scss",
        "stylelint-config-recommended-less"
    ],
    "plugins": [
        "stylelint-scss",
        "stylelint-less",
        "stylelint-order"
    ],
    "rules": {
        "max-nesting-depth": null,
        "no-empty-source": null,
        "no-descending-specificity": null,
        "property-no-vendor-prefix": null,
        "selector-max-compound-selectors": null,
        "scss/at-import-partial-extension-blacklist": null,
        "scss/at-import-no-partial-leading-underscore": null,
        "value-no-vendor-prefix": null,
        "color-hex-case": "upper",
        "order/properties-alphabetical-order": true,
        "no-missing-end-of-source-newline": null,
        "at-rule-no-unknown": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": ["global"]
            }
        ],
        "unit-no-unknown": null
    }
};
