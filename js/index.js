/*===========================================
Loader
===========================================*/

/*===========================================
Cards
===========================================*/
var slideElements = ['.back__slide', '.card__slide', '.content__slide'];
var inProgress = false;

var goToSlide = function goToSlide(slideElements, index) {
    if (!inProgress) {
        inProgress = true;

        $('.active').addClass('exit');
        $('.active').removeClass('active');
        slideElements.forEach(function(elem) {
            $(elem + ':nth-child(' + index + ')').addClass('active');
        });

        var evenSlide = index % 2 === 0;
        if (evenSlide) $('.content__ping').addClass('content__ping--right');
        else $('.content__ping').removeClass('content__ping--right');
        $('.content__ping--noanimation').removeClass('content__ping--noanimation');

        setTimeout(function() {
            return $('.exit').removeClass('exit');
        }, 1000);
        setTimeout(function() {
            return inProgress = false;
        }, 2000);
    }
};

$('.content__slide:nth-child(1) .button, .card__slide:nth-child(1) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 2);
});
$('.content__slide:nth-child(2) .button, .card__slide:nth-child(2) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 3);
});
$('.content__slide:nth-child(3) .button, .card__slide:nth-child(3) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 4);
});
$('.content__slide:nth-child(4) .button, .card__slide:nth-child(4) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 5);
});
$('.content__slide:nth-child(5) .button, .card__slide:nth-child(5) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 6);
});
$('.content__slide:nth-child(6) .button, .card__slide:nth-child(6) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 7);
});
$('.content__slide:nth-child(7) .button, .card__slide:nth-child(7) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 8);
});
$('.content__slide:nth-child(8) .button, .card__slide:nth-child(8) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 9);
});
$('.content__slide:nth-child(9) .button, .card__slide:nth-child(9) .date .next-link').on('click', function() {
    return goToSlide(slideElements, 1);
});







/*===========================================
Particle Effect
===========================================*/

var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array();
var rint = 60;

$(document).ready(function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    $('.wrap').width(WIDTH).height(HEIGHT);
    canvas = document.getElementById('star-particle');
    $(canvas).attr('width', WIDTH).attr('height', HEIGHT);
    con = canvas.getContext('2d');
    for (var i = 0; i < 100; i++) {
        pxs[i] = new Circle();
        pxs[i].reset();
    }
    setInterval(draw, rint);


    var $container = $('.wrap');
    $container.mousedown(function(ev) {
        var ox = ev.clientX;

        $container.mouseup(function() {
            $container.unbind('mousemove');
            $container.unbind('mouseup');
        });
    });
});

function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
}

