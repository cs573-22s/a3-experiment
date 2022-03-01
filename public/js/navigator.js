(function () {
  let experiments = null;
  let activeExperiment = 0;

  const recordUserResponse = async () => {
    if (activeExperiment !== 0) {
      const userAnswer = $(`#input-${activeExperiment}`).val()
      const r = await postUserResponse(activeExperiment, +userAnswer, answers[activeExperiment], userId);
      console.log("response", r);
    }
  };

  const updateView = async () => {
    if (!experiments) {
      return;
    }
    experiments.hide().eq(activeExperiment).show();
  };

  const init = () => {
    experiments = $(".experiment");
    experiments.hide();

    $(".experiment__btn-next").click(async () => {
      // TODO: loading
      await recordUserResponse();
      // TODO: handle failure
      // TODO: loaded
      activeExperiment += 1;
      updateView();
    });

    experiments.eq(0).show();
    console.log(experiments);
  };
  document.addEventListener("DOMContentLoaded", init);
})();
