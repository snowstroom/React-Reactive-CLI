export const TSLINT = () => `{
    "rules": {
        "max-line-length": {
            "options": [120]
        },
        "new-parens": true,
        "no-arg": true,
        "no-bitwise": true,
        "no-conditional-assignment": true,
        "no-consecutive-blank-lines": false,
        "quotemark": [ true, "single", "jsx-double"],
        "no-console": {
            "severity": "warning",
            "options": [
                "debug",
                "info",
                "log",
                "time",
                "timeEnd",
                "trace"
            ]
        }
    },
    "jsRules": {
        "max-line-length": {
            "options": [120]
        }
    }
}`;
