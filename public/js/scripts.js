
function reloadPage() {
    window.location.reload()
}

console.log(d3); // test if d3 is loaded
const dataset = [73, 18, 56, 38, 4]

// d3.select('svg').append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50);

const width = 500;
const height = 500;

const linscale = d3.scaleLinear()
    .domain([0, 100]) // unit: km
    .range([0, width]); // unit: px

const yAxisScale = d3.scaleLinear()
    .domain([100, 0]) // unit: km
    .range([0, width]); // unit: px

const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(['blue', 'red']);

const axis = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(20);

// Add Rectangles

d3.select('.svg1')
    .append('g')
    .selectAll('rect')
    .data(dataset)
    .enter().append('rect')
    .attr('width',50)
    .attr('height', data => linscale(data))
    .attr('stroke', 'black')
    .attr('fill', data => colorScale(data))
    .attr('x', function (d, i) { return (i * 75) + 50; })
    .attr('y', data => 500 - linscale(data))
    .attr('transform', 'translate(75,0)');


d3.select('.svg1')
    .append('g')
    .attr('transform', 'translate(50, 0)')
    .call(axis);


// three.js trial

const data3D = [
    [3, 2, 1],
    [6, 5, 4],
    [5, 7, 6]
]


    ///////////////////////
    // Initial Variables //
    ///////////////////////

    // Values
    var tick = 0;
    var size = 0.25;

    var red = 0xff0000;
    var blue = 0x1176c5;
    var white = 0xf9f9f9;

    // Arrays
    var bar = new Array();

    var camera;
    // var scene;

    ///////////////////////
    // Initial Setup     //
    ///////////////////////

    init();

    function init() {
        init3DScene();
        initListeners();

    }

    function initListeners() {
        window.onWindowResize()
        //(window).resize(onWindowResize);
    }

    function init3DScene() {

        // Setup Scene / Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);

        camera.position.set(100, 100, 100);
        camera.lookAt(new THREE.Vector3(20, 40, 0));

        // Setup Renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        document.getElementById('webGL-container').append(renderer.domElement)
        //$("#webGL-container").append(renderer.domElement);

        init3DElements();
    }

    function init3DElements() {

        createFloor();

        createBar(5, -25, red);
        createBar(5, -20, red);
        createBar(5, -15, white);
        createBar(5, -10, white);
        createBar(5, -5, blue);
        createBar(5, 0, blue);

        createLight();
    }

    ///////////////////////
    // Interactions      //
    ///////////////////////

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    ///////////////////////
    // Create Elements   //
    ///////////////////////

    function createLight() {

        var ambient = new THREE.AmbientLight(0x999999);
        var spot = new THREE.SpotLight({
            color: 0xffffff,
            intensity: 0.1
        });

        spot.position.set(-50, 100, 100);
        spot.castShadow = true;
        spot.shadowDarkness = 0.2;

        scene.add(ambient, spot);
    }

    function createBar(total, z, colour) {

        for (var i = 0; i < total; i += 1) {

            var geometry = new THREE.BoxGeometry(2, 2, 2);
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1, z));

            var material = new THREE.MeshPhongMaterial({
                color: colour
            });

            id = new THREE.Mesh(geometry, material);

            id.position.x = i * 5;
            id.name = "bar-" + i;
            id.castShadow = true;
            id.receiveShadow = true;

            scene.add(id);
            bar.push(id);

            selectedBar = bar[Math.floor(bar.length / 2)];
        }

        for (var i = 0; i < bar.length; i++) {

            var tween = new TweenMax.to(bar[i].scale, 1, {

                ease: Elastic.easeOut.config(1, 1),

                y: Math.random() * 30 /*i+1*/ ,
                delay: i * 0.25

            });
        }
    }

    function createFloor() {

        var geometry = new THREE.BoxGeometry(2000, 2000, 2000);
        var material = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            shininess: 20
        });
        material.side = THREE.BackSide

        floor = new THREE.Mesh(geometry, material);

        floor.position.set(0, 1000, 0);
        floor.rotation.x = THREE.Math.degToRad(-90);

        floor.receiveShadow = true;

        scene.add(floor);
    }

    ///////////////////////
    // Render            //
    ///////////////////////

    function render() {

        tick++;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();

