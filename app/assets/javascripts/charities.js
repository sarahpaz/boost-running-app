$(() => {
  charityClickHandlers();
});

const charityClickHandlers = () => {
  $(".charities").on("click", e => {
    e.preventDefault();
    console.log("hey");
  });
};
