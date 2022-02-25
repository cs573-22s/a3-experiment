(function () {
  let experiments = null;
  let activeExperiment = 0;
  const updateView = () => {
    if (!experiments) {
      return;
    }
    experiments.hide().eq(activeExperiment).show();
  };
  const init = () => {
    experiments = $(".experiment");
    experiments.hide();

    $(".experiment__btn-next").click(() => {
      activeExperiment += 1;
      updateView();
    });

    experiments.eq(0).show();
    console.log(experiments);
  };
  document.addEventListener("DOMContentLoaded", init);
})();
