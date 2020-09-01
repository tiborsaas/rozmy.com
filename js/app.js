/**
 * Load hero shader
 */
import GlslCanvas from "glslCanvas";
import shader from "../shaders/sdf.glsl";

const root = document.querySelector(".hero");
const canvas = document.createElement("canvas");
const { width, height } = root.getBoundingClientRect();

canvas.width = width / window.devicePixelRatio;
canvas.height = height / window.devicePixelRatio;

var sandbox = new GlslCanvas(canvas);
sandbox.load(shader);

root.appendChild(canvas);
