import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Page from "./Page.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.html = this.experience.html;
    this.sound = this.experience.sound;
    this.debug = this.experience.debug.panel;

    this.resources.on("loaded", () => {
      document.querySelector(".progressbar").style.width =
        (this.resources.loaded / this.resources.toLoad) * 100 + "%";
    });

    // Wait for resources
    this.resources.on("ready", () => {
      this.experience.time.start = Date.now();
      this.experience.time.elapsed = 0;

      // Setup
      this.page = new Page();
      this.environment = new Environment();

      // Remove preloader
      setTimeout(() => {
        this.html.progress.classList.add("fade-out");
        this.html.logo.classList.add("fade-out");
        setTimeout(() => {
          this.html.preloader.classList.add("fade-out-long");
          setTimeout(() => {
            this.html.preloader.remove();
          }, 2000);
        }, 1000);
      }, 1000);

      // Animation timeline
      this.animationPipeline();
    });
  }

  animationPipeline() {
    // if ( this.text )
    //     this.text.animateTextShow()

    if (this.camera) this.camera.animateCameraPosition();
  }

  resize() {}

  scroll() {
    if (this.page) this.page.scroll();
  }

  update() {
    if (this.page) this.page.update();
  }
}
