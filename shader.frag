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
    float line_size = 0.01;
    float circle = pow(st.x - 0.5, 2.0) + pow(st.y - 0.5, 2.0);
    float radius_squared = pow(radius, 2.0);
    return step(radius_squared - pow(line_size, 2.0), circle) -
        step(radius_squared + pow(line_size, 2.0), circle);
}

// Kind of expensive as it requires sqrt() in the use of distance()
float plot_circle_2(vec2 st, float radius) {
    float dist = distance(st, vec2(0.5, 0.5));
    return step(dist, radius);
}

float plot_filled_rect(vec2 st, vec2 size) {
    size = 0.25 - (size * 0.25);
    vec2 uv = step(size, st * (1.0 - st));

    return uv.x * uv.y;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float y = abs((st.x * 2.0) - 1.0);

    vec3 color = vec3(st.y);

    // float pct = plot(st, y);
    // float pct = plot_circle(st, 0.2);
    // float pct = plot_circle_2(st, 0.2);
    float pct = plot_filled_rect(st, vec2(0.05, 0.5));
    color = mix(color, vec3(1.0, 0.0, 0.0), pct);
    pct = plot_filled_rect(st, vec2(0.02, 0.2));
    color = mix(color, vec3(0.0, 1.0, 0.0), pct);
    // color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);
    // color = mix(color, vec3(1.0, 0.0, 0.0), pct);
    gl_FragColor = vec4(color, 1.0);
}