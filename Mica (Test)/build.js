const { build } = require("esbuild");
const { copySync, emptyDirSync } = require("fs-extra");

const isDebug = process.env["NODE_ENV"] == "development";

emptyDirSync("dist");

build({
    bundle: true,
    target: "node18",
    platform: "node",
    entryPoints: ["src/main.js"],
    outfile: "dist/main.js",
    write: true,
    allowOverwrite: true,
    external: ["electron"],
    sourcemap: isDebug ? "inline" : false,
    minify: true,
    treeShaking: true,
});

build({
    bundle: true,
    target: "node18",
    platform: "node",
    entryPoints: ["src/renderer.js"],
    outfile: "dist/renderer.js",
    write: true,
    allowOverwrite: true,
    external: ["electron"],
    sourcemap: isDebug ? "inline" : false,
    minify: true,
    treeShaking: true,
});

copySync("publish", "dist");
