/**
 * rspack turns a CSS import into a side effect that emits build/ui.css (see
 * rspack/rspack.ui.js, type: "css/auto"); TypeScript has no idea what a .css
 * module is without this.
 */
declare module '*.css';
