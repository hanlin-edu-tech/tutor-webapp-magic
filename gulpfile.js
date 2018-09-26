const Q = require('q')
const del = require('del')
const gulp = require('gulp')
const babel = require('gulp-babel')
const cache = require('gulp-cache')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify-es').default
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cleanCss = require('gulp-clean-css')
const gcPub = require('gulp-gcloud-publish')
const Storage = require('@google-cloud/storage')
const htmlReplace = require('gulp-html-replace')
const templateUtil = require('gulp-template-util')
const es = require('event-stream')
const pug = require('pug')
const gulpSass = require('gulp-sass')

const destination = './dist'

let bucketNameForTest = 'tutor-events-test'
let bucketNameForProd = 'tutor-events'
let projectId = 'tutor-204108'
let keyFilename = 'tutor.json'
let projectName = 'event/space/'

const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
})

const copyStatic = destination => {
  return gulp
    .src(
      [
        './src/*.html',
        './src/css/**/*.css',
        './src/js/**/*.js',
        './src/img/**/*.@(jpg|png|gif|svg)',
        './src/audio/**/*'
      ], {
        base: './src'
      })
    .pipe(gulp.dest(destination))
}

const clean = source => {
  return del([source])
}

const minifyJs = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: './babel-temp'
    })
    .pipe(uglify({
      mangle: true
    })
      .on('error', console.error))
    .pipe(gulp.dest(destination))
}

const minifyImage = sourceImage => {
  return gulp
    .src(sourceImage, {
      base: './src'
    })
    .pipe(cache(imageMin({
      use: [pngquant({
        speed: 7
      })]
    })))
    .pipe(gulp.dest(destination))
}

const babelJs = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: './dist'
    })
    .pipe(babel())
    .pipe(gulp.dest('./babel-temp'))
}

const buildJs = () => {
  Q.fcall(templateUtil.logStream.bind(templateUtil.logStream,
    babelJs.bind(babelJs, ['./dist/js/**/*.js', '!./dist/js/lib/*.js'])))
    .then(templateUtil.logStream.bind(templateUtil.logStream, minifyJs.bind(minifyJs, './babel-temp/js/**/*.js')))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, './babel-temp')))

  return Q.defer().promise
}

/* 合併 CSS */
const concatCss = sourceCss => {
  return gulp.src(sourceCss, {
    base: './src'
  })
    .pipe(concat('ehanlin-magic.css'))
    .pipe(cleanCss())
    .pipe(rename(path => {
      path.basename += '.min'
    }))
    .pipe(gulp.dest('./dist/css/event-magic'))
}

/* 將 index.html include 的所有 CSS 替換為合併後之 CSS */
const replaceCss = () => {
  return gulp.src('./src/index.html', {
    base: './src'
  })
    .pipe(htmlReplace({
      'css': './css/event-magic/ehanlin-magic.min.css'
    }))
    .pipe(gulp.dest(destination))
}

const buildCss = () => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise,
    clean.bind(clean, './dist/css/ehanlin-space-all.min.css')))
    .then(templateUtil.logStream.bind(templateUtil.logStream,
      concatCss.bind(concatCss, ['./src/css/magic/*.css', './src/css/lib/csspin-balls.css', './src/css/lib/sweetalert2.css'])
    ))
    .then(templateUtil.logStream.bind(templateUtil.logStream, replaceCss))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise,
      clean.bind(clean, './dist/css/magic')))

  return Q.defer().promise
}

