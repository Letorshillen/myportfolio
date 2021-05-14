uniform float uTime;
varying vec2 vUv;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

/*
 * Original shader from: https://www.shadertoy.com/view/NsBXDm
 */

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 uv = fragCoord/vUv.xy * 0.01;
 for (float i = 1.0; i < 10.0; i++)
  {
    
    vec2 uv2 = uv;
    uv2.x += sin(uTime*0.25)*1.25/ i* sin(i *  uv2.y + uTime * 0.55);
    uv2.y +=  cos(uTime*0.2)*2./i* cos(i * uv2.x + uTime * 0.35 ); 
    uv = uv2;
  }

  float outerGlow = distance(vUv, vec2(0.5)) *8.0 - 1.0;
  
 float r = abs(sin(uv.x))-0.2;
 float g = abs(sin(uv.x+2.0))-0.2;
 float b = abs(sin(uv.x+4.0))-0.2;   
 vec3 col = vec3(r,g,b);

 col += outerGlow;
 vec3 color = mix(uColorStart, uColorEnd, col);
 
 fragColor = vec4(color, 1.0);
}


void main(){



    mainImage(gl_FragColor, gl_FragCoord.xy);
    }