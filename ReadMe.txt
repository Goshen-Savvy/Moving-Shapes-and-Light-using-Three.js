****************************************************************************************************************************
												Assignment 4
****************************************************************************************************************************

Assignment 4 was completed using three.js framework.

Three.js documentation stated the three.js framework installation:

	To install the three npm module, open a terminal window in your project folder and run:

		npm install --save three 

This application worked perfectly on PCs with npm installed and PCs without npm installed on them.
However, the following was installed from vscode extension on both types of PCs:

	- JavaScript (ES6) code snippets

	- WebGL GLSL editor


According to an online tutorial (https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html), to do anything 
useful with WebGL generally requires quite a bit of code and that is where three.js comes in. It handles scenes, lights, 
shadows, materials, textures, 3d math, all things seamlessly unlike in WebGL. 

Different Light sources used:

	- Ambient light, Point Light and Spot Light

Instructions:

	- All keys have the capacity for turning it on and turning it off.

	- Press the keys once to turn them on and press the keys the second time to turn them off

	- There is an exception; key F turns on the flat shading and key S turns off the flat shading and activates 
        smooth shading

	- With the orbit control, you can navigate the 3d scene using an external mouse to view the various angles of the 3d scene

	- Reduce the lighting to appreciate the light sources and the mouse movement (Very Important!)

Current Key Controls:

	- Press T to toggle Top light 
		- Colors:- A shade of Brown
	  Point Light was used here -- it is positioned directly above the objects.
	
	- Press L to toggle the Left light (Point light was positioned to come from the left)
		- Color:- White

	- Press R to toggle the Right light (Point light was positioned to come from the right)
		- Color:- A shade of Yellow

	- Press F to toggle the flat shading (Flat shading was only applied to cylinder, cone and sphere) 
	  Those objects have several vertices to make flat shading obvious unlike objects with less vertices. Such as,
	   cube and tetrahedron.

	- Press S to turn off flat shading and activate the smooth shading
	  It is smooth shading by default when objects are created in three.js.

	- Press Y to toggle the bulb that moves up and down on the y-axis

	- Press Z to toggle the headlamp and control its movement using the mouse

Previous Key Controls:

	- Press 1 - 5 to set the objects in motion
	
	- Press O and P to toggle both perspective and orthographic cameras.

	- Press W to zoom in the scene and its elements

	- Press X to zoom out of the scene and its elements (Previously S, but now X because of Smooth Shading (S))

	- Press A to move the scene to the right side 
	
	- Press D to move the scene to the left side



REFERENCES

https://blog.logrocket.com/how-to-use-lighting-and-renderers-in-three-js/
https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow
https://threejs.org/docs/#api/en/lights/SpotLight
https://threejs.org/docs/#api/en/lights/shadows/PointLightShadow
https://threejsfundamentals.org/threejs/lessons/threejs-lights.html
https://www.youtube.com/watch?v=4ZgkMS5rH3E
https://blog.logrocket.com/three-js-geometries-and-materials/
https://threejs.org/docs/#examples/en/controls/OrbitControls
https://hofk.de/main/discourse.threejs/2020/TriggerFunction(Animation)/TriggerFunction(Animation).html
https://services.math.duke.edu/courses/math_everywhere/assets/techRefs/Threejs%20Essentials.pdf
https://x-team.com/blog/user-experience-threejs/
https://discourse.threejs.org/t/is-there-a-site-to-load-three-library-no-hotlinking/6065/4
https://imagecomputing.net/damien.rohmer/teaching/2018_2019/semester_1/m2_mpri_cg_viz/tutorial/content/000_threejs_tutorial/index.html
https://codepen.io/SebM/pen/ZvLrJL
https://www.youtube.com/watch?v=4njnviuvt1Q
https://codepen.io/paulmg/pen/yJAwgx?editors=0010
https://jsfiddle.net/prisoner849/vo1urg68/
https://www.youtube.com/watch?v=C8Cuwq1eqDw(tutorial on shaders)
https://cs.wellesley.edu/~cs307/lectures/09.part 
https://stackoverflow.com/questions/29266602/javascript-when-having-pressed-2-keys-simultaneously-down-leaving-one-of-them
https://gamedev.stackexchange.com/questions/74155/what-function-creates-rotation-effect-in-three-js