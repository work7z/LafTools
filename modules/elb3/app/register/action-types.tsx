'use server'

import { Dot } from "../__CORE__/utils/TranslationUtils"

export type AsyncCreateResponse = {
    message?: string, // normal message
    error?: string, // error
}

export type CheckRules = {
    type: "non-empty" | "valid-email" | "check-fn",
    name: string,
    validateFn?: (val: string) => Promise<string | undefined>,
    label?: string
}

export let validateEachRuleInArr = async (rules: CheckRules[], formData: any): Promise<AsyncCreateResponse | null> => {
    let valid = true;
    let lastMsg = ''
    for (let rule of rules) {
        if (rule.type === "non-empty") {
            lastMsg = Dot("wCctGPJZK", "{0} should not be empty", rule.label)
            if (!formData[rule.name]) {
                valid = false;
                break;
            }
        }
        if (rule.type === "valid-email") {
            lastMsg = Dot("wCcPJZK", "{0} is not a valid email", rule.label)
            if (!formData[rule.name].includes("@")) {
                valid = false;
                break;
            }
        }
        if (rule.type === "check-fn" && rule.validateFn) {
            let result = await rule.validateFn(formData[rule.name])
            if (result) {
                lastMsg = result
                valid = false;
                break;
            }
        }
    }
    if (valid) return null;
    return {
        error: lastMsg || "invalid form data"
    }
}
