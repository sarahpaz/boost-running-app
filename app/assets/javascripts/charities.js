//****** Document ready
$(() => {
  charityClickHandler();
});

const charityClickHandler = () => {
  $(".charities").on("click", e => {
    e.preventDefault();
    // history.pushState(null, null, "/charities");
    fetch(`/charities.json`)
      .then(res => res.json())
      .then(charities => {
        $("#charities-container").html("");
        charities.forEach(charity => {
          let newCharity = new Charity(charity);
          let charityHtml = newCharity.formatIndex();
          $("#charities-container").append(charityHtml);
        });
      });
  });
};

//****** Constructor functions
class Charity {
  constructor(charity) {
    this.name = charity.name;
    this.description = charity.description;
    this.id = charity.id;
    this.runs = charity.runs;
  }
}

//****** Prototype functions
Charity.prototype.formatIndex = function() {
  let charityHtml = `
		<ul>
			<li>${this.name}</li>
			<p>${this.description}</p>
		</ul>
	`;
  return charityHtml;
};
