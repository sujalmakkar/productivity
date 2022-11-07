import Blob from './gl/Blob';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three';
import pscore from '../scripts/score'
import workstatus from '../scripts/workstatus'


export default function app(){
  var camera2;
  var blob1;
  var canvas = document.querySelector('canvas#webgl-blob')

  if(canvas){
      
    var scene = new THREE.Scene()

    var renderer = new THREE.WebGLRenderer({
        canvas:canvas,
        alpha:true
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(((window.innerWidth*70/100)),(window.innerHeight*70/100));

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

        window.addEventListener('load', function() {
        camera2.aspect = (window.innerWidth*70/100) / (window.innerHeight*70/100);
        camera2.updateProjectionMatrix();
        renderer.setSize((window.innerWidth*70/100), (window.innerHeight*70/100));

  }, false);

  window.addEventListener('resize', function() {

      camera2.aspect = (window.innerWidth*70/100) / (window.innerHeight*80/100);
      camera2.updateProjectionMatrix();
      renderer.setSize((window.innerWidth*70/100), (window.innerHeight*80/100));
      controls = new OrbitControls( camera2, renderer.domElement );
      controls.enableDamping = true;
      controls.dampingFactor = .02;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.screenSpacePanning = false; 
    
}, false);


    camera2 = new THREE.PerspectiveCamera(45,((window.innerWidth*80/100))/(window.innerHeight*80/100),0.1,1000)

    blob1 = new Blob(2, .5, .5, 0, 0.15, Math.PI * 1);    


    blob1.position.set(0, 0, 0);

    blob1.rotation.set(-0.4, 0, 0.5);

    camera2.position.set(1,0,-8)

    camera2.rotation.set(-0.02,2.89,0)

    scene.add(camera2)
    scene.add(blob1)
    

    var controls = new OrbitControls( camera2, renderer.domElement ); 

    controls.enableDamping = true;
    controls.dampingFactor = .02;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.screenSpacePanning = false;


    var tofetch = false
    setInterval(()=>{
      tofetch = true
    },500)
    var currentvalue = 0 
    var minvalue = 1
    var time = .1
    var timespeed = 0.0001

    function animate(){
        time+= timespeed
      
        if(tofetch){
          currentvalue = pscore(0,0)
          var status = workstatus()
          if(status){
            timespeed =0.01
          }else{
            timespeed =0.002
          }
          tofetch=false
        }
        
        blob1.mesh.material.uniforms.uTime.value = time*0.5;
        blob1.mesh.material.uniforms.uNoiseDensity.value = (minvalue+(currentvalue*.1))*.8
        
        controls.update();

        requestAnimationFrame(animate)

        renderer.render(scene,camera2)
    }

    animate()
  }else{
    null
  }
}
