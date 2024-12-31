#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float y) {
    return step(y - 0.005, st.y) -
        step(y + 0.005, st.y);
}

float plot_circle(vec2 st, float radius) {
    float circle = pow(st.x - 0.5, 2.0) + pow(st.y - 0.5, 2.0);
    float radius_squared = pow(radius, 2.0);
    return step(radius_squared - 0.001, circle) -
        step(radius_squared + 0.001, circle);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float y = abs((st.x * 2.0) - 1.0);

    vec3 color = vec3(0.0);

    // float pct = plot(st, y);
    float pct = plot_circle(st, 0.2);
    color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

    gl_FragColor = vec4(color, 1.0);
}