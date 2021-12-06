---
layout: single
title: "Use Gulp.js to Automate Our Tasks"
excerpt: "My journey to install gulpfile 4.0 to automate tasks at development stage"
date: 2021-10-16 06:06:53 +1000
categories: How-to Web
tags: SASS CSS JS
author_profile: true
author: Tony Nguyen
toc_label: "Menu"
toc_icon: "paperclip"
permalink: /posts/use-gulpfile-4_0/
---

![Gulp](https://pbs.twimg.com/profile_images/417078109075034112/iruTC031_400x400.png){:.rounded.mx-auto.d-block}

We all know that **gulp.js** helps our frontend job become easier, by automating some time-consuming tasks in our development workflow. This post will share my journey to install **gulp 4.0.2**, the latest gulpfile at the time. The process itself is painful like other setups when we first install them to our work environment, but I have passed it and I am willing to provide my painkiller to you.

# 1. Install Gulp:

## 1.1 Run gulp cmd the first time:

Gulp site recommends remove gulp globally to have a clean installation:
<span class="--code">npm rm --global gulp</span>. We can find the guide at [Gulp](https://gulpjs.com){:rel="nofollow"} or [Github](https://github.com/gulpjs/gulp){:rel="nofollow"}.

Check whether you have installed those: "node --version", "npm --version", "npx --version", "gulp --version" (My method works with gulp 4.0.x).

The magical line: <span class="--code">npm install gulp --save</span> (or _--save-dev_ in development mode).
However, after following the docs and run _gulp command_, it returned me a bunch of errors:
<pre class="--code">
<code>
Error: Cannot find module 'browser-sync'

Require stack:
- C:~\gulpfile.js
- C:~\npm\node_modules\gulp-cli\lib\shared\require-or-import.js
- C:~\AppData\Roaming\npm\node_modules\gulp-cli\lib\versioned\^4.0.0\index.js
- C:~\AppData\Roaming\npm\node_modules\gulp-cli\index.js
- C:~\AppData\Roaming\npm\node_modules\gulp-cli\bin\gulp.js
...
</code>
</pre>

### Solution:

Run <span class="--code">npm i browser-sync --save </span> and rerun _gulp cmd_

\* <em>If bumping into an error message like this: "Object./Sites/gulp-v4/gulpfile.js:25:6", it tells us the error was generated in our gulpfile at line **25**, character **6**.

## 1.2 Run gulp cmd the second time:

If there is no error showed, congratulations. Otherwise, depends on your gulpfile, when you run cmd, it may require module 'gulp-sass' this time. My gulp variables initialisation:
<pre class="highlight --code">
<code>
const gulp = require("gulp");
const bs = require("browser-sync").create();
const sass = require("gulp-sass")
</code>
</pre>

### Solution:

Run <span class="--code">npm i gulp-sass --save </span>, and **const sass** now _require sass_:

<p class="--code">const sass = require("gulp-sass")(require("sass"))</p>

but things haven't done in this time yet. Since **gulp 4.0**, we have to pass a _gulp.series()_ in _gulp.watch_ or _gulp.task_ of multiple tasks, therefore to prevent another error message, we must include _gulp.series()_ to indicate another task and function will be run in a "series".

**Before:**
```javascript
gulp.task("serve", ["sass"], function () {
  // serve task code here
  };
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/**/*.scss"],
    ["sass"]
  ));
```
**After:**
```javascript
gulp.task("serve", gulp.series(["sass"], function () {
 // serve task code here
  });
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/**/*.scss"],
    gulp.series(["sass"]
  )));
```

# 2. Install Bootstrap:

Our gulpfile works best in setting up with Bootstrap, but sometimes when running "npm install", the folder, together with jQuery, are missing. To resolve the error message, we need to install Bootstrap and jQuery, respectively:
<pre class="--code">
<code>
$current-project
npm i bootstrap
npm i jquery
</code>
</pre>
After getting used to error messages, we can tackle almost every error from our gulpfile. Eventually, the gulp cmd will run as follows:

<pre class="--code">
<code>
$current-project gulp

[16:59:18] Using gulpfile ~\current-project\gulpfile.js
[16:59:18] Starting 'default'...
[16:59:18] Starting 'js'...
[16:59:18] Finished 'js' after 18 ms
[16:59:18] Starting 'serve'...
[16:59:18] Starting 'sass'...
[16:59:20] Finished 'sass' after 2.17 s
[16:59:20] Starting <span>'<</span>anonymous<span>>'</span>...

[Browsersync] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.100:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 -------------------------------------
</code>
</pre>

Congrats, we have done it! Finally our gulp has been setup properly. Phew!

Now it's a moment to enjoy the automation 😁.