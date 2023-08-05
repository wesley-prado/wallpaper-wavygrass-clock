/**
 * @class BackgroundController
 * @description A class that represents the desktop background. It is responsible for displaying the background image or video.
 * @version 1.0.0
 * @author Wesley Prado <wesleyprado.dev@gmail.com>
 * @date 2023-08-04
 */
class BackgroundController {
  /**
   * @type {string}
   * @private
   */
  #documentBody;

  /**
   * @type {VideoController}
   * @private
   */
  #videoController;

  /**
   * @type {ImageController}
   * @private
   */
  #imageController;

  /**
   * @type {string}
   * @private
   */
  #image;

  /**
   * @type {string}
   * @private
   */
  #video;

  constructor() {
    this.#documentBody = document.body;
    this.#imageController = new ImageController(this.#documentBody);
    this.#videoController = new VideoController(this.#documentBody);
  }

  /**
   * Sets the image and video properties.
   * @param {string} src - The path to the image file.
   */
  setImage(src) {
    this.#image = src ?? this.#image;
  }

  /**
   * Sets the image and video properties.
   * @param {string} src - The path to the image file.
   */
  setVideo(src) {
    this.#video = src ?? this.#video;
  }

  setDesktopBackground() {
    if (!!this.#video) {
      this.#setVideoWallpaper(this.#fixFilePath(this.#video));
    } else if (!!this.#image) {
      this.#setImageWallpaper(this.#fixFilePath(this.#image));
    } else {
      this.#setVideoWallpaper(DEFAULT_VIDEO_PATH);
    }
  }

  #fixFilePath(filePath) {
    const decodedPath = decodeURIComponent(filePath);
    const fixedPath = decodedPath.replace(/\//g, "\\");

    return `file:///${fixedPath}`;
  }

  #setVideoWallpaper(src) {
    this.#videoController.setVideo(src);
    this.#videoController.show();
    this.#videoController.play();

    this.#imageController.hide();
  }

  #setImageWallpaper(src) {
    this.#imageController.setImage(src);
    this.#imageController.show();

    this.#videoController.hide();
  }

  /**
   * Sets the video playback rate.
   * @param {number} rate - The playback rate.
   */
  setVideoPlaybackRate(rate) {
    this.#videoController.setPlaybackRate(rate);
  }

  async playVideo() {
    await this.#videoController.play();
  }

  pauseVideo() {
    this.#videoController.pause();
  }

  /**
   * Sets the image alignment.
   * @param {string} position - The image alignment.
   */
  setAlignment(position) {
    this.#setImageAlignment(position);
    this.#setVideoAlignment(position);
  }

  #setImageAlignment(position) {
    this.#imageController.setImageAlignment(position);
  }

  #setVideoAlignment(position) {
    this.#videoController.setVideoAlignment(position);
  }

  muteVideo(mute) {
    this.#videoController.mute(mute);
  }

  setVideoVolume(volume) {
    this.#videoController.volume(volume);
  }
}