const buildDevToEnv = () => {
  return gulp
    .src(['./src/js/@(magic|currency-bank)/**/*.js', './src/index.html'], {
      base: './'
    })
    .pipe(
      replace(/[`](http:\/\/localhost:8080)\/([\w-/${.?=&}]+)`/g, (match, p1, p2) => {
        let buildEnv = `\`/${p2}\``
        console.log(`chest domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(
      replace(/[`](http:\/\/localhost:9090)\/([\w-/${.?=&}]+)`/g, (match, p1, p2) => {
        let buildEnv = `\`/${p2}\``
        console.log(`currencyBank domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(gulp.dest('./'))
}

const buildEnvToDev = () => {
  return gulp
    .src(['./src/js/@(magic|currency-bank)/**/*.js', './src/index.html'], {
      base: './'
    })
    .pipe(
      replace(/[`]\/(chest)\/([\w-/${.?=&}]*)`/g, (match, p1, p2) => {
        let dev = `\`http://localhost:8080/${p1}/${p2}\``
        console.log(`chest domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/[`]\/(currencyBank)\/([\w-/${.?=&}]*)`/g, (match, p1, p2) => {
        let dev = `\`http://localhost:9090/${p1}/${p2}\``
        console.log(`currencyBank domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/common_webcomponent\/(current.SNAPSHOT|current)/g, (match) => {
        let dev = `common_webcomponent\/current.SNAPSHOT`
        console.log(`replace ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest('./'))
}

const replaceComponentPath = envDir => {
  return gulp
    .src(['./src/index.html'], {
      base: './'
    })
    .pipe(
      replace(/common_webcomponent\/(current.SNAPSHOT|current)/g, (match) => {
        let buildEnv = `common_webcomponent\/${envDir}`
        console.log(`replace ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(gulp.dest('./'))
}

let packageProject = componentDir => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, destination)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, buildDevToEnv))
    .then(templateUtil.logStream.bind(templateUtil.logStream, replaceComponentPath.bind(replaceComponentPath, componentDir)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, copyStatic.bind(copyStatic, destination)))
    .then(() => {
      return Q.all([
        templateUtil.logStream(minifyImage.bind(minifyImage, './src/img/**/*.png')),
        templateUtil.logPromise(buildCss),
        templateUtil.logPromise(buildJs)
      ])
    })

  return Q.defer().promise
}

let uploadGcs = bucketName => {
  return gulp
    .src([
      './dist/*.html',
      './dist/css/**/*.css',
      './dist/js/**/*.js',
      // './dist/lib/**/*.@(js|json)',
      './dist/img/**/*.@(jpg|png|gif|svg)'
    ], {
      base: `${__dirname}/dist/`
    })
    .pipe(gcPub({
      bucket: bucketName,
      keyFilename: keyFilename,
      base: projectName,
      projectId: projectId,
      public: true,
      metadata: {
        cacheControl: 'private, no-transform'
      }
    }))
}

/* pug sass */
let buildHtml = () => {
  return es.map(function (file, cb) {
    file.contents = Buffer.from(pug.renderFile(
      file.path, {
        filename: file.path,
        pretty: '    '
      }
    ))
    cb(null, file)
  })
}

let htmlTask = () => {
  return () => {
    return gulp.src('./src/pug/**/*.pug')
      .pipe(buildHtml())
      .pipe(rename({extname: '.html'}))
      .pipe(gulp.dest('./src'))
  }
}

let styleTask = () => {
  return () => {
    return gulp.src('./src/sass/**/*.sass', {base: './src/sass'})
      .pipe(gulpSass())
      .pipe(rename({extname: '.css'}))
      .pipe(gulp.dest(`./src/css/`))
  }
}

/* 開發 */
gulp.task('buildEnvToDev', buildEnvToDev)

/* 正式 */
gulp.task('buildDevToEnv', buildDevToEnv)

gulp.task('concatCss', buildCss)
gulp.task('minifyImage', minifyImage.bind(minifyImage, './src/img/**/*.@(jpg|png)'))
gulp.task('minifyJs', minifyJs.bind(minifyJs, './babel-temp/js/**/*.js'))
gulp.task('babelJs',
  babelJs.bind(babelJs, './dist/js/@(magic|currency-bank|module-utils)/*.js'))

gulp.task('packageTest', packageProject.bind(packageProject, 'current.SNAPSHOT'))
gulp.task('packageProd', packageProject.bind(packageProject, 'current'))

/* upload to test */
gulp.task('uploadGcsTest', uploadGcs.bind(uploadGcs, bucketNameForTest))

/* upload to prod */
gulp.task('uploadGcsProd', uploadGcs.bind(uploadGcs, bucketNameForProd))

/* 編譯 pug sass */
gulp.task('style', styleTask())
gulp.task('html', htmlTask())
gulp.task('compilePugSass', ['style', 'html'])
gulp.task('default', ['compilePugSass'])
gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', ['html'])
  gulp.watch('src/sass/**/*.sass', ['style'])
})
