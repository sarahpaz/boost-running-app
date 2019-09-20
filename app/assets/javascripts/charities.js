$(() => {
  charityClickHandler();
});

const charityClickHandler = () => {
  $(".charities").on("click", e => {
    e.preventDefault();
    alert("it works");
  });
};
