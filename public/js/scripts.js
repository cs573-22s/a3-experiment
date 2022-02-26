
function reloadPage() {
    window.location.reload()
}

console.log(d3); // test if d3 is loaded
const dataset = [73, 18, 56, 38, 4]

// d3.select('svg').append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50);

const width = 500;
const height = 500;

var svg1 = d3
    .select("svg")
    .attr("viewBox", [0, 0, width, height])
    .property("value", []);

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

 var rect =  svg1
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
     .attr('transform', 'translate(75,0)')
     .on("mouseover",(e, d) => {    // event listener to show tooltip on hover
         d3.select("#bubble-tip-"+d)
             .style("display","block");
     })
     .on("mouseout", (e, d) => {    // event listener to hide tooltip after hover
         if(!d.toolTipVisible){
             d3.select("#bubble-tip-"+d)
                 .style("display","none");
         }
     })
     .on("click", (e, d) => {    // event listener to make tooltip remain visible on click
         if(!d.toolTipVisible){
             d3.select("#bubble-tip-"+d)
                 .style("display", "block");
             d.toolTipVisible = true;
         }
         else{
             d3.select("#bubble-tip-"+d)
                 .style("display", "none");
             d.toolTipVisible = false;
         }
     })

svg1.selectAll(".bubble-tip")
    .data(dataset)
    .join("g")
    .attr("class", "bubble-tip")
    .attr("id", (d)=> "bubble-tip-"+d)
    .attr("transform", "translate(400 , 50)")
    .style("display", "none")
    .append("rect")
    .attr("x",-5)
    .attr("y",-20)
    .attr("rx",5)
    .attr("fill","gray")
    .attr("fill-opacity", 0.9)
    .attr("width",100)
    .attr("height",50)


svg1.selectAll(".bubble-tip")
    .append("text")
    .text(d => d)
    .style("font-family", "sans-serif")
    .style("font-size", 14)
    .attr("stroke", "none")



d3.select('.svg1')
    .append('g')
    .attr('transform', 'translate(50, 0)')
    .call(axis);

// 2d pie chart

// arc donut chart
const svgPie = d3.select('.svgPie').append('svg');
const groupPie = svgPie.append('g').attr('transform', 'translate(300, 300)');

const r2 = 300;
const color = d3.scaleOrdinal()
    .range(['red', 'blue', 'yellow', 'green', 'orange'])

const arc2 = d3.arc()
    .innerRadius(0)
    .outerRadius(r2)

const pie = d3.pie()
    .value(data => data)

const arcs = groupPie.selectAll('.arc')
    .data(pie(dataset))
    .enter().append('g')
    .attr('class', 'arc')


arcs.append('path')
    .attr('d', arc2)
    .attr('fill', data => color(data.data))
    .on("mouseover",(e, d) => {    // event listener to show tooltip on hover
        d3.select("#arc-tip-"+d.value)
            .style("display","block");
    })
    .on("mouseout", (e, d) => {    // event listener to hide tooltip after hover
        if(!d.toolTipVisible){
            d3.select("#arc-tip-"+d.value)
                .style("display","none");
        }
    })
    .on("click", (e, d) => {    // event listener to make tooltip remain visible on click
        if(!d.toolTipVisible){
            d3.select("#arc-tip-"+d.value)
                .style("display", "block");
            d.toolTipVisible = true;
        }
        else{
            d3.select("#arc-tip-"+d.value)
                .style("display", "none");
            d.toolTipVisible = false;
        }
    })

svgPie.selectAll(".arc-tip")
    .data(pie(dataset))
    .join("g")
    .attr("class", "arc-tip")
    .attr("id", (d)=> "arc-tip-"+d.value)
    .attr("transform", "translate(500 , 50)")
    .style("display", "none")
    .append("rect")
    .attr("x",-5)
    .attr("y",-20)
    .attr("rx",5)
    .attr("fill","gray")
    .attr("fill-opacity", 0.9)
    .attr("width",100)
    .attr("height",50)


svgPie.selectAll(".arc-tip")
    .append("text")
    .text(d => d.value)
    .style("font-family", "sans-serif")
    .style("font-size", 14)
    .attr("stroke", "none")
// arcs.append('text')
//     .attr('transform', data => 'translate(' + arc2.centroid(data) + ')')
//     .attr('text-anchor', 'middle')
//     .attr('font-size', '1.5em')
//     .text(data => data.data)




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
        controls = new THREE.OrbitControls (camera, renderer.domElement);

        // var gridXZ = new THREE.GridHelper(100, 10);
        // gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
        // scene.add(gridXZ);

        let gXY = new THREE.PlaneGeometry(3, 10, 1, 10);
        ToQuads(gXY);
        let mXY = new THREE.LineBasicMaterial({color: "black"});
        let grXY = new THREE.LineSegments(gXY, mXY);
        grXY.scale.set(10, 8, 1);
        grXY.position.set(6, 40, -27.5);
        scene.add(grXY);

        // let gXZ = new THREE.PlaneGeometry(1, 1, 3, 10);
        // ToQuads(gXZ);
        // let mXZ = new THREE.LineBasicMaterial({color: "black"});
        // let grXZ = new THREE.LineSegments(gXZ, mXZ);
        // grXZ.scale.set(10, 4, 1);
        // grXZ.rotation.x = Math.PI * -0.5;
        // grXZ.position.set(0, 0, 0);
        // scene.add(grXZ);

        let gYZ = new THREE.PlaneGeometry(10, 3, 10, 1);
        ToQuads(gYZ);
        let mYZ = new THREE.LineBasicMaterial({color: "black"});
        let grYZ = new THREE.LineSegments(gYZ, mYZ);
        grYZ.scale.set(8, 10, 1);
        grYZ.rotation.x = Math.PI * -0.5;
        grYZ.rotation.y = Math.PI / 2;
        grYZ.position.set(21, 40, -12.5);
        scene.add(grYZ);

        init3DElements();
    }

function ToQuads(g) {
    let p = g.parameters;
    let segmentsX = (g.type == "TorusBufferGeometry" ? p.tubularSegments : p.radialSegments) || p.widthSegments || p.thetaSegments || (p.points.length - 1) || 1;
    let segmentsY = (g.type == "TorusBufferGeometry" ? p.radialSegments : p.tubularSegments) || p.heightSegments || p.phiSegments || p.segments || 1;
    let indices = [];
    for (let i = 0; i < segmentsY + 1; i++) {
        let index11 = 0;
        let index12 = 0;
        for (let j = 0; j < segmentsX; j++) {
            index11 = (segmentsX + 1) * i + j;
            index12 = index11 + 1;
            let index21 = index11;
            let index22 = index11 + (segmentsX + 1);
            indices.push(index11, index12);
            if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                indices.push(index21, index22);
            }
        }
        if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
            indices.push(index12, index12 + segmentsX + 1);
        }
    }
    g.setIndex(indices);
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

function animate() {
    controls.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}


setInterval(function(){
    // scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;
}, 5);

    render();
animate();