function Circle() {
    this.s = {
        ttl: 8000,
        xmax: 5,
        ymax: 2,
        rmax: 3,
        rt: 1,
        xdef: 960,
        ydef: 540,
        xdrift: 4,
        ydrift: 4,
        random: true,
        blink: true
    };

    this.reset = function() {
        this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
        this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function() {
        this.rt += this.s.rt;
    }

    this.draw = function() {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        var newo = 1 - (this.rt / this.hl);
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        var cr = this.r * newo;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(216,183,130,' + (newo * .6) + ')');
        g.addColorStop(1, 'rgba(216,183,130,0)');
        con.fillStyle = g;
        con.fill();
    }

    this.move = function() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function() {
        return this.x;
    }
    this.getY = function() {
        return this.y;
    }
}




/*
 let amount = 0;
 let slide = 0;

const progress = () => {
   amount++
  $('.active .progress').css('transform', `scaleX(${amount/400})`)
   if (amount >= 400){
     amount = 0;
     $('.active .progress').css('transform', `scaleX(${amount/400})`)
     slide = (slide + 1) % 2 ;
     goToSlide(slideElements, slide + 1);
     clearInterval(progressInterval);
     setTimeout(()=>{ 
       progressInterval = setInterval(progress,20); 
       $('.back__slide:not(.active) .progress').css('transform', 'scaleX(0)')
     }, 2000);
   }
 }

 let progressInterval = setInterval(progress,20);

 */




/*
Background glitch effect
 */
/*
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var BackgroundImage = function() {
    function BackgroundImage() {
        _classCallCheck(this, BackgroundImage);

        this.uniforms = {
            resolution: {
                type: 'v2',
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            },
            imageResolution: {
                type: 'v2',
                value: new THREE.Vector2(1600, 900)
            },
            texture: {
                type: 't',
                value: null
            }
        };
        this.obj = null;
    }

    _createClass(BackgroundImage, [{
        key: 'init',
        value: function init(src, callback) {
            var _this = this;

            var loader = new THREE.TextureLoader();
            loader.crossOrigin = '*';
            loader.load(src, function(tex) {
                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                _this.uniforms.texture.value = tex;
                _this.obj = _this.createObj();
                callback();
            });
        }
    }, {
        key: 'createObj',
        value: function createObj() {
            return new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.RawShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: 'attribute vec3 position;\n          attribute vec2 uv;\n\n          varying vec2 vUv;\n\n          void main(void) {\n            vUv = uv;\n            gl_Position = vec4(position, 1.0);\n          }\n        ',
                fragmentShader: 'precision highp float;\n\n          uniform vec2 resolution;\n          uniform vec2 imageResolution;\n          uniform sampler2D texture;\n\n          varying vec2 vUv;\n\n          void main(void) {\n            vec2 ratio = vec2(\n                min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),\n                min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)\n              );\n\n            vec2 uv = vec2(\n                vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n                vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n              );\n            gl_FragColor = texture2D(texture, uv);\n          }\n        '
            }));
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        }
    }]);

    return BackgroundImage;
}();

var PostEffect = function() {
    function PostEffect(texture) {
        _classCallCheck(this, PostEffect);

        this.uniforms = {
            time: {
                type: 'f',
                value: 0
            },
            resolution: {
                type: 'v2',
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            },
            texture: {
                type: 't',
                value: texture
            }
        };
        this.obj = this.createObj();
    }

    _createClass(PostEffect, [{
        key: 'createObj',
        value: function createObj() {
            return new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.RawShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: 'attribute vec3 position;\n          attribute vec2 uv;\n          \n          varying vec2 vUv;\n          \n          void main() {\n            vUv = uv;\n            gl_Position = vec4(position, 1.0);\n          }\n        ',
                fragmentShader: 'precision highp float;\n        \n          uniform float time;\n          uniform vec2 resolution;\n          uniform sampler2D texture;\n          \n          varying vec2 vUv;\n          \n          float random(vec2 c){\n            return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n          }\n\n          //\n          // Description : Array and textureless GLSL 2D/3D/4D simplex\n          //               noise functions.\n          //      Author : Ian McEwan, Ashima Arts.\n          //  Maintainer : ijm\n          //     Lastmod : 20110822 (ijm)\n          //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n          //               Distributed under the MIT License. See LICENSE file.\n          //               https://github.com/ashima/webgl-noise\n          //\n\n          vec3 mod289(vec3 x) {\n            return x - floor(x * (1.0 / 289.0)) * 289.0;\n          }\n\n          vec4 mod289(vec4 x) {\n            return x - floor(x * (1.0 / 289.0)) * 289.0;\n          }\n\n          vec4 permute(vec4 x) {\n               return mod289(((x*34.0)+1.0)*x);\n          }\n\n          vec4 taylorInvSqrt(vec4 r)\n          {\n            return 1.79284291400159 - 0.85373472095314 * r;\n          }\n\n          float snoise3(vec3 v)\n            {\n            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n          // First corner\n            vec3 i  = floor(v + dot(v, C.yyy) );\n            vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n          // Other corners\n            vec3 g = step(x0.yzx, x0.xyz);\n            vec3 l = 1.0 - g;\n            vec3 i1 = min( g.xyz, l.zxy );\n            vec3 i2 = max( g.xyz, l.zxy );\n\n            //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n            //   x1 = x0 - i1  + 1.0 * C.xxx;\n            //   x2 = x0 - i2  + 2.0 * C.xxx;\n            //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n            vec3 x1 = x0 - i1 + C.xxx;\n            vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n            vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n          // Permutations\n            i = mod289(i);\n            vec4 p = permute( permute( permute(\n                       i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n                     + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n                     + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n          // Gradients: 7x7 points over a square, mapped onto an octahedron.\n          // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n            float n_ = 0.142857142857; // 1.0/7.0\n            vec3  ns = n_ * D.wyz - D.xzx;\n\n            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n            vec4 x_ = floor(j * ns.z);\n            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n            vec4 x = x_ *ns.x + ns.yyyy;\n            vec4 y = y_ *ns.x + ns.yyyy;\n            vec4 h = 1.0 - abs(x) - abs(y);\n\n            vec4 b0 = vec4( x.xy, y.xy );\n            vec4 b1 = vec4( x.zw, y.zw );\n\n            //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n            //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n            vec4 s0 = floor(b0)*2.0 + 1.0;\n            vec4 s1 = floor(b1)*2.0 + 1.0;\n            vec4 sh = -step(h, vec4(0.0));\n\n            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n            vec3 p0 = vec3(a0.xy,h.x);\n            vec3 p1 = vec3(a0.zw,h.y);\n            vec3 p2 = vec3(a1.xy,h.z);\n            vec3 p3 = vec3(a1.zw,h.w);\n\n          //Normalise gradients\n            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n            p0 *= norm.x;\n            p1 *= norm.y;\n            p2 *= norm.z;\n            p3 *= norm.w;\n\n          // Mix final noise value\n            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n            m = m * m;\n            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                          dot(p2,x2), dot(p3,x3) ) );\n            }\n                    \n          const float interval = 3.0;\n          \n          void main(void){\n            float strength = smoothstep(interval * 0.5, interval, interval - mod(time, interval));\n            vec2 shake = vec2(strength * 8.0 + 0.5) * vec2(\n              random(vec2(time)) * 2.0 - 1.0,\n              random(vec2(time * 2.0)) * 2.0 - 1.0\n            ) / resolution;\n          \n            float y = vUv.y * resolution.y;\n            float rgbWave = (\n                snoise3(vec3(0.0, y * 0.01, time * 400.0)) * (2.0 + strength * 32.0)\n                * snoise3(vec3(0.0, y * 0.02, time * 200.0)) * (1.0 + strength * 4.0)\n                + step(0.9995, sin(y * 0.005 + time * 1.6)) * 12.0\n                + step(0.9999, sin(y * 0.005 + time * 2.0)) * -18.0\n              ) / resolution.x;\n            float rgbDiff = (6.0 + sin(time * 500.0 + vUv.y * 40.0) * (20.0 * strength + 1.0)) / resolution.x;\n            float rgbUvX = vUv.x + rgbWave;\n            float r = texture2D(texture, vec2(rgbUvX + rgbDiff, vUv.y) + shake).r;\n            float g = texture2D(texture, vec2(rgbUvX, vUv.y) + shake).g;\n            float b = texture2D(texture, vec2(rgbUvX - rgbDiff, vUv.y) + shake).b;\n          \n            float whiteNoise = 0.00000000000001;\n          \n            float bnTime = floor(time * 20.0) * 200.0;\n            float noiseX = step((snoise3(vec3(0.0, vUv.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float noiseY = step((snoise3(vec3(0.0, vUv.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float bnMask = noiseX * noiseY;\n            float bnUvX = vUv.x + sin(bnTime) * 0.2 + rgbWave;\n            float bnR = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask;\n            float bnG = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask;\n            float bnB = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask;\n            vec4 blockNoise = vec4(bnR, bnG, bnB, 1.0);\n          \n            float bnTime2 = floor(time * 25.0) * 300.0;\n            float noiseX2 = step((snoise3(vec3(0.0, vUv.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);\n            float noiseY2 = step((snoise3(vec3(0.0, vUv.y * 8.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float bnMask2 = noiseX2 * noiseY2;\n            float bnR2 = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask2;\n            float bnG2 = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask2;\n            float bnB2 = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask2;\n            vec4 blockNoise2 = vec4(bnR2, bnG2, bnB2, 1.0);\n          \n            float waveNoise = 0.1;\n          \n            gl_FragColor = vec4(r, g, b, 1.0) * (1.0 - bnMask - bnMask2) + (whiteNoise + blockNoise + blockNoise2 - waveNoise);\n          }\n        '
            }));
        }
    }, {
        key: 'render',
        value: function render(time) {
            this.uniforms.time.value += time;
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        }
    }]);

    return PostEffect;
}();

var ConsoleSignature = function() {
    function ConsoleSignature() {
        _classCallCheck(this, ConsoleSignature);


    }

    _createClass(ConsoleSignature, [{
        key: 'show',
        value: function show() {
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                var args = ['\n%c ' + this.message + ' %c%c ' + this.url + ' \n\n', 'color: #fff; background: #222; padding:3px 0;', 'padding:3px 1px;', 'color: #fff; background: #47c; padding:3px 0;'];
                console.log.apply(console, args);
            } else if (window.console) {
                console.log(this.message + ' ' + this.url);
            }
        }
    }]);

    return ConsoleSignature;
}();

var debounce = function debounce(callback, duration) {
    var timer;
    return function(event) {
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback(event);
        }, duration);
    };
};

*/








/*
var canvases = document.getElementsByClassName('floater');
for (var i = 0; i < canvases.length; i++) {
    canvases[i].innerHTML = " ";
}
*/



















    //Home Canvas
    /**
var renderBack1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
var scene = new THREE.Scene();
var sceneBack = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
var cameraBack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var clock = new THREE.Clock();


var canvasHome = document.getElementById('canvas-home');
var renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: canvasHome
});



var homeImg = new BackgroundImage();
var postEffect = new PostEffect(renderBack1.texture);
var consoleSignature = new ConsoleSignature();

var resizeWindow = function resizeWindow() {
    canvasHome.width = window.innerWidth;
    canvasHome.height = window.innerHeight;
    cameraBack.aspect = window.innerWidth / window.innerHeight;
    cameraBack.updateProjectionMatrix();
    homeImg.resize();
    postEffect.resize();
    renderBack1.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
};



var render = function render() {
    var time = clock.getDelta();
    renderer.render(sceneBack, cameraBack, renderBack1);
    postEffect.render(time);
    renderer.render(scene, camera);
};
var renderLoop = function renderLoop() {
    render();
    requestAnimationFrame(renderLoop);
};



var on = function on() {
    window.addEventListener('resize', debounce(function() {
        resizeWindow();
    }), 1000);
};


var init = function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111, 1.0);
    cameraBack.position.set(0, 0, 100);
    cameraBack.lookAt(new THREE.Vector3());




        homeImg.init('https://thumb.ibb.co/degV9y/hud.png', function() {
        sceneBack.add(homeImg.obj);
        scene.add(postEffect.obj);
    });

  
    


    on();
    resizeWindow();
    renderLoop();
};
init();    



*/
















/*===========================================
Team Slider
===========================================*/
var sliderTeam = (function(document, $) {
  
  'use strict';
  
  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 2500,
      
      _init = function() {
        _initWidth();
        _eventInit();
      },
      
      _initWidth = function() {
        $list.css({
          'margin-left': Math.floor(100 / $nView) + '%',
          'width': Math.floor(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.velocity({ display: "block" }, { delay:1000 });
      },
      
      _eventInit = function() {
        
        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       && 
                !window.webkitRequestAnimationFrame && 
                !window.mozRequestAnimationFrame    && 
                !window.oRequestAnimationFrame      && 
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
            handle.value = requestAnimFrame(loop);
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };
        
        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });
        
        autoSlider = requestInterval(_autoMove, $acAuto);
      },
      
      _moveIt = function(obj, x) {
        
        var n = x;
        
        obj.find('figure').addClass('active');        
        $listItems.not(obj).find('figure').removeClass('active');
        
        $list.velocity({
          translateX: Math.floor((-(100 / $nItems)) * n) + '%',
          translateZ: 0
        }, {
          duration: 1000,
          easing: [400, 26],
          queue: false
        });
        
      },
      
      _autoMove = function(currentSlide) {
        if ($isAuto) { 
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        console.log($current);
        _moveIt($listItems.eq($current), $current);
      },
      
      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };
  
  return {
    init: _init
  };

})(document, jQuery);

sliderTeam.init();





 
 


































var UI = (function() {

    var color = {
        teal2: '#ffffff',
        teal: '#ffffff',
        darK: '#ffffff',
        red: '#FF0002',
        light: '#ffffff'
    };

    var ease = {
        power: Power4.easeOut,
        elastic: Elastic.easeOut.config(1, 1),
        none: Power0.easeNone,
        rough: RoughEase.ease.config({
            points: 100,
            strength: 4,
            clamp: true,
            randomize: true,
        }),
        back: Back.easeOut.config(1)
    };

    var $window = $(window);
    var header = $('#header');
    var uiHud = $('.ui-hud');
    var hudBox = $('.hud-box');
    var hudBoxBorder = hudBox.find('.hud-box-border');
    var h1Title = header.find('h1.title');
    var h2Title = $('#essay .header-title .title');
    var paragraph = $('#essay p');
    var borderTB = uiHud.find('.border.b, .border.t');
    var borderLR = hudBox.find('.border.l, .border.r');
    var tics = hudBox.find('.tics');
    var tic = tics.find('.tic');
    var borderV = uiHud.find('.border-v');
    var borderH = uiHud.find('.border-h');
    var borderEnds = $('.cap, .x-hair, .batt');
    var graph = hudBox.find('.ui-graph');
    var logoBox = uiHud.find('.ui-logo');
    var logo = logoBox.find('.logo-mark');
    var logoRing = logoBox.find('.ring');
    var logoCorners = logoBox.find('.corners');
    var borderX = uiHud.find('.border-x');
    var borderV2 = uiHud.find('.ui-border-v2');
    var circles = uiHud.find('.circle');
    var textBoxH5 = uiHud.find('.ui-text-box').find('h5');
    var textBoxP = uiHud.find('.ui-text-box').find('.text');
    var button = $('.ui-button');
    var figure = $('.wrap figure');

    function animate() {

        $window.scrollTop(0);

        var introTL = new TimelineMax();
        var h1Letters = new SplitText(h1Title, {
            type: 'words chars',
            wordsClass: 'word word++'
        });
        var h1Chars = h1Letters.chars;
        // var audioText    = new Audio('assets/sound/digital-text-02.mp4');
        // audioText.volume = 0.3;

        var borderDur = 6;

        introTL
            .fromTo(borderV, borderDur, {
                scaleY: 0,
            }, {
                ease: ease.elastic,
                scaleY: 1,
            }, 'borders')
            .fromTo(borderH, borderDur, {
                scaleX: 0,
            }, {
                ease: ease.elastic,
                scaleX: 1,
            }, 'borders')
            .fromTo(borderEnds, borderDur, {
                opacity: 0,
            }, {
                opacity: 1,
                ease: ease.rough,
            }, 'borders')
            .fromTo(borderX, borderDur, {
                scale: 0,
            }, {
                scale: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderTB, borderDur, {
                scaleX: 0,
            }, {
                scaleX: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderLR, borderDur, {
                scaleY: 0,
            }, {
                scaleY: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderV2, borderDur, {
                y: '-100%',
            }, {
                y: '0%',
                ease: ease.elastic,
            }, 'borders')
            .from(tic, borderDur / 2, {
                ease: ease.elastic,
                scaleY: 0
            }, 'borders+=0.5')
            .staggerFromTo(circles, borderDur, {
                autoAlpha: 0,
                scale: 0,
                y: '-50%'
            }, {
                scale: 1,
                ease: ease.elastic,
                autoAlpha: 1,
                repeat: -1,
                repeatDelay: 30,
                y: '0%'
            }, 0.1, 'borders+=0.5')
            .fromTo(logoBox, 1, {
                scale: 0
            }, {
                scale: 1,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logoRing, 2.5, {
                scale: 0,
                autoAlpha: 0,
            }, {
                delay: 2.5,
                scale: 1,
                autoAlpha: 1,
                rotation: 360,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logoCorners, 2.5, {
                scale: 2,
                autoAlpha: 0
            }, {
                scale: 1,
                delay: 2.5,
                autoAlpha: 1,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logo, 1, {
                autoAlpha: 0,
                fill: '#fff',
            }, {
                autoAlpha: 1,
                fill: '#00ffc3',
                ease: ease.rough,
                repeat: -1,
                repeatDelay: 30,
            }, 'borders+=1')
            //- Text Box
            .add('textBox', 5)
            .fromTo(textBoxP, 5, {
                height: 0
            }, {
                height: 140,
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: ease.none,
            }, 'textBox')
            .fromTo(textBoxH5, 1, {
                visibility: 'hidden',
            }, {
                visibility: 'visible',
                ease: ease.none,
            }, 'textBox')
            .to(textBoxH5, 1, {
                text: 'Status: Ready',
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: ease.none,
            }, 'textBox')

        //- HUD Box
        .add('hudBox', 0)
            .fromTo(hudBoxBorder, borderDur / 2, {
                scale: 0
            }, {
                scale: 1,
                ease: ease.elastic
            }, 'hudBox')
            .fromTo(button, 1, {
                autoAlpha: 0,
                scale: 0
            }, {
                ease: ease.elastic,
                autoAlpha: 1,
                scale: 1,
            }, 'hudBox+=1.2')
            .fromTo(graph, 1, {
                scale: 0,
                autoAlpha: 0
            }, {
                ease: ease.elastic,
                scale: 1,
                autoAlpha: 1,
            }, 'hudBox+=0')
            .staggerFromTo(h1Chars, 1, {
                visibility: 'hidden',
                y: Math.random() * 10,
                background: 'rgba(255, 255, 255, 0.3)',
                ease: ease.power,
            }, {
                visibility: 'visible',
                background: 'none',
                onStart: function() {
                    // audioText.play();
                },
                ease: ease.power,
            }, 0.05, 'hudBox+=1')
            .staggerFromTo('h1.title .word2', 3, {
                color: color.light,
                // background  : 'rgba(0, 255, 195, 0.3)',
                ease: ease.rough
            }, {
                color: color.teal2,
                background: 'rgba(255, 255, 255, 0)',
                ease: ease.rough
            }, 0.5, 'hudBox+=2');
    }

    //-----------------------------------------------------------

    return {
        animate: animate
    };

}());

$(window).on('load', function() {
    $('body').css('opacity', 1);
    UI.animate();
})





































// Inspiration: https://neurohive.io/

// tilt.js

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.tilt = function (options) {

        /**
         * RequestAnimationFrame
         */
        const requestTick = function() {
            if (this.ticking) return;
            requestAnimationFrame(updateTransforms.bind(this));
            this.ticking = true;
        };

        /**
         * Bind mouse movement evens on instance
         */
        const bindEvents = function() {
            const _this = this;
            $(this).on('mousemove', mouseMove);
            $(this).on('mouseenter', mouseEnter);
            if (this.settings.reset) $(this).on('mouseleave', mouseLeave);
            if (this.settings.glare) $(window).on('resize', updateGlareSize.bind(_this));
        };

        /**
         * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
         */
        const setTransition = function() {
            if (this.timeout !== undefined) clearTimeout(this.timeout);
            $(this).css({'transition': `${this.settings.speed}ms ${this.settings.easing}`});
            if(this.settings.glare) this.glareElement.css({'transition': `opacity ${this.settings.speed}ms ${this.settings.easing}`});
            this.timeout = setTimeout(() => {
                $(this).css({'transition': ''});
                if(this.settings.glare) this.glareElement.css({'transition': ''});
            }, this.settings.speed);
        };

        /**
         * When user mouse enters tilt element
         */
        const mouseEnter = function(event) {
            this.ticking = false;
            $(this).css({'will-change': 'transform'});
            setTransition.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseEnter");
        };

        /**
         * Return the x,y position of the mouse on the tilt element
         * @returns {{x: *, y: *}}
         */
        const getMousePositions = function(event) {
            if (typeof(event) === "undefined") {
                event = {
                    pageX: $(this).offset().left + $(this).outerWidth() / 2,
                    pageY: $(this).offset().top + $(this).outerHeight() / 2
                };
            }
            return {x: event.pageX, y: event.pageY};
        };

        /**
         * When user mouse moves over the tilt element
         */
        const mouseMove = function(event) {
            this.mousePositions = getMousePositions(event);
            requestTick.call(this);
        };

        /**
         * When user mouse leaves tilt element
         */
        const mouseLeave = function() {
            setTransition.call(this);
            this.reset = true;
            requestTick.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseLeave");
        };

        /**
         * Get tilt values
         *
         * @returns {{x: tilt value, y: tilt value}}
         */
        const getValues = function() {
            const width = $(this).outerWidth();
            const height = $(this).outerHeight();
            const left = $(this).offset().left;
            const top = $(this).offset().top;
            const percentageX = (this.mousePositions.x - left) / width;
            const percentageY = (this.mousePositions.y - top) / height;
            // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
            const tiltX = ((this.settings.maxTilt / 2) - ((percentageX) * this.settings.maxTilt)).toFixed(2);
            const tiltY = (((percentageY) * this.settings.maxTilt) - (this.settings.maxTilt / 2)).toFixed(2);
            // angle
            const angle = Math.atan2(this.mousePositions.x - (left+width/2),- (this.mousePositions.y - (top+height/2)) )*(180/Math.PI);
            // Return x & y tilt values
            return {tiltX, tiltY, 'percentageX': percentageX * 100, 'percentageY': percentageY * 100, angle};
        };

        /**
         * Update tilt transforms on mousemove
         */
        const updateTransforms = function() {
            this.transforms = getValues.call(this);

            if (this.reset) {
                this.reset = false;
                $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`);

                // Rotate glare if enabled
                if (this.settings.glare){
                    this.glareElement.css('transform', `rotate(180deg) translate(-50%, -50%)`);
                    this.glareElement.css('opacity', `0`);
                }

                return;
            } else {
                $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(${this.settings.axis === 'x' ? 0 : this.transforms.tiltY}deg) rotateY(${this.settings.axis === 'y' ? 0 : this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`);

                // Rotate glare if enabled
                if (this.settings.glare){
                    this.glareElement.css('transform', `rotate(${this.transforms.angle}deg) translate(-50%, -50%)`);
                    this.glareElement.css('opacity', `${this.transforms.percentageY * this.settings.maxGlare / 100}`);
                }
            }

            // Trigger change event
            $(this).trigger("change", [this.transforms]);

            this.ticking = false;
        };

        /**
         * Prepare elements
         */
        const prepareGlare = function () {
            const glarePrerender = this.settings.glarePrerender;

            // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
            if (!glarePrerender)
            // Create glare element
                $(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>');

            // Store glare selector if glare is enabled
            this.glareElementWrapper = $(this).find(".js-tilt-glare");
            this.glareElement = $(this).find(".js-tilt-glare-inner");

            // Remember? We assume all css is already set, so just return
            if (glarePrerender) return;

            // Abstracted re-usable glare styles
            const stretch = {
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
            };

            // Style glare wrapper
            this.glareElementWrapper.css(stretch).css({
                'overflow': 'hidden',
            });

            // Style glare element
            this.glareElement.css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'pointer-events': 'none',
                'background-image': `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
                'width': `${$(this).outerWidth()*2}`,
                'height': `${$(this).outerWidth()*2}`,
                'transform': 'rotate(180deg) translate(-50%, -50%)',
                'transform-origin': '0% 0%',
                'opacity': '0',
            });

        };

        /**
         * Update glare on resize
         */
        const updateGlareSize = function () {
            this.glareElement.css({
                'width': `${$(this).outerWidth()*2}`,
                'height': `${$(this).outerWidth()*2}`,
            });
        };

        /**
         * Public methods
         */
        $.fn.tilt.destroy = function() {
            $(this).each(function () {
                $(this).find('.js-tilt-glare').remove();
                $(this).css({'will-change': '', 'transform': ''});
                $(this).off('mousemove mouseenter mouseleave');
            });
        };

        $.fn.tilt.getValues = function() {
            const results = [];
            $(this).each(function () {
                this.mousePositions = getMousePositions.call(this);
                results.push(getValues.call(this));
            });
            return results;
        };

        $.fn.tilt.reset = function() {
            $(this).each(function () {
                this.mousePositions = getMousePositions.call(this);
                this.settings = $(this).data('settings');
                mouseLeave.call(this);
                setTimeout(() => {
                    this.reset = false;
                }, this.settings.transition);
            });
        };

        /**
         * Loop every instance
         */
        return this.each(function () {

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            this.settings = $.extend({
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 300,
                easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
                scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1',
                speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '400',
                transition: $(this).is('[data-tilt-transition]') ? $(this).data('tilt-transition') : true,
                axis: $(this).is('[data-tilt-axis]') ? $(this).data('tilt-axis') : null,
                reset: $(this).is('[data-tilt-reset]') ? $(this).data('tilt-reset') : true,
                glare: $(this).is('[data-tilt-glare]') ? $(this).data('tilt-glare') : false,
                maxGlare: $(this).is('[data-tilt-maxglare]') ? $(this).data('tilt-maxglare') : 1,
            }, options);


            this.init = () => {
                // Store settings
                $(this).data('settings', this.settings);

                // Prepare element
                if(this.settings.glare) prepareGlare.call(this);

                // Bind events
                bindEvents.call(this);
            };

            // Init
            this.init();

        });
    };

    /**
     * Auto load
     */
    $('[data-tilt]').tilt();

    return true;
}));

$(".example").tilt({
  glare: false,
  maxGlare: .2,
  maxTilt: 5
});

