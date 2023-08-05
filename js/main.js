const clockController = new ClockController();
const backgroundController = new BackgroundController();

window.wallpaperPropertyListener = {
  applyUserProperties: function ({
    image,
    video,
    mute_video,
    video_volume,
    background_alignment,
    option_hour12,
    hour,
    minute,
    locale,
    weekday,
    top_position,
    left_position,
    clock_size_rem,
    clock_color,
  }) {
    if (image || video) {
      backgroundController.setImage(image?.value);
      backgroundController.setVideo(video?.value);

      backgroundController.setDesktopBackground();
    }

    if (mute_video) {
      backgroundController.muteVideo(mute_video.value);
    }

    if (video_volume) {
      backgroundController.setVideoVolume(video_volume.value);
    }

    if (background_alignment) {
      backgroundController.setAlignment(background_alignment.value);
    }

    if (option_hour12 || hour || minute || locale || weekday) {
      clockController.setOptionHour12(option_hour12?.value);
      clockController.setHour(hour?.value);
      clockController.setMinute(minute?.value);
      clockController.setLocale(locale?.value);
      clockController.setWeekday(weekday?.value);

      clockController.start();
    }

    if (top_position || left_position) {
      clockController.changeClockPosition(
        top_position?.value,
        left_position?.value
      );
    }

    if (clock_size_rem) {
      clockController.changeClockSize(clock_size_rem.value);
    }

    if (clock_color) {
      clockController.color(clock_color.value);
    }
  },

  setPaused: async function (isPaused) {
    if (isPaused) {
      clockController.stop();
      backgroundController.pauseVideo();
    } else {
      clockController.start();
      await backgroundController.playVideo();
    }
  },
};
