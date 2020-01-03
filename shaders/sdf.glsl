#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  float d = 0.0;
  // Remap the space to -1. to 1.
  st = st * 2. -1.;

  st.x *= sin(st.y +  u_mouse.y / u_resolution.x * .25);
  st.x -= .515 + u_mouse.x / u_resolution.x * .25;
  st.y += cos(st.y);

  d = length(st);

  float t = u_time / 1.;
  float repeat = 5. + sin(u_time) * .1;
  vec3 color = vec3(smoothstep(.95, .96, fract(d * repeat)));
  color.r *= floor(d * repeat);
  gl_FragColor = vec4(color.r * .07, color.g * .2, color.b * .54, .0);
}
