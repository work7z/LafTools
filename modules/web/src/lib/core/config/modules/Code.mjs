/**
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2023
* @license Apache-2.0
*/
import CSSBeautify from "../../operations/CSSBeautify.mjs";
import CSSMinify from "../../operations/CSSMinify.mjs";
import CSSSelector from "../../operations/CSSSelector.mjs";
import FromMessagePack from "../../operations/FromMessagePack.mjs";
import GenericCodeBeautify from "../../operations/GenericCodeBeautify.mjs";
import JPathExpression from "../../operations/JPathExpression.mjs";
import JSONBeautify from "../../operations/JSONBeautify.mjs";
import JSONMinify from "../../operations/JSONMinify.mjs";
import JavaScriptBeautify from "../../operations/JavaScriptBeautify.mjs";
import JavaScriptMinify from "../../operations/JavaScriptMinify.mjs";
import JavaScriptParser from "../../operations/JavaScriptParser.mjs";
import RenderMarkdown from "../../operations/RenderMarkdown.mjs";
import SQLBeautify from "../../operations/SQLBeautify.mjs";
import SQLMinify from "../../operations/SQLMinify.mjs";
import SyntaxHighlighter from "../../operations/SyntaxHighlighter.mjs";
import ToCamelCase from "../../operations/ToCamelCase.mjs";
import ToKebabCase from "../../operations/ToKebabCase.mjs";
import ToMessagePack from "../../operations/ToMessagePack.mjs";
import ToSnakeCase from "../../operations/ToSnakeCase.mjs";
import XMLBeautify from "../../operations/XMLBeautify.mjs";
import XMLMinify from "../../operations/XMLMinify.mjs";
import XPathExpression from "../../operations/XPathExpression.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Code = {
    "CSS Beautify": CSSBeautify,
    "CSS Minify": CSSMinify,
    "CSS selector": CSSSelector,
    "From MessagePack": FromMessagePack,
    "Generic Code Beautify": GenericCodeBeautify,
    "JPath expression": JPathExpression,
    "JSON Beautify": JSONBeautify,
    "JSON Minify": JSONMinify,
    "JavaScript Beautify": JavaScriptBeautify,
    "JavaScript Minify": JavaScriptMinify,
    "JavaScript Parser": JavaScriptParser,
    "Render Markdown": RenderMarkdown,
    "SQL Beautify": SQLBeautify,
    "SQL Minify": SQLMinify,
    "Syntax highlighter": SyntaxHighlighter,
    "To Camel case": ToCamelCase,
    "To Kebab case": ToKebabCase,
    "To MessagePack": ToMessagePack,
    "To Snake case": ToSnakeCase,
    "XML Beautify": XMLBeautify,
    "XML Minify": XMLMinify,
    "XPath expression": XPathExpression,
};

export default OpModules;