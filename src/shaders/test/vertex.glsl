uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;
uniform float uFrequenzy;


attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y -= sin(modelPosition.x * uFrequenzy - uTime) * 0.1;
    modelPosition.y *= cos(modelPosition.x * uFrequenzy - uTime) * 0.2;

    modelPosition.y += aRandom * 0.1;
    modelPosition.y -= 1.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vRandom = aRandom;
}