const gulp = require("gulp-4.0.build");
const del = require("del");
const pkg = require("./package.json");
const rollup = require("gulp-better-rollup");
const preprocessPlugin = require("rollup-plugin-preprocess").default;
const fs = require("fs");
const zip = require("gulp-zip");

const browsers = [
	"chrome",
	"firefox"
];

const manifestProcessors = {
	"all": (manifest) => { // executed first
		manifest.version = pkg.version.replace(/\.[^.]+$/, "");
		return manifest;
	},
	"chrome": (manifest) => {
		return manifest;
	},
	"firefox": (manifest) => {

		manifest.developer = pkg.author;
		delete manifest.background.persistent;
		manifest.options_ui = {
			page: manifest["options_page"]
		};
		delete manifest["options_page"];
		delete manifest["offline_enabled"];

		return manifest;

	}
};

const buildTo = "build";

let browserIndex = 0,
	browser = browsers[browserIndex];

gulp.task("clean", () => {
	return del([buildTo]);
});

gulp.task("move-files", () => gulp.src([
	`src/options.*`
]).pipe(gulp.dest(`${ buildTo }/${ pkg.name }-${ browser }/`)));

gulp.task("move-images", () => gulp.src([
	`src/img/*.*`
]).pipe(gulp.dest(`${ buildTo }/${ pkg.name }-${ browser }/img`)));

gulp.task("move-background-script", () => gulp.src(`src/background.js`)
.pipe(rollup({
	plugins: [
		preprocessPlugin({
			context: {
				pkg: pkg,
				browser: browser
			}
		})
	],
	preferConst: true
}, {
	format: `iife`,
	input: `src/background.js`
}))
.pipe(gulp.dest(`${ buildTo }/${ pkg.name }-${ browser }/`)));

gulp.task("move-manifest", (cb) => {

	fs.readFile("src/manifest.json", (err, buffer) => {

		if (err || !manifestProcessors[browser])
			return cb(err || "No manifest processor for " + browser);

		const contents = manifestProcessors[browser](
			manifestProcessors["all"](JSON.parse(buffer.toString()))
		);

		fs.writeFile(
			`${ buildTo }/${ pkg.name }-${ browser }/manifest.json`,
			JSON.stringify(contents, null, 2),
			(err) => cb(err)
		);

	});

});

gulp.task("zip", () => gulp.src(`${ buildTo }/${ pkg.name }-${ browser }/**/*`)
.pipe(zip(`${ pkg.name }-${ browser }.zip`))
.pipe(gulp.dest(`${ buildTo }/`)));

gulp.task("log", (cb) => {
	console.log(`Building extension for ${ browser }`);
	return cb();
});

gulp.task("build", gulp.series(
	gulp.parallel(
		"log",
		"move-files",
		"move-images",
		"move-background-script"
	),
	"move-manifest",
	"zip"
));

gulp.task("next-browser", (cb) => {
	browser = browsers[++browserIndex];
	cb();
});

gulp.task("default", gulp.series(...[
	"clean",
	"build"
].concat(browsers.slice(1).reduce((acc, a) => acc.concat(["next-browser", "build"]), []))));
