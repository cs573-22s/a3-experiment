
let dataset =  [73, 18, 56, 38, 4]

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

// const colorScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range(['blue', 'red']);
let colors = ['blue', 'red', 'blue', 'blue', 'red'] // color scheme for bars

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
     // .attr('fill', data => colorScale(data))
     .attr('fill', (d, i) => colors[i])
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


 let ordered = false;
 function orderBarGraph() {
     let ogDataset = dataset.slice(0);

     rect.remove()
     if (!ordered) {
         ogDataset.sort((a, b) => a - b)
         ogDataset.reverse()
     }
     rect = svg1
         .append('g')
         .selectAll('rect')
         .data(ogDataset)
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
     ordered = !ordered;
 }




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

let arcs = groupPie.selectAll('.arc')
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

/*let ordered2 = false;
function orderPieGraph() {
    let ogDataset = dataset.slice(0);
    arcs.remove();
    if (!ordered2) {
        ogDataset.sort((a, b) => a - b)
        ogDataset.reverse()
    }
    arcs = groupPie.selectAll('.arc')
        .data(pie(ogDataset))
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

}*/ // ordering pie charts but think they are already ordered with .pie fxn


// move barchart

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
    am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
        layout: root.verticalLayout
    })
);

// Define data
var data = [{
    country: "France",
    sales: 100000
}, {
    country: "Spain",
    sales: 160000
}, {
    country: "United Kingdom",
    sales: 80000
}];

// Create series
var series = chart.series.push(
    am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
    })
);
series.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
}));
legend.data.setAll(series.dataItems);


// three.js trial
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

    init3D(2);

    function init3D(dimensions) {
        init3DScene(dimensions);
        initListeners();

    }

    function initListeners() {
        window.onWindowResize()
        //(window).resize(onWindowResize);
    }

    function init3DScene(dimensions) {

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

        if (dimensions === 2) {
            init3DElementBar()
        } else {
            init3DElements();
        }

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
function init3DElementBar() {

    createFloor();

    createBar(5, -25, red);
    // createBar(5, -20, red);
    // createBar(5, -15, white);
    // createBar(5, -10, white);
    // createBar(5, -5, blue);
    // createBar(5, 0, blue);

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
        //spot.shadowDarkness = 0.2;

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


// three.js pie chart /////

/*(function (_, THREE) {
    var Pie = window.Pie = function (id, data) {
        this.el = document.getElementById(id);
        this.colors = data.colors;
        this.divisions = data.divisions;

        this.init();
    };

    Pie.prototype.init = function () {
        var scene = this.scene = new THREE.Scene();
        var fov = 45; // camera's field of view
        var viewWidth = this.el.offsetWidth;
        var viewHeight = this.el.offsetHeight;
        var camera = this.camera = new THREE.PerspectiveCamera(
            fov, viewWidth / viewHeight, 1, 1000
        );

        var renderer;
        if (window.WebGLRenderingContext) {
            renderer = new THREE.WebGLRenderer({ antialiasing: true });
        } else {
            renderer = new THREE.CanvasRenderer();
        }
        this.renderer = renderer;

        renderer.setSize(viewWidth, viewHeight);
        renderer.setClearColor(0xffffff, 1); // white bg
        this.el.appendChild(renderer.domElement);

        var pie = this.pie = this.build();
        scene.add(pie);

        pie.rotation.x = Math.PI * 0.6;

        camera.lookAt(pie.position);

        // dynamically calcuate the camera position in order to fit the pie in view
        // http://stackoverflow.com/a/2866471
        //camera.position.z = pie.scale.x / Math.tan(Math.PI * fov / 360);
        camera.position.z = 6;

        var render = function () {
            window.requestAnimationFrame(render);

            pie.rotation.z += 0.005;

            renderer.render(scene, camera);
        };
        render();
    };

    Pie.prototype.build = function () {
        var pie = new THREE.Group();
        var total = 2 * Math.PI;
        var reducer = function (memo, num) { return memo + num; };

        // fill the first segment
        pie.add(this.buildSegment(0, total * this.divisions[0], this.colors[0]));

        for (var i = 1; i < this.divisions.length; i++) {
            pie.add(this.buildSegment(
                // get the sum of all radii before this
                total * _.reduce(_.first(this.divisions, i), reducer, 0),
                total * this.divisions[i],
                this.colors[i]
            ));
        }

        // fill the rest of the pie
        var remainder = total * _.reduce(this.divisions, reducer, 0);
        pie.add(this.buildSegment(remainder, total - remainder, _.last(this.colors)));
        return pie;
    };

    Pie.prototype.buildSegment = function (start, end, color) {
        var points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(0, 2, 0));
        points.push(new THREE.Vector3(0, 2, 1));
        points.push(new THREE.Vector3(0, 0, 1));

        var geometry = new THREE.LatheGeometry(points, 24, start, end);
        var material = new THREE.MeshBasicMaterial({ color: color });
        return new THREE.Mesh(geometry, material);
    };

})(window._, window.THREE);

let yay = new Pie('Pie', {
    divisions: [0.25, 0.6],
    colors: [0xEEEEEE, 0xDDDDDD, 0xCCCCCC]
});*/

// 3d pie chart try 2



